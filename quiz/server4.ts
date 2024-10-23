import fs from 'fs';
import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import readUsersRouter from './readUsers';
import writeUsersRouter from './writeUsers';

const app = express();
const port = 8000;
const dataFile = '../data/users.json';
// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Modular routes
app.use('/read', readUsersRouter);
app.use('/write', writeUsersRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
