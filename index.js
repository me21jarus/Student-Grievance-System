const express=require("express");
const mongoose=require("mongoose");
const body_parser=require("body-parser");

const app=express();

const details=[];

app.use(body_parser.urlencoded({extended:true}));
app.set('view-engine','ejs');
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/StudentDB').then(()=>{console.log("connected")}).catch((e)=>{console.log(e)});

const loginSchema=mongoose.Schema({
    Usn:String,
    Password:String
});

const maintainSchema=mongoose.Schema({
    name:String,
    deptartment:String,
    sem:String,
    desc:String,
    status:Boolean
});

const Login=mongoose.model('Login',loginSchema);
const Maintain=mongoose.model('Maintain',maintainSchema);





app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/complent",function(req,res){
    res.render("complent.ejs");
});

app.get("/About",function(req,res){
    res.render("About.ejs");
});

app.get("/contact",function(req,res){
    res.render("contact.ejs");
});

app.get("/faculty",function(req,res){
    res.render("faculty.ejs");
});

app.get("/maintance",function(req,res){
    res.render("maintance.ejs");
});

app.get("/student",function(req,res){

    Maintain.find().then((data) => {
        res.render("student.ejs", {tasks: data})
    })
   
});


app.get("/academics",function(res,res){
    res.render("academics.ejs");
});

app.get("/ragging",function(req,res){
    res.render("ragging.ejs");
});

app.get("/letter",function(req,res){
    res.render("letter.ejs");
});




app.post("/submission",function(req,res){
    res.render("submission.ejs");
});

app.post("/student",function(req,res){

    Maintain.find().then((data) => {
        res.render("student.ejs", {tasks: data})
    })

    
   
});





app.post("/review", (req, res)=>{
    
    Maintain.findOneAndUpdate({_id: req.body.rev}, {$set: {status: true}}).then((e)=>{
     res.render("review.ejs");
    }).catch((err) => {
        console.log(err)
    })
        
        

});






app.post("/complent",function(req,res){

const newUsn=req.body.Usn;
const newPass=req.body.dob;
    
const  login=new Login({
    Usn:newUsn,
    Password:newPass
});

login.save().then(()=>{
    res.render("complent.ejs");
})
.catch((er)=>{
    console.log(er);
});


});





app.post("/maintance",function(req,res){
    
    const data={
        name:req.body.Name,
        deptartment:req.body.Depart,
        sem:req.body.Sem,
        desc:req.body.Desc  ,
        status: false
    };

    const maintance=new Maintain(data);

    maintance.save().then(()=>{
        res.render("maintainDB.ejs");
    })
    .catch((er)=>[
        console.log(er)
    ]);


});



app.listen(3000,function(){
    console.log("server is running with port 3000");
});