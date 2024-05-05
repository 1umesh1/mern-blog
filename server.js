
const express = require('express')
 const app = express();
const PORT = process.env.PORT || 8000
const {MongoClient} =require("mongodb");


// Server production assests
// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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



 //just a test route for now
 app.get('/', (req,res)=> res.send(`Hello, World!`));
 app.get('/hello/:name', (req,res)=> res.send(`Hello ${req.params.name}`));
 app.post('/', (req,res)=> res.send(`Hello, ${req.body.name}!`));


 app.listen(PORT,()=> console.log(`Server stared at port ${PORT}`));

 const withDB = async(operations,res )=> {
    try{ 
    const client = await MongoClient.connect('mongodb+srv://omeshumesh060:omeshumesh060@mernblog.0kf1ro0.mongodb.net/');
    const db = client.db("db_umesk");
     await operations(db);
     client.close;  
    } catch(error){
        res.status(500).json({message:"Error connecting to db", error})
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
    }, res)
 })