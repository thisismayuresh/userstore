// EditModal.js
import React from 'react';

const EditModal = ({ userData, handleEditInputChange, handleEditSubmit, closeModal }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <form>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleEditInputChange}
                        placeholder="Name"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />

                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleEditInputChange}
                        placeholder="Author"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />

                    <input
                        type="tel"
                        name="contact"
                        value={userData.contact}
                        onChange={handleEditInputChange}
                        placeholder="Genre"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />

                    <div className="flex items-center mb-4">
                        <label className="mr-2">Gender:</label>
                        <div>
                            <input
                                type="radio"
                                id="maleRadio"
                                name="gender"
                                value="male"
                                checked={userData.gender === 'male'}
                                onChange={handleEditInputChange}
                                className="mr-1"
                            />
                            <label htmlFor="maleRadio">Male</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="femaleRadio"
                                name="gender"
                                value="female"
                                checked={userData.gender === 'female'}
                                onChange={handleEditInputChange}
                                className="ml-4 mr-1"
                            />
                            <label htmlFor="femaleRadio">Female</label>
                        </div>
                    </div>

                    <input
                        type="date"
                        name="dob"
                        value={userData.dob}
                        onChange={handleEditInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />



                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleEditSubmit}
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
