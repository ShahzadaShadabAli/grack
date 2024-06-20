import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log("Database Connected")
        console.log('Database Name:', mongoose.connection.db.databaseName);
        console.log('Database Host:', mongoose.connection.host);
        console.log('Database Port:', mongoose.connection.port);
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;