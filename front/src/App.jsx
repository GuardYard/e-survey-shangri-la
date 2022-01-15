import React, {useEffect, useState} from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login.jsx";
import Grid from "@mui/material/Grid";
import {getUserById} from "./helpers/userHelpers";
import AdminDash from "./components/AdminDash/AdminDash";
import UserDash from "./components/UserDash/UserDash";
import PageNotFound from "./components/404/PageNotFound";

function App() {
    const [userConnected, setUserConnected] = useState(false)
    const [userStatus, setUserStatus] = useState(false)

    useEffect(() => {
        const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
        setUserConnected(currentUserId !== null && currentUserId !== undefined);
        console.log(currentUserId)
        if(currentUserId){
            getUserById(currentUserId).then(async res => {
                setUserStatus(res.data.admin)
            })
        }
        console.log(userStatus)
        console.log(document.location);
    }, [])

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{height:'100%'}}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{height:'100%'}}
            >
                    <Router>
                        {!userConnected ? (
                            <Grid
                                container
                                direction="column"
                                justifyContent="space-evenly"
                                alignItems="center"
                                style={{height:'90%', width:'90%'}}>
                                <h1>e-Survey Shangry-la</h1>
                                <Routes>
                                    <Route path="/" exact element={<Login />}/>
                                    <Route path="/signup" element={<SignUp />} />
                                </Routes>
                            </Grid>
                        ) : (
                            userStatus ?
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{height:'90%', width:'90%'}}
                                >
                                    <h1>e-Survey Shangry-la</h1>
                                    <Routes>
                                        <Route path="/" exact element={<AdminDash />}/>
                                    </Routes>
                                </Grid>
                                :
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    style={{height:'90%', width:'90%'}}
                                >
                                    <h1>e-Survey Shangry-la</h1>
                                    <Routes>
                                        <Route path="/" exact element={<UserDash />}/>
                                        <Route path="*" element={<PageNotFound />} />
                                    </Routes>
                                </Grid>
                        )}
                    </Router>
            </Grid>
        </Grid>
    );
}

export default App;