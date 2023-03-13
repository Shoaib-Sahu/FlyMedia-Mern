import connectToDatabase from "./config/db.js";
import dotenv from "dotenv";
import app from "./app.js";

// Config
dotenv.config({ path: "./config/config.env" });
// Connecting to Database
connectToDatabase();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});