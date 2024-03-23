var express = require('express');
var router = express.Router();
const userModel = require("./users");
const session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.ban = true;   // session
  res.cookie("name", 49);
  res.render("index");
});

// Session 
router.get("/checkban", function(req, res){
  if (req.session.ban === true){
  res.send("ban you ")
}
else{
  res.send("not banned")
}
})

// remove ban
router.get("/removeban", function(req, res){
  req.session.destroy(function(err){
    console.log(err)
    if (err) throw err;
  res.send("ban removed")
  })
})


// session
// read 
router.get("/read", function(req, res){
  console.log(req.cookies.name);
  res.send("check")
})

router.get("/sdelete", function(req, res){
  res.clearCookie("name")
  res.send("good")
})



// Client => all browser                    server
// cookies > browser par save karna ho  ||session > server par save karna ho  Its Safe  

// Session and Cookies 
// Session => npm i express-session 
// app.js mai session ka code likha var session

// Session 
// create => req.session.anyname = any value;
// read   => req.session.anyname
// delete => req.session.destroy

// Cookies
//  cookie setup => res.cookies("name", value)
//  cookie reading=> res.cookies.name
//  cookie delete=> res.clearcookies("name")





// .find => jitni bhi bando ka data hota wo bhejta hai || or ans hamesha array mai hota hai
// router.get("/alluser",  async function(req,res ){         // agr na ho to null milega CL ki help lo
//   let allusers =  await userModel.find();  // or .fingOne(username : "aahli",); si sirf ik banda hota hai 
//   res.send(allusers);
//   })

// For Delete user 
  router.get("/delete",  async function(req,res ){    
    let deleteu =  await userModel.findOneAndDelete({
     name : "aahil"
    });  
    res.send(deleteu);
    });


router.get('/create', async function(req, res, next) {
 const createduser = await  userModel.create({
  username : "aahli",
  age: 16,
  name : "Aahil"
});
res.send(createduser)
});

module.exports = router;


