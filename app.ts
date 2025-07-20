import express from 'express';
import categoriesRouter from './src/routes/categoriesRoutes'
import projectRouter from './src/routes/projectRoutes'
import reviewRouter from './src/routes/reviewRoutes'
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fileupload from 'express-fileupload'
import authRoutes from './src/routes/authRoutes'
import cors from 'cors';

config();

const app =  express()
const PORT = process.env.PORT || 5000

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json())
app.use(fileupload({
  useTempFiles: true
}))

app.use('/api/v1', categoriesRouter)
app.use('/api/v1', projectRouter)
app.use('/api/v1', reviewRouter)

// Authentication
app.use('/api/auth', authRoutes)

app.use(
  cors({
    origin: ["http://localhost:3000", "https://doughnation.vercel.app/"],
    credentials: true
  })
);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})