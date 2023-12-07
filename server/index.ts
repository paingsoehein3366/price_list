import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { db } from "./db/db";
import { config } from "./config/config";
const app = express();
const port = 5000;

app.use(cors());
app.use(json());
//setData function
app.post("/setData", async (req, res) => {
    const { Name, Price, Date } = req.body
    if (!Name && !Price && !Date) return res.send(400);
    console.log("Name: ", Name, ", Price: ", Price, ", Date: ", Date);
    const setData = await db.query("insert into price_lists (name,price,date) values($1,$2,$3) returning *", [
        Name, Price, Date
    ]);
    const setDataRow = setData.rows;
    res.send(setDataRow);
});
// search
app.post("/search", async (req, res) => {
    const { Search } = req.body;
    if (!Search) return res.send(400);
    const databaseFromPriceLists = await db.query("select * from price_lists where is_archived = false");
    const databaseFromPriceListsRows = databaseFromPriceLists.rows.filter(item => item.date == Search);
    res.send(databaseFromPriceListsRows);
});
// remove
app.delete("/remove", async (req, res) => {
    const { removeId } = req.body;
    if (!removeId) return res.send(400);
    await db.query("update price_lists set is_archived = true where id = $1", [removeId]);
    res.send(200);
});
// login
app.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    const isVaild = userName && password;
    console.log("userName: ", userName, ", password: ", password);
    if (!isVaild) return res.send(400);
    const checkEmail = await db.query("select * from users where user_name = $1", [userName]);
    if (!checkEmail.rows.length) return res.send(401);
    const checkEmailRows = checkEmail.rows[0];
    const checkPassword = checkEmail.rows.filter(item => item.password === password);
    if (!checkPassword.length) return res.send(402);
    const accessToken = jwt.sign(checkEmailRows, config.jwtSecret as string, { expiresIn: "1h" });
    if (!accessToken) return res.send(403);
    const dataFromUserId = checkEmail.rows.map((item) => item.id);
    res.send({ accessToken, dataFromUserId });
});

app.get("/", (req, res) => {
    res.send("server running");
});

app.listen(port, () => {
    console.log(`server running port: ${port}`);
});