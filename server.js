import express from 'express'
import fs from 'fs';
import cors from 'cors'
import mongoose from 'mongoose';
const app = express();
require('dotenv').config();
const morgan = require('morgan');

// routes middleware
mongoose.connect(process.env.DATABASE)
.then(()=> console.log('DB connected'))
.catch((err)=>console.log('DB CONNECTION ERROR :',err))
app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
const port = process.env.PORT || 6060
app.listen(port,()=> console.log(`Server is listening on port ${port}`));