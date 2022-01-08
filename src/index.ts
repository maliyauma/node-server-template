import  express  from "express";
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express';
import mongoose  from 'mongoose';
import { resolvers } from './resolvers/TestResolver';
import { typeDefs } from './typeDefs/typedefs';

const PORT=4000;

const startServer=async()=>
{
const app = express();


const allowedOrigins = [
'http://localhost:3000',
'http://localhost:3001',
'https://studio.apollographql.com'
];
const corsOptions = {
credentials: true,
  origin: function(origin, callback){
   if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}
app.use(cors(corsOptions))
var uri = "mongodb://localhost:27017/testmongo";

//@ts-ignore
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>console.log("connected to newmango db"))

//rest routes
app.get("/", (req, res) => {
res.json({
    data: "API is working...",
  });
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
}
startServer().catch(e=>console.log("error strting server======== ",e))
