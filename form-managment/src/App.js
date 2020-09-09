import React, {useReducer, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
 

function App() {
  const [user, setUser] = useState([]);

  const addNewUser = (formData) => {
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    setUser([...user, newUser]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h1>New Login</h1>
          <Form />
        </div>
      </header>
    </div>
  );
}

export default App;
