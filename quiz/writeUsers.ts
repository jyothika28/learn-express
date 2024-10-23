import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User } from './types';
import { UserRequest } from './types';

const router = express.Router()
const dataFile = '../data/users.json';
let users: User[] = [];

fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
    if (err) throw err;
    users = JSON.parse(data.toString());
  });

// Route to add a new user
router.post('/adduser', (req: UserRequest, res: Response) => {
    const newUser = req.body as User;
    users.push(newUser);
  
    // Save the updated user list to the file
    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(users), (err) => {
      if (err) {
        console.log('Failed to write to file');
        return res.status(500).json({ error: 'Failed to save user' });
      }
      console.log('User Saved-server4');
      console.log("New user",newUser);
      res.send('done');
    });
  });

export default router;