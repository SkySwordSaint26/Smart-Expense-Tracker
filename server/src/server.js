import express from 'express';
import dotenv from "dotenv/config"
import app from "./app.js"

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`)
})




