import express from "express"
import dotenv from "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import workoutRoutes from "./routes/workoutRoutes.js"
import morgan from "morgan"
const app = express()
connectDB()

app.use(express.json());
app.use(morgan('tiny'))

app.use(cors({
    origin: "https://gracks.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    credentials: true
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://gracks.vercel.app'); // Replace with your allowed origin
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/workouts', workoutRoutes)
app.use('/users', userRoutes)
app.get("/", (req, res) => {
    res.json("Hello World")
})


console.log(process.env.PORT)

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server running at ${port}`))
