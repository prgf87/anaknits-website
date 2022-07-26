import { getSession } from 'next-auth/react';
import db from '../../../../utils/db';
import User from '../../../../models/User';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('Error: Admin sign-in is Required');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
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
