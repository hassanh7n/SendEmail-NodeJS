require('dotenv').config();
require('express-async-errors');
const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const express = require('express');
const app = express();
//const sendEmailEthereal = require('./controllers/sendEmail')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send">send email</a>');
});

// app.get('/send', async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'pearl66@ethereal.email',
//         pass: 'RNgFtgX5xrc2x4XSmU'
//     }
// });

//   let info = await transporter.sendMail({
//     from: '"Coding Addict" <codingaddict@gmail.com>',
//     to: 'bar@example.com',
//     subject: 'Hello',
//     html: '<h2>Sending Emails with Node.js</h2>',
//   });

//   res.json(info);
// });
app.get('/send', async(req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'hassanwebdeveloper8322@gmail.com', // Change to your recipient
    from: 'hassannawaz70000@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
  .send(msg)
  .then(() => {
    res.json({
      success : true,
      msg : "Sucessfuly send"
    })
  })
  .catch((error) => {
    console.error(error)
  })
  
})
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
