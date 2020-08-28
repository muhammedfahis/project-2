const express=require('express');
const router=express.Router();
const session=require('express-session');
const User=require('../models/users')

const Admin={
    username:'fahis',
    password:'123'
}
router.use(session({
    secret:'ok',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*60*12
    }
}));

const dashboardProtecter=(req,res,next)=>{
if(!req.session.username){
    res.redirect('/admin');
}
next();
}



router.get('/admin',(req,res)=>{
    res.render('login',{style:'login.css'});
});

router.post('/admin',(req,res)=>{
    const {username,password}=req.body
    if(username ===Admin.username && password === Admin.password){
        req.session.username=username;
        res.redirect('/dashboard');
    }else{
        res.redirect('/admin');
    }

});

router.get('/dashboard',dashboardProtecter,(req,res)=>{
   User.find({},{password:0}).lean().exec((err,data)=>{
       res.render('dashboard',{user:data});
   })
    
});
router.post('/logout',(req,res)=>{
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/admin');
});

router.get('/admin/edit',(req,res)=>{
    res.render('edit')
});

router.post('/admin/edit',(req,res)=>{
    const id=req.body.id;
    User.find({_id:id}).lean().exec((err,data)=>{
        if(data){
            res.render('edit',{
                data:data
            });
        }

    })
});

router.post('/admin/editsave',(req,res)=>{
    const { username, email, password } = req.body;
    User.updateOne({email:email},{$set:{username:username,password:password}},(err)=>{
        if(err) throw err;
        res.redirect('/dashboard');
    })

  });

  router.post('/admin/delete',(req,res)=>{
      const  id=req.body.id;
      User.deleteOne({_id:id},(err)=>{
          if(err)throw err;
          res.redirect('/dashboard');
      });
      
  })



module.exports=router;
