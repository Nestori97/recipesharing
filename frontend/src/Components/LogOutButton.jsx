const LogOutButton = ({ logout }) => {
    return (
        <div>
            <button
                className="btn btn-neutral"
                onClick={() =>
                    document.getElementById('my_modal_1').showModal()
                }
            >
                Log Out
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Logging Out</h3>
                    <p className="py-4">Are you sure you want to log out?</p>
                    <div className="modal-action">
                        <form
                            method="dialog"
                            className="flex justify-center gap-x-4"
                        >
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn m-2" onClick={logout}>
                                Yes
                            </button>
                            <button className="btn m-2">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export { LogOutButton };
