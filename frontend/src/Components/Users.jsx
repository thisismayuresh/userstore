import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from './Table';
import EditModal from './EditModal';
import Form from './Form';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    contact: '',
    gender: '',
    dob: '',
  });

  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    contact: '',
    gender: '',
    dob: '',
  });


  useEffect(() => {
    // Fetch books from the API
    axios.get('http://localhost:8000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, [users]);

  const openModal = () => {
    setIsModalOpen(true);
    console.log("modal is open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("modal is closed");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addNewUser = () => {
    if (Object.values(newUserData).some((value) => !value)) {
      console.log('All fields are required');
      toast.error("All Fields are Required !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUserData.email)) {
      toast.error("Invalid Email Format!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validate contact number format
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(newUserData.contact)) {
      toast.error("Invalid Contact Number!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    toast.success("User Added Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });

    toast.success("User Added Successfully !", {
      position: toast.POSITION.TOP_RIGHT,
    });

    axios.post('http://localhost:8000/users', newUserData)
      .then((response) => {
        console.log(response);
        // Fetch updated users after successful addition
        axios.get('http://localhost:8000/users')
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      })
      .catch((error) => {
        console.log("Error", error);
        // Handle error scenarios
      });

    console.log(newUserData);

    closeModal();
  };

  const editUser = (index) => {
    console.log(users[index])
    setIsEditModalOpen(true);
    console.log("c")
    const userToEdit = users[index];
    userToEdit.dob = userToEdit.dob ? new Date(userToEdit.dob).toISOString().split('T')[0] : '';

    setEditUserData(userToEdit);
  };

  const updateUser = () => {


    const { _id, ...updatedUserData } = editUserData;

    axios
      .put(`http://localhost:8000/users/${_id}`, updatedUserData)
      .then((response) => {
        console.log(response);
        toast.success('User Updated Successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsEditModalOpen(false);
        // Fetch updated users after successful update
        axios.get('http://localhost:8000/users')
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      })
      .catch((error) => {
        console.log('Error', error);
        // Handle error scenarios
      });
  };

  const deleteUser = (index) => {
    const userId = users[index]._id;

    axios.delete(`http://localhost:8000/users/${userId}`).then(response => {
      console.log(response);
      if (response.status === 200) {
        toast.success('User Deleted Successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });


      }
    }).catch(error => {
      console.log(error);
    });
  };


  // Other functions (deleteUser, editUser, updateUser) remain similar...

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="flex items-center mb-4">
        <button
          type="button"
          className="ml-2 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2"
          onClick={openModal}
        >
          Add New User
        </button>
      </div>

        {/* Form Component */}
        {isModalOpen && (
        <Form
          userData={newUserData}
          handleInputChange={handleInputChange}
          handleSubmit={addNewUser}
          closeModal={() => setIsEditModalOpen(false)}

        />
      )}

      {/* Table Component */}
      <Table
        users={users}
        editUser={editUser}
        deleteUser={deleteUser}
      />

      {isEditModalOpen && (
        <EditModal
          userData={editUserData}
          handleEditInputChange={handleEditInputChange}
          handleEditSubmit={updateUser}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}

  
    </div >

  );
};

export default Users;


