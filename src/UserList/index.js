import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import './UserList.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { getAllUsers, UpdateAndCreateUsers, deleteUser } from '../Api'
import man from "../Img/Man.png"
import woman from "../Img/Woman.png"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';

const theme = {
    theme: "colored"
}

export default function UserList({ isAddUser, setIsAddUser }) {
    const initialValues = {
        "name": "",
        "email": "",
        "dob": "",
        "country": "",
        "gender": "",
        "status": ""
    }
    const [userDetails, setUserDetails] = useState(initialValues);
    const [allUserData, setAllUserData] = useState([]);
    const [HandelLoader, setHandelLoader] = useState(true);

    const getUserData = async () => {
        const data = await getAllUsers();
        setHandelLoader(false)
        setAllUserData(data)
    };

    useEffect(() => {
        getUserData();
    }, [])

    const handleClose = () => {
        setIsAddUser({ show: false })
        setUserDetails(initialValues);
    };

    const UpdateUserList = async () => {
        var NameValidation = /^[A-Za-z][-a-zA-Z ]+$/;
        var EmailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (userDetails.name === "") {
            toast.error("Please Enter name", theme);
        } else if (!NameValidation.test(userDetails.name)) {
            toast.error("Please Enter correct name", theme);
        } else if (userDetails.email === "") {
            toast.error("Please Enter email", theme);
        } else if (!EmailValidation.test(userDetails.email)) {
            toast.error("Please Enter correct email", theme);
        } else if (!userDetails.gender || userDetails.gender === "Select Gender") {
            toast.error("Please Select gender", theme);
        } else if (!userDetails.status || userDetails.status === "Select Status") {
            toast.error("Please Select status", theme);
        }
        else {
            let updateUser = await UpdateAndCreateUsers(userDetails)
            if (Array.isArray(updateUser)) {
                updateUser.map(err => {
                    toast.error(`${err.field} ${err.message}`, theme);
                })
            } else {
                toast.success(`User ${isAddUser.Action === "Update" ? "Updated" : "Created"} successfully`, theme)
                setIsAddUser({ show: false });
                setUserDetails(initialValues);
                getUserData();
            }
        }
    }

    const UpdateUser = (user) => {
        setIsAddUser({ show: true, Action: "Update" });
        setUserDetails({ ...user })
    }

    const DeleteUser = async (id) => {
        const deletedUser = await deleteUser(id);
        if (Array.isArray(deletedUser)) {
            deletedUser.map(err => {
                toast.error(`${err.field} ${err.message}`, theme);
            })
        } else {
            toast.success("User Deleted successfully", theme)
            getUserData();
        }

    };
    return (
        

        <div className='p-1'>

         <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Person List</Breadcrumb.Item>
        </Breadcrumb>

            {HandelLoader && <Spinner className="spinner" animation="border" role="status" />}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4 p-3">
                {allUserData.length > 0 && allUserData.map(user => {
                    return <Col key={user.id}>
                        <Card bg="light">
                            <div className='ImgDiv'>
                                <Card.Img className="Imgclass" variant="top" src={user.gender === "male" ? man : woman} />
                            </div>
                            <Card.Body>
                                <Card.Title title="Click Here to Update User" className='title' bg="primary" onClick={() => UpdateUser(user)} >{user.name}</Card.Title>
                                <Card.Text title={user.email} tooltip={user.email}>Email : {user.email.length > 20 ? user.email.substring(0, 20) + "..." : user.email}</Card.Text>
                                <Card.Text>DOB : {user.dob} </Card.Text>
                                <Card.Text>Country : {user.country} </Card.Text>
                                <Card.Text>Status : {user.status}</Card.Text>
                            </Card.Body>

                            <Button className="DeleteBtn" onClick={() => DeleteUser(user.id)} variant="danger">Delete User</Button>
                        </Card>
                    </Col>
                })}
            </Row >
            <Modal show={isAddUser.show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{isAddUser.Action === "Add" ? "ADD" : "UPDATE"} NEW USER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="text-center">
                                Name
                            </Form.Label>
                            <Form.Control type="text" value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, "name": e.target.value })} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, "email": e.target.value })} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>DOB</Form.Label>
                            <Form.Control type="date" value={userDetails.dob} onChange={(e) => setUserDetails({ ...userDetails, "dob": e.target.value })} placeholder="Enter Date Of Birth" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" value={userDetails.country} onChange={(e) => setUserDetails({ ...userDetails, "country": e.target.value })} placeholder="Enter country" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>select Gender</Form.Label>
                            <Form.Select value={userDetails.gender} onChange={(e) => setUserDetails({ ...userDetails, "gender": e.target.value })}>
                                <option>Select Gender</option>
                                <option>male</option>
                                <option>female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Select Status</Form.Label>
                            <Form.Select value={userDetails.status} onChange={(e) => setUserDetails({ ...userDetails, "status": e.target.value })}>
                                <option>Select Status</option>
                                <option>active</option>
                                <option>inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={UpdateUserList}>{isAddUser.Action === "Add" ? "Save" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div >
    )
}

