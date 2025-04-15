import mongoose from "mongoose";


const mongoDB_URI=process.env.MONGODB_URI;

if (!mongoDB_URI){
   throw new Error('Mongo Uri no Found')
}

let cached=global.mongoose;
if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

async function dbConnect(){
    if (cached.conn){
        return cached.conn
    };
    if(!cached.promise){
        const opts={
            bufferCommands:false,
        }
        cached.promise=mongoose.connect(mongoDB_URI,opts).then((mongoose)=>{
            return mongoose
        })

       
    };
    cached.conn=await cached.promise
        return cached.conn

}
export default dbConnect;