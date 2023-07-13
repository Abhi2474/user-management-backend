import express from 'express'
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DB_URL;


const app = express()

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',console.error.bind(console, 'connection error: '))
db.once('open', ()=>{
	console.log('DB Connected ...');
})

app.use(express.json())
app.use(cors())
app.use('/', routes)

app.listen(3000,()=>{
	console.log('listening');
})