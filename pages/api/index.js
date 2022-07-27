export default async (req, res) => {
  const { method } = req;

  if (method === 'OPTIONS') {
    return res.status(200).send('ok');
  } else if (method === 'PATCH') {
    return res.status(200).send('ok');
  } else if (method === 'DELETE') {
    return res.status(200).send('ok');
  } else if (method === 'POST') {
    return res.status(200).send('ok');
  } else if (method === 'PUT') {
    return res.status(200).send('ok');
  } else {
    return res.status(400).send('Method not allowed');
  }
};
