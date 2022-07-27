import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Error: Admin sign-in is Required');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Error: Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
};

const postHandler = async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: 'User name',
    email: 'User email address',
    password: '12345678',
    isAdmin: 'false',
  });
  const user = await newUser.save();
  await db.disconnect();
  res.send({ message: 'This user has been created successfully', user });
};

export default handler;
