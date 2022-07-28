import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('Error: Admin sign-in is required');
  }
  // const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'PUT') {
    return putHandler(req, res);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};

const getHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
};

const putHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    // user.password = req.body.password;
    user.isAdmin = req.body.isAdmin;
    await user.save();
    await db.disconnect();
    res.send({ message: 'User details has been updated successfully!' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Error: User not found' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.isAdmin === true) {
      return res.status(400).send({ message: 'Cannot delete Admin account' });
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: 'This user has been deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'This user cannot be found' });
  }
};

export default handler;
