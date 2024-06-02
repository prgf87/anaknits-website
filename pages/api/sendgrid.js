import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: 'prgf2011@gmail.com',
      from: 'info@anaknits.com',
      subject: `${req.body.subject}`,
      html: `Hi, my name is ${req.body.fullname} and I am contacting you in regards to ${req.body.subject}.
      \n
      ${req.body.message}
      \n
      Sincerely,
      ${req.body.fullname}`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '' });
}

export default sendEmail;
