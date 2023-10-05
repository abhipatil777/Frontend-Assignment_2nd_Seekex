import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Header({ isAddUser, setIsAddUser }) {

    const HandelAddUser = () => {
        setIsAddUser({ show: true, Action: "Add" })
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">User Management</Navbar.Brand>
                    <Button onClick={HandelAddUser}>Add User</Button>
                </Container>
            </Navbar>
        </>

    )
}
