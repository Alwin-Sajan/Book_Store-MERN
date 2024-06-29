import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for parsing request body
//option 1 allow all origins with default of core(*)
app.use(cors());
//option 2 allow specific origins
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome To Mern Stack Tutorial")
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App conected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        })

    })
    .catch((error) => {
        console.log(error)
    })