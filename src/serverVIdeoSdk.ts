// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import morgan from 'morgan';
// import { default as fetch } from 'node-fetch';
// import jwt, { SignOptions } from 'jsonwebtoken';

// const PORT = 9000;
// const app = express();

// dotenv.config();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// app.get('/get-token', (req, res) => {
//   const API_KEY = process.env.VIDEOSDK_API_KEY;
//   const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

//   const options: SignOptions = { expiresIn: '2h', algorithm: 'HS256' };

//   const payload = {
//     apikey: API_KEY,
//     permissions: ['ask_join'], // also accepts "ask_join"
//   };

//   const token = jwt.sign(payload, SECRET_KEY, options);
//   res.json({ token });
// });

// app.post('/create-meeting/', (req, res) => {
//   const { token, region } = req.body;
//   const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings`;
//   const options = {
//     method: 'POST',
//     headers: { Authorization: token, 'Content-Type': 'application/json' },
//     body: JSON.stringify({ region }),
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((result) => res.json(result)) // result will contain meetingId
//     .catch((error) => console.error('error', error));
// });

// //
// app.post('/validate-meeting/:meetingId', (req, res) => {
//   const token = req.body.token;
//   const meetingId = req.params.meetingId;

//   const url = `${process.env.VIDEOSDK_API_ENDPOINT}/api/meetings/${meetingId}`;

//   const options = {
//     method: 'POST',
//     headers: { Authorization: token },
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((result) => res.json(result)) // result will contain meetingId
//     .catch((error) => console.error('error', error));
// });
