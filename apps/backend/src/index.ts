// Change to NestJS framework for better scalability and maintainability in the future.

import express from "express";
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get("/health", (_req, res)=>{
    res.json({status: "ok", service: "backend"})
})

app.listen(PORT, ()=>{
    console.log(`E-COMMERCE SERVICE is running on http://localhost:${PORT}`)
})