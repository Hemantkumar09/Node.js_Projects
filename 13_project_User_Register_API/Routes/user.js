import express from "express";
import { register, login } from "../controllers/user.js";

const router = express.Router();

// @register route
// api des:- user register
//api endpoint:- api/user/register
router.post('/register', register)

// @login route
// api des:- user login
//api endpoint:- api/user/login
router.post('/login', login)


export default router