import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "bootstrap/js/src/button";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const confirmRegister = () => {
    //     if (username !== "" && password !== "" && confirmPassword !== "" && height > 0 && weight > 0 && height < 250 && weight < 250) {
    //         if (password === confirmPassword) {
    //             register(username, password, height, weight).then(r => {
    //                 document.location.href = "/login";
    //             })
    //         } else {
    //             alert("You didn't confirm your password !");
    //         }
    //     } else {
    //         alert("Your filled data are incorrect");
    //     }
    // }

    return (
        <div>
            <div>azaz</div>
        </div>
    )
}
export default SignUp;