import mongoose from "mongoose";

const db_url = process.env.DB_URL

export async function connectDB(){
    try {
     await mongoose.connect(db_url,{dbName:'webanalyze'})   
     console.log('db Connection successfull')
    } catch (error) {
      console.log(error.message)  
    }
    
}
