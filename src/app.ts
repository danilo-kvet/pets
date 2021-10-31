import "reflect-metadata";
import express from "express";
import passport from "./api/middlewares/authentication";

const app = express();

app.use(express.json());
app.use(passport.initialize());

export default app;
