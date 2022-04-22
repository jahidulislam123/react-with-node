import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data));
  },[])


  const handleaddUser=event=>{
    event.preventDefault();
    const name =event.target.name.value;
    const email =event.target.email.value;
    // console.log(name,email);
    const user = {name,email};

    //send data to server 
    fetch('http://localhost:5000/user', {
     method: 'POST', // or 'PUT'
     headers: {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
    // console.log('Success:', data);
    const newUsers=[...users,data];
    setUsers(newUsers);
    console.log(data);
    })



  }


  return (
    <div className="App">
      <h1>my own data {users.length}</h1>
    <form onSubmit={handleaddUser}>
      <input type="text" name="name" id="" placeholder='name' required />
      <input type="email" name="email" id=""placeholder='email'  required/>
      <input type="submit" value="SUBMIT" />
    </form>
    <ul>
      {
        users.map(user=> <li key={user.id}> name:{user.name} email: {user.email}</li>)
      }
    </ul>
    </div>
  );
}

export default App;
