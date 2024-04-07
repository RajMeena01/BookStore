import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

//Middleware for passing request to body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: allow all origins with default of cors(*)
app.use(cors());
//Option 2: allow custom origins
// app.use(cors({
//     origin : 'http://localhost:3000',
//     methods: ['GET', 'PUT', 'POST', 'DELETE'],
//     allowedHeaders: ['content-type'],
// }));

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to book allocation project");
});


app.use("/books", booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to databae");
    app.listen(PORT, () => {
      console.log(`Your Server running on this port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
