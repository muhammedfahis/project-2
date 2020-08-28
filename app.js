const express=require('express');
const exphr=require('express-handlebars');
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');
const mongoose=require('mongoose');
const path=require('path');


const uri='mongodb://localhost/mydb';
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


const app=express();
const PORT=process.env.PORT || 9001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.engine("handlebars",exphr());
app.set('view engine','handlebars');
app.use('/',adminRouter);
app.use('/user',userRouter);
app.use(express.static(path.join('public')));







app.listen(PORT,()=>console.log(`server is running ${PORT}`));

