const { urlencoded } = require('express');
const router = require('express').Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { body, matchedData, validationResult } = require('express-validator');
const pg = require('pg');
const { Client } = pg;

router.use(urlencoded({ extended: true }));
const DATABASE_URL = process.env.DATABASE_URL;

// Ensure DATABASE_URL is set
if (!DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set in environment variables.");
    process.exit(1);
}

router.post(
    '/register',
    body('username').trim().notEmpty().isLength({ max: 50 }).escape(),
    body('email').trim().isEmail(),
    body('password').isLength({ min: 8 }),
    body('passwordConfirmation').custom(
        (value, { req }) => value === req.body.password,
    ),
    async (request, response) => {
        const valRes = validationResult(request);
        if (!valRes.isEmpty()) {
            response.status(400).end();
            return;
        }
        const data = matchedData(request);
        const hash = await argon2.hash(data.password);

        const client = new Client({ connectionString: DATABASE_URL })
        await client.connect();
        try {
            await client.query(
                'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
                [data.username, hash, data.email],
            );
            console.log(`Created new user: ${data.username}`);
            response.end();
        } catch (error) {
            console.log(`Error during user creation:\n\t${error.message}`);
            response.status(400).end();
        } finally {
            await client.end();
        }
    },
);

router.post(
    '/login',
    body('email').trim().isEmail(),
    body('password').isLength({ min: 8 }),
    async (request, response) => {
        const valRes = validationResult(request);
        if (!valRes.isEmpty()) {
            response.status(400).end();
            return;
        }
        const data = matchedData(request);

        const client = new Client({ connectionString: DATABASE_URL })
        await client.connect();
        try {
            const dbRes = await client.query(
                'SELECT id, username, password, isadmin FROM users WHERE email = $1',
                [data.email],
            );
            if (!dbRes.rowCount) {
                return response.status(401).end();
            }
            const user = dbRes.rows[0];
            if (!(await argon2.verify(user.password, data.password))) {
                response.status(401).end();
            }
            const token = jwt.sign(
                { id: user.id, isAdmin: user.isadmin },
                process.env.JWT_SECRET,
                { expiresIn: '1d' },
            );
            response.json({
                id: user.id,
                username: user.username,
                token: token,
            });
        } catch (error) {
            response.status(500).end();
        } finally {
            await client.end();
        }
    },
);

router.get('/token', async (request, response) => {
    const authorization = request.get('Authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return response.status(400).end();
    }
    const token = authorization.replace('Bearer ', '');

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        response.end();
    } catch (error) {
        console.error(error.message);
        response.status(401).end();
    }
});

module.exports = router;
