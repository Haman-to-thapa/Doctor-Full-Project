import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from "dotenv";
import connectDB from './config/mongoodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'



// app   config 

const app = express()
const port = process.env.PORT || 5000;
connectDB()
connectCloudinary()
dotenv.config();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

//localhost:4000;api/admin/add-doctor

app.get('/', (req, res) => {
   res.send('API WORKING haman')
})


app.listen(port, () => console.log('Server Started', port))

