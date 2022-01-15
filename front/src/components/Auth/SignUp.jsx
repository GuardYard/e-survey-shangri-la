import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import QrReader from 'react-qr-reader'
import { register } from "../../helpers/authHelpers";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [date, setDate] = useState(moment().format('yyyy-MM-DD'));
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [qrResult, setQrResult] = useState(''); //SNI

    const confirmRegister = () => {
        if (email !== "" && fullname !== "" && address !== "" && qrResult.length === 8 && qrResult !== "" && date !== moment().format('yyyy-MM-DD') && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                console.log(qrResult);
                register(email, fullname, date, address, qrResult, password).then(r => {
                    document.location.href = "/";
                })
            } else {
                alert("You didn't confirm your password !");
            }
        } else if(email === ""){
            alert("Please fill the email section");
        } else if(fullname === ""){
            alert("Please fill the name section");
        } else if(address === ""){
            alert("Please fill the address section");
        } else if(qrResult.length !== 8 || qrResult === ""){
            if(qrResult.length < 8){
                alert("Your SNI should have at least 6 characters. It's too short");
            } else if(qrResult.length > 8){
                alert("Your SNI should have at least 6 characters. It's too long");
            }
        } else if(password === ""){
            alert("Please fill the password section");
        } else if(confirmPassword === ""){
            alert("Please confirm the sentence");
        } else if(date === moment().format('yyyy-MM-DD')){
            alert("Please enter the date section properly (the current day is today)");
        } else if(password !== confirmPassword){
            alert("The password and his confirmation are not the same");
        } else {
            alert("Your filled data are incorrect");
        }
    }

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleScan = (data) => {
        if (data) {
            setQrResult(data);
            setQrModalOpen(false);
        }
    }

    const handleError = (err) => {
        console.error(err)
    }



    return (
        <Grid
            style={{height:'90%'}}
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <form style={{backgroundColor:'white', padding:'2em', width:"40%"}}>
                <h1>Register</h1>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Enter your email"
                            name="email"
                            onChange={event => setEmail(event.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="fullname"
                            variant="outlined"
                            required
                            onChange={event => setFullname(event.target.value)}
                            fullWidth
                            id="fullname"
                            label="NAME Firstname"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="date"
                            label="Birthday"
                            type="date"
                            defaultValue={date}
                            onChange={event => handleDateChange(event.target.value)}
                            sx={{ width: 220 }}
                            style={{width:'100%'}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="address"
                            name="homeaddress"
                            variant="outlined"
                            onChange={event => setAddress(event.target.value)}
                            required
                            fullWidth
                            id="homeaddress"
                            label="Home address"
                        />
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <Grid item xs={8} style={{margin: '2%'}}>
                            <TextField
                                onChange={event => setQrResult(event.target.value)}
                                autoComplete="number"
                                name="sni"
                                variant="outlined"
                                required
                                fullWidth
                                id="sni"
                                value={qrResult}
                                label="SNI Number"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="outline-secondary" onClick={() => setQrModalOpen(true)}>
                                <QrCodeScannerIcon />
                            </Button>
                            <Modal
                                open={qrModalOpen}
                                onClose={() => setQrModalOpen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 500,
                                            height: 600,
                                            color: "black",
                                            backgroundColor: 'whitesmoke',
                                            border: '2px solid whitesmoke',
                                            boxShadow: 24,
                                            p: 4}}>
                                    <Grid
                                        container
                                        direction="column"
                                        justifyContent="space-around"
                                        alignItems="center"
                                        style={{height:"100%"}}
                                    >
                                        <QrReader
                                            delay={300}
                                            onError={(err) => handleError(err)}
                                            onScan={(result) => handleScan(result)}
                                            style={{ width: '100%' }}
                                        />
                                        <Button variant="outline-secondary" onClick={() => setQrModalOpen(false)}>
                                            Close
                                        </Button>
                                    </Grid>
                                </Box>
                            </Modal>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            onChange={event => setPassword(event.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            onChange={event => setConfirmPassword(event.target.value)}
                            name="confirm-password"
                            label="Confirm your password"
                            type="password"
                            id="confirm-password"
                        />
                    </Grid>
                </Grid>
                <Grid  container
                       direction="column"
                       justifyContent="center"
                       alignItems="center">
                        <Button onClick={confirmRegister} variant="primary">
                            Submit
                        </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to={"/"}>
                            You already have an account ? Login !
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}
export default SignUp;