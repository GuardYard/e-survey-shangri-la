import React from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const PageNotFound = () => {

    return (
            <div>
                <p style={{textAlign:"center"}}>
                    <h1>404 Error</h1>
                    <Link to="/">
                        <Button variant="contained" size="medium">
                            Return to the dash board
                        </Button>
                    </Link>
                </p>
            </div>

    )
}

export default PageNotFound;