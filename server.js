import express from 'express'
import routes from './routes';
import mongoose from 'mongoose';

const app = express()
const DB_URL = "mongodb+srv://mongoProject:lTEWn5CtZOMrIjw3@cluster0.q2osnnj.mongodb.net/API-assignment"
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',console.error.bind(console, 'connection error: '))
db.once('open', ()=>{
	console.log('DB Connected ...');
})

app.use(express.json())
app.use('/', routes)

app.listen(3000,()=>{
	console.log('listening');
})