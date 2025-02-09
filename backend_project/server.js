import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'


// app   config 

const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())


// api endpoints
app.use('/api/admin',adminRouter)

//localhost:4000;api/admin/add-doctor

app.get('/', (req, res) => {
   res.send('API WORKING haman')
})


app.listen(port, () => console.log('Server Started', port))

