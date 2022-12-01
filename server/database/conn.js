import mongoose from "mongoose";
const DatabaseURI = process.env.ATLAS_URI;

export const connectDb = async () => {
    try {
        await mongoose.connect(DatabaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Mongo connected");
    } catch (error) {
        console.log(error.message);
    }
};
