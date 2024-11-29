INSERT INTO users(username, Password, email, isAdmin)
VALUES ('testikäyttäjä', 'testikäyttäjä','testikäyttäjäsähköposti@testikäyttäjäsähköposti.com', False);
INSERT INTO Recipe (title, description, ingredients, instructions, image, owner) 
VALUES (
    'Piirakka', 
    'herkullinen piirakka resepti', 
    '[
        {
            "ingredient": "mustikoita",
            "amount": 4,
            "unit": "dl"
        },
        {
            "ingredient": "jauhoja",
            "amount": 3,
            "unit": "dl"
        },
        {
            "ingredient": "vettä",
            "amount": 1,
            "unit": "dl"
        }
    ]', 
    '{
        "step1": "tee piirakka taikina",
        "step2": "laita piirakkataikina uuniin",
        "step3": "profit"
    }', 
    'https://kalaneuvos.fi/wp-content/uploads/2016/07/lohipiirakka.jpg',
    1
);

INSERT INTO Recipe (title, description, ingredients, instructions, image, owner) 
VALUES (
    'keitto', 
    'kalakeitto', 
    '[
        {
            "ingredient": "lohi",
            "amount": 1,
            "unit": "kilo"
        },
        {
            "ingredient": "vesi",
            "amount": 3,
            "unit": "litraa"
        },
        {
            "ingredient": "peruna",
            "amount": 0.5,
            "unit": "kiloa"
        }
    ]', 
    '{
        "step1": "valmistele kalat",
        "step2": "laita kalat kattilaan veden kera",
        "step3": "profit"
    }', 
    'https://hatala.fi/wp-content/uploads/2019/03/katin-lipe-e4kalakeitto-img_2190.jpg',
    1
);
INSERT INTO Recipe (title, description, ingredients, instructions, image, owner) 
VALUES (
    'Korvapuusti', 
    'Mainio korvapuusti resepti', 
 '[
        {
            "ingredient": "kaneli",
            "amount": 4,
            "unit": "tl"
        },
        {
            "ingredient": "jauhoja",
            "amount": 3,
            "unit": "5"
        },
        {
            "ingredient": "hiivaa",
            "amount": 50,
            "unit": "grammaa"
        }
    ]',  
    '{
        "step1": "Valmistele korvapuustitaikina",
        "step2": "tee taikinasta korvapuusteja",
        "step3": "taikina uuniin",
        "step4": "profit"
    }', 
    'https://www.kinuskikissa.fi/wp-content/uploads/sini/korvapuustit-2.jpg',
    1
);
