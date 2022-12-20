import { Request, Response } from "express";

const { Router } = require("express");
const router = Router()

// Test Route: 
router.get("/test", (req: Request, res: Response) => {
    res.json("Test, server's working!");
});

// Routes Config: 
export default router;