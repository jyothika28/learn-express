import express, { Response, NextFunction} from 'express';
const router = express.Router();
import { User } from './types';
import { UserRequest } from './types';

const dataFile = '../data/users.json';
const fs = require('fs');
const path = require('path');
let users: User[] = [];
fs.readFile(path.resolve(__dirname, dataFile), (err: any, data: any) => {
  if (err) throw err;
  users = JSON.parse(data.toString());
});

// Middleware to add users to the request
const addUsersToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
    fs.readFile(path.resolve(__dirname, dataFile), (err: any, data: any) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to read users from file' });
        }
        req.users = JSON.parse(data.toString());
        next();
      });
};

// Route to read all usernames
router.get('/usernames', addUsersToRequest, (req: UserRequest, res: Response) => {
  const usernames = req.users?.map(user => ({ id: user.id, username: user.username }));
  res.send(usernames);
});

// Route to read a specific user's email by username
router.get('/username/:name', addUsersToRequest, (req: UserRequest, res: Response) => {
  const username = req.params.name;
  const user = req.users?.find(user => user.username === username);

  if (user) {
    res.json([{ id: user.id, email: user.email }]);
  } else {
    res.json([{ id: 'error', email: 'Not Found' }]);
  }
});

export default router;