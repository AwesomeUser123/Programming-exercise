import Express from "express";
const app = Express();
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import foodgetRoutes from "./routes/foodget.js"
import availableRoutes from "./routes/available.js"
import bookRoutes from "./routes/book.js"
import eventRoutes from "./routes/event.js"
import contactRoute from "./routes/contact.js";
import cookieParser from "cookie-parser";
import cors from "cors"

//middlewares
app.use(Express.json())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

app.use(cookieParser())

app.use("/api/foodget",foodgetRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/reservation",availableRoutes)
app.use("/api/service",bookRoutes)
app.use("/api/contact",contactRoute)
app.use("/api/event",eventRoutes)
app.listen(8800,() =>{
    console.log("API worked")
})
// Will add the below code later
// cron.schedule("1 0 * * *", async () => {
//   console.log("Running daily reservation update at 00:01...");
//   await runAutoReservation();
// });