import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from "../config/config";
import LoadingApp from "./LoadingApp";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import MoneyRoundedIcon from '@mui/icons-material/MoneyRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const PriceListApp = () => {
    const [name, setName] = useState({ name: "" });
    const [price, setPrice] = useState({ price: "" });
    const [date, setDate] = useState({ date: "" });
    const [search, setSearch] = useState({ search: "" });
    const [responseData, setResponse] = useState([{ name: "", price: "", date: "" }]);
    const [databaseFromSearch, setDatabaseFromSearch] = useState([{ id: 0, name: "", price: "", date: "" }]);
    const [open, setOpen] = useState(false);
    const [removeDialog, setRemoveDialog] = useState(false);
    const [removeId, setRemoveId] = useState({ id: 0 });
    const [loginTitle, setLoginTitle] = useState("login");

    const accessToken = localStorage.getItem("accessToken");
    console.log("AccessToken: ", accessToken);
    useEffect(() => {
        if (accessToken) {
            setLoginTitle("logout");
        } else {
            setLoginTitle("login")
        }
    })
    const Style = {
        minWidth: 300,
        minHeight: 30,
        margin: 10,
    };
    const lineStyle = {
        minWidth: 400,
        height: 1,
        background: "gray",
        marginTop: 40
    };
    // Add Function
    const addFunction = async () => {
        if (!accessToken) return alert("Please login...")
        if (!name.name) {
            return alert("Enter name");
        } else if (!price.price) {
            return alert("Enter price");
        } else if (!date.date) {
            return alert("Enter date");
        };
        setOpen(true);
        const response = await fetch(`${config.apiBaseUrl}/setData`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ Name: name.name, Price: price.price, Date: date.date })
        });
        if (response.ok) {
            const responseJson = await response.json();
            setResponse(responseJson);
            setName({ name: "" });
            setPrice({ price: "" });
            setDate({ date: "" });
            setOpen(false);
        } else {
            return;
        }
    };
    const searchFunction = async () => {
        if (!accessToken) return alert("Please login...");
        if (!search.search) return alert("Enter date");
        setOpen(true);
        const response = await fetch(`${config.apiBaseUrl}/search`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ Search: search.search })
        });
        if (response.ok) {
            const responseJson = await response.json();
            setDatabaseFromSearch(responseJson);
            setOpen(false);
        }
        console.log("search: ", search);
    };
    // remove Function;
    const removeFunction = async () => {
        if (removeId.id === 0) {
            return alert("sorry cann't remove your table!")
        }
        await fetch(`${config.apiBaseUrl}/remove`, {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ removeId: removeId.id })
        });
        searchFunction();
        setRemoveDialog(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ display: "flex", width: "100%", justifyContent: "space-around", p: 3, bgcolor: "#dbdcdc", position: "sticky", top: 0, borderBottom: "0.5px solid gray", opacity: 0.9 }}>
                <Box>
                    <ShoppingCartRoundedIcon sx={{ fontSize: 35, color: "#1876d2", cursor: "pointer" }} />
                    <MoneyRoundedIcon sx={{ fontSize: 40, color: "#cf9b2a", cursor: "pointer" }} />
                </Box>
                <Link to="/login" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
                    <AccountCircleIcon
                        sx={{ fontSize: 40, color: "#1876d2", cursor: "pointer" }}
                        onClick={() => localStorage.removeItem("accessToken")}
                    />
                    <Button>{loginTitle}</Button>
                </Link>
            </Box>
            <Box>
                <Box>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <TextField value={name.name} onChange={(evt) => setName({ ...name, name: evt.target.value })} style={Style} type="text" placeholder="Type Name" />
                        <TextField value={price.price} onChange={(evt) => setPrice({ ...price, price: evt.target.value })} style={Style} type="number" placeholder="Price" />
                        <TextField value={date.date} onChange={(evt) => setDate({ ...date, date: evt.target.value })} style={Style} type="date" placeholder="Date" />
                        <Button variant="contained" onClick={addFunction}>Add</Button>
                    </div>
                    <div style={lineStyle}></div>
                    <div>
                        <h2>Result</h2>
                        {responseData.map(item => {
                            return (
                                <div>
                                    <p>Type Name: {item.name}</p>
                                    <p>Price: {item.price}</p>
                                    <p>Date: {item.date}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div style={lineStyle}></div>
                    <div>
                        <h2>You need data to search</h2>
                        <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <TextField
                                placeholder="Date"
                                onChange={(evt) => setSearch({ search: evt.target.value })}
                                style={{
                                    minWidth: 200,
                                    minHeight: 30,
                                }} type="date" />
                            <Button onClick={searchFunction} variant="outlined" sx={{ minHeight: 55, borderRadious: 10 }}><SearchIcon /></Button>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            {databaseFromSearch.map(item => {
                                return (
                                    <div key={item.id}>
                                        <div style={{ display: "flex", background: "#2acfcd", margin: 5, color: "", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
                                            <ShoppingCartRoundedIcon sx={{ mr: 5, color: "red" }} />
                                            <div style={{ margin: 10, }}>
                                                <h3>Type Name</h3>
                                                <p>{item.name}</p>
                                            </div>
                                            <div style={{ margin: 10 }}>
                                                <h3>Price</h3>
                                                <p>{item.price}Kyats</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                setRemoveDialog(true);
                                                setRemoveId({ id: item.id })
                                            }}
                                            style={{ marginBottom: 15 }}
                                            variant="contained"
                                            color="error"
                                        >Remove</Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <LoadingApp open={open} />
                    <Dialog open={removeDialog} onClose={() => setRemoveDialog(false)}>
                        <DialogTitle>Are you sure this table remove?</DialogTitle>
                        <DialogContent sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Button onClick={() => setRemoveDialog(false)} variant="outlined">cancle</Button>
                            <Button onClick={removeFunction} variant="contained" color="error">remove</Button>
                        </DialogContent>
                    </Dialog>
                </Box>
            </Box>
        </div>
    )
};
export default PriceListApp;