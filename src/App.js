import { React, useState } from "react";
import Loading from "./Loading";
import { BsGithub } from "react-icons/bs";
import "./styles.css";
import "./navbar.css";

export default function App(){
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFetch = () => {
    setIsLoading(true);
    fetch("https://reqres.in/api/users?page=0")
      .then((respose) => respose.json())
      .then((respose) => {
        setUsers(respose.data);
        setIsLoading(false);
        setTimeout(() => {
          setUsers(respose.data);
          setIsLoading(false);
        }, 2000);
      }).catch(() => {
        setErrorMessage("Unable to fetch user list");
        setIsLoading(false);
      });
  };
  const renderUser = (
    <div className="userlist-container">
      {users.map((item, index) => (
        <div className="user-container" key={index}>
          <img src={item.avatar} alt="" />
          <div className="userDetail">
            <div className="first-name">
              {`${item.first_name}                
                ${item.last_name}`}
            </div>
            <div className="last-name">{item.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <nav className="navbar">
        <h1>Brand Name</h1>
      </nav>
      <div className="App">
        <button onClick={handleFetch} disabled={isLoading}>
          Fetch Users
        </button>
        {isLoading ? <Loading /> : renderUser}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </>
  );
}
