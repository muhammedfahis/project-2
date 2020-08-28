const express=require('express');
const router=express.Router();
const User=require('../models/users');
const session=require('express-session');




router.use(session({
    secret:'ok',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*60*12
    }
}));

const userDashboardChecker = (req,res,next) => {
    if(!req.session.username){
        res.redirect('/user/user');
    }else{
    next();
}}


router.get('/register',(req,res)=>{
    res.render('register',{style:'register.css'});
});

router.post('/register',(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=new User({
        username:username,
        password:password,
        email:email
    });
    newUser.save();
    res.redirect('/user/user');
});


router.get('/user',(req,res)=>{
    res.render('userLogin',{style:'userLogin.css'});
});
router.post('/user',(req,res)=>{
    const {username,password}=req.body;
    User.find({username:username,password:password}).lean().exec((err,data)=>{
        if(data){
            req.session.username=username;
            console.log(data.username);
            res.redirect('/user/dashboard');
        }else{
            res.redirect('/user');
        }
    })
});

router.get('/user/dashboard',userDashboardChecker,(req,res)=>{
    res.render('userDashboard');
})

module.exports=router