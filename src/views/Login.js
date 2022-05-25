import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Login() {
  let { id } = useParams(); // code from url

  let code = useRef("");
  let name = useRef("");
  let navigate = useNavigate();

  function handleLogin() {
    if(code.current.value === "" || name.current.value === "") { alert("Fyll i alla fält!"); return; }
    localStorage.setItem("code", code.current.value);
    localStorage.setItem("name", name.current.value);
    navigate("/Landing");
  }

  useEffect(() => {
    generateId();
    if (localStorage.getItem("code")) {
      console.log("Already logged in");
      navigate("/Landing");
    } else {
      console.log("Not logged in");
    }

    if(id) {
      code.current.value = id;
      code.current.disabled = true;
    }
  }, []);

  function generateId() {
    if(localStorage.getItem("personalID")) { return; }
    let id = uuidv4();
    localStorage.setItem("personalID", id);
  }

  return (
    <div className="Login">
      <h1>Bröllopsfotografen</h1>
      <h2>Skriv in bröllopskoden</h2>
      <div className="Login-buttons">
        <input ref={code} type="text" placeholder="Bröllopskod" />
        <input ref={name} type="text" placeholder="Ditt namn" />
        <button onClick={handleLogin}>Börja fota</button>
      </div>
    </div>
  );
}