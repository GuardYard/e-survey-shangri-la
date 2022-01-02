import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login.jsx";
import {Container, Row} from "react-bootstrap";
import Grid from "@mui/material/Grid";

function App() {
    const [userConnected, setUserConnected] = useState(false)

    useEffect(() => {
        const currentUserId = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
        setUserConnected(currentUserId !== null && currentUserId !== undefined);
        console.log(currentUserId)
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
                                style={{height:'90%', width:'90%'}}
                            >
                                <h1>e-Survey Shangry-la</h1>
                                <Routes>
                                    <Route path="/" exact element={<Login />}/>
                                    <Route path="/signup" element={<SignUp />} />
                                </Routes>
                            </Grid>
                        ) : (
                            <Routes>
                                {/*<Route path="/" exact component={DisplayPost} />*/}
                                {/*<Route path="/addPost" component={AddSocialPost} />*/}
                                {/*<Route path="/receipes" component={MyReceipes} />*/}
                                {/*<Route path="/addReceipe" component={AddReceipe} />*/}
                                {/*<Route path="/receipe/:id" exact component={Receipe} />*/}
                                {/*<Route path="/receipe/update/:id" component={UpdateReceipe} />*/}
                                {/*<Route path="/trainings" component={MyTrainings} />*/}
                                {/*<Route path="/training/:id" component={Training} />*/}
                                {/*<Route path="/do_exercise/:id" component={DoExercise} />*/}
                                {/*<Route path="/account" component={Profile} />*/}
                            </Routes>
                        )}
                    </Router>
            </Grid>
        </Grid>
    );
}

export default App;