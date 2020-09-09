import React from "react";
import "./form.css";

const Users = (props) => {
  console.log("user props: ", props);
  

  return (
    <div className="user-list">
      {props.user.map((user) => (
        <div className="ul" key={user.id}>
          <li>
            <h2 className="Lables1">
              Name: <span className="labels2">{user.name}</span>
            </h2>
            <p className="Lables1">
              Email: <span className="labels2">{user.email}</span>
            </p>
            <p className="Lables1">
              Password: <span className="labels2">{user.password}</span>{" "}
            </p>
           
          </li>
        </div>
      ))}
    </div>
  );
};
export default Users;
