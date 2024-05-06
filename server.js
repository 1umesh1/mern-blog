

require("dotenv").config();
const express = require('express')
 const app = express();
const PORT = process.env.PORT || 8000
const cors = require("cors");
const {MongoClient} =require("mongodb");
// next two lines tells parse requests of content-type
// which are application/x-www-form-urlencoded and json respectively
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Server production assests
// Accessing the path module
const path = require("path");


// if(process.env.NODE_ENV==="production"){
// // Step 1:
// app.use(express.static(("/client/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

// }




const articlesInfo ={
    "learn-react":{
        comments:[],
    },
    "learn-node":{
        comments:[],
    },
    "my-thoughts-on-learning-react":{
        comments:[],
    },
}

//Initialize middleware
// We use to have to install body parser but now it is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({extended:false}));

MongoClient.connect(process.env.MONGO_URI).catch((err) => console.log(err))

 //just a test route for now
//  app.get('/', (req,res)=> res.send(`Hello, World!`));
//  app.get('/hello/:name', (req,res)=> res.send(`Hello ${req.params.name}`));
//  app.post('/', (req,res)=> res.send(`Hello, ${req.body.name}!`));



 const withDB = async(operations,res )=> {
    try{ 
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("db_umesk");
     await operations(db);
     client.close;  
     console.log("Successfully db connected " + process.env.MONGO_URI);
    } catch(error){
        res.status(500).json({message:"Error connecting to db", error});
        console.log(" db is not connected " + process.env.MONGO_URI);
    }
 }


 app.get('/api/articles/:name',async(req,res)=>{
  withDB(async (db)=>{
    const articleName = req.params.name; 
    const articleInfo = await db
    .collection("articles")
    .findOne({name: articleName});
    if(articleInfo==null){
        res.status(400)
        .json({message:"No data to show"});
    }
    res.status(200)
    .json(articleInfo);
  }, res) 
 });


 app.post('/api/articles/:name/add-comments',(req,res)=> {
    const{username,text} = req.body;
    const articleName = req.params.name; 

    withDB(async(db)=>{
        const articleInfo = await db.collection('articles')
        .findOne({name:articleName});
        await db.collection('articles')
        .updateOne({name:articleName},{
            $set:{
                comments:articleInfo.comments.concat({username,text}),
            },
            
        });
        const updateArticleInfo= await db.collection('articles')
        .findOne({name:articleName});
        res.status(200).json(updateArticleInfo);
    }, res);



    if(process.env.NODE_ENV==="production"){
        // Step 1:
        app.use(express.static(path.resolve(__dirname, "./client/build")));
        // Step 2:
        app.get("*", function (request, response) {
          response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
        });
        }
    
        
     app.listen(process.env.PORT||8000,()=> console.log(`Server stared at port ${PORT}`));
 })