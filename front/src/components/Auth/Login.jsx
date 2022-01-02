import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Button, Form} from "react-bootstrap";
// import { authenticate } from "../../helpers/AuthHelpers";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const auth = () => {
    //     if (username !== "" && password !== "") {
    //         authenticate(username, password).then(res => {
    //             if (res.data.id !== undefined) {
    //                 localStorage.setItem("id", res.data.id);
    //                 document.location.href = "/";
    //             } else {
    //                 localStorage.removeItem("id")
    //                 setPassword('')
    //                 alert("Username or password may be wrong !");
    //             }
    //         }).catch(err => {
    //             console.error("Erreur requete " + err.message + " " + err.stack)
    //         })
    //     }else{
    //         alert("Please fill all the fields !");
    //     }
    // }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Link style={{color:'whitesmoke'}} to={"/signup"}>
                    <Button variant="primary">
                        Login
                    </Button>
                </Link>
            </Form>
            <br />
            <Link style={{color:'whitesmoke'}} to={"/signup"}>
                You don't have an account ? Sign Up !
            </Link>
        </div>
    )
}

export default Login;