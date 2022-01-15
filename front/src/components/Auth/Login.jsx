import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { authenticate } from "../../helpers/authHelpers";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = () => {
        if (email !== "" && password !== "") {
            console.log(email);
            console.log(password);
            authenticate(email, password).then(res => {
                console.log(res);
                if (res.data.id !== undefined) {
                    localStorage.setItem("id", res.data.id);
                    document.location.href = "/";
                } else {
                    localStorage.removeItem("id")
                    alert("Username or password may be wrong !");
                }
            }).catch(err => {
                console.error("Erreur requete " + err.message + " " + err.stack)
            })
        }else if(password === "" && email === ""){
            alert("Please fill all the fields !");
        }else if(email === ""){
            alert("Username is empty !");
        }else if(password === ""){
            alert("Password is empty !");
        }else{
            alert("Please fill all the fields !");
        }
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={event => setEmail(event.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={event => setPassword(event.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Button style={{color:'whitesmoke'}}  onClick={auth} variant="primary">
                    Login
                </Button>
            </Form>
            <br />
            <Link style={{color:'whitesmoke'}} to={"/signup"}>
                You don't have an account ? Sign Up !
            </Link>
        </div>
    )
}

export default Login;