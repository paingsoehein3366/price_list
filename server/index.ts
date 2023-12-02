import express, { json } from "express";
import cors from "cors";
import { db } from "./db/db";
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
    console.log("setDataRow: ", setDataRow);
    res.send(setDataRow);
});
app.post("/search", async (req, res) => {
    const { Search } = req.body;
    console.log("Search: ", Search);
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
})

app.get("/", (req, res) => {
    res.send("server running")
})

app.listen(port, () => {
    console.log(`server running port: ${port}`);
})