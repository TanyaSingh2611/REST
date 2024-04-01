
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
//uuid
const {v4: uuidv4} =require('uuid');


app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

//abhi database nhi h toh mini db
let post =[
    {
        id:uuidv4(),
        username: "apnaCollege",
        content: "I Love Coding",
    },
    {
        id:uuidv4(),
        username: "TanyaSingh",
        content: "I Love Dancing",
    },
    {
        id:uuidv4(),
        username: "RahulSingh",
        content: "I Love Yoko kl",
    }
];



app.get("/posts",(req,res)=>{
    res.render("index.ejs",{post});
})

//To add A new Post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let { username , content} =req.body;
    let id = uuidv4();
    post.push({id ,username,content});
     // console.log(post);
    res.redirect("/posts");
})

//Show seperately
app.get("/posts/:id", (req,res)=>{
    let {id} = req.params;
    // console.log(id);
    let postSeperate = post.find((p)=> id==p.id );
    console.log(postSeperate)
    res.render("show.ejs",{postSeperate});
})

//Partial updation
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params; 
    let newContent = req.body.content;
    console.log(newContent);
    console.log(id);
    res.send("Patch request Working")
})

//edit
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let pt= post.find((p)=> id==p.id );
    res.render("edit.ejs");
})

app.listen(port,()=>{
    console.log(`Listening to port : ${port}`);
})