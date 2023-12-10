
import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config";
import LoadingApp from "./LoadingApp";

const LoginApp = () => {
    const [userName, setUserName] = useState({ userName: "" });
    const [password, setPassword] = useState({ password: "" });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    const backOffice = async () => {
        if (!userName.userName) {
            return alert("!Please Enter userName");
        } else if (!password.password) {
            return alert("!Please Enter password")
        };
        setOpen(true);
        const response = await fetch(`${config.apiBaseUrl}/login`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName: userName.userName, password: password.password })
        });
        if (response.ok) {
            const responseData = await response.json();
            const accessToken = responseData.accessToken;
            localStorage.setItem("accessToken", accessToken);
            setOpen(false);
            navigate("/");
        } else {
            setOpen(false);
            setUserName({ userName: "" });
            setPassword({ password: "" });
            return alert("Check! userName and password.");
        }
    };
    return (
        <Box sx={{ minWidth: 300 }}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100vh" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography sx={{ fontFamily: "monospace", color: "#1876d2" }} variant="h5">Login page</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    <TextField
                        sx={{ minWidth: 300 }}
                        type="text"
                        label="User Name"
                        onChange={(evt) => setUserName({ ...userName, userName: evt.target.value })}
                        placeholder="User Name"
                        value={userName.userName}
                    />
                    <TextField
                        sx={{ marginY: 3, minWidth: 300 }}
                        type="password"
                        label="Password"
                        onChange={(evt) => setPassword({ ...password, password: evt.target.value })}
                        placeholder="Password"
                        value={password.password}
                    />
                    <Button onClick={backOffice} sx={{ mb: 5 }} variant="contained">Log in</Button>
                </Box>
                <Box></Box>
            </Box>
            <LoadingApp open={open} />
        </Box>
    )
};
export default LoginApp;