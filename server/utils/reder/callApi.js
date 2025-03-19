import axios from "axios";
import express from "express";
const renderApi = express.Router();


//https://dummyjson.com/products

renderApi.get("/data", async(req, res) => {
    const response = await axios.get("https://dummyjson.com/products");
    const result = await response.data.products;
    res.send(result) 
})

export default renderApi