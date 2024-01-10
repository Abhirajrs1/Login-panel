
var express = require('express');

var router = express.Router();


const credential ={
    email:"abhirajrs1998@gmail.com",
    password:"abhi123"
}


//login user

router.post('/login',(req,res)=>{
     console.log(req.body);
    if(req.body.email && req.body.password){
    if(req.body.email === credential.email && req.body.password === credential.password){
        // console.log(req.session)
req.session.user = req.body.email;
res.redirect('/route/dashboard')
// res.end("Login Successful...!")

    }else{
        // res.end("Invalid Username or Password")

         res.render('base', {error: "Invalid username or password"})
    }
}else{
    res.render('base', {error: "Please fill in both email and password"})
//    res.send("Please fill in both Email and Password")
} 
    
})

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }
    else{
        res.redirect('/');
        //res.send("unothrized user")
    }
    
})



// route for logout
router.get('/logout',(req,res)=>{
   req.session.destroy(function(err){
    if(err){
        console.log(err);
        res.send("Error")
    }else{
        // res.render('base',{title:"Express",logout:"logout Successfully...!"})
        res.redirect('/?isLogout="true"')
    }
   })
})



module.exports = router;