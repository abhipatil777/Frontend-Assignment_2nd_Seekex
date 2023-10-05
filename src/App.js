import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import UserList from './UserList';
import { useState } from 'react';

function App() {
  const [isAddUser, setIsAddUser] = useState({ show: false, Action: "" });
  return (
    <>
      <Header isAddUser={isAddUser} setIsAddUser={setIsAddUser} />
      <UserList isAddUser={isAddUser} setIsAddUser={setIsAddUser} />
    </>
  );
}

export default App;
