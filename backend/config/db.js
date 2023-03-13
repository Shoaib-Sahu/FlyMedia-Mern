import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectToDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
        .catch((err) => {
            console.log("There is an error", err);
        });
};

export default connectToDatabase;