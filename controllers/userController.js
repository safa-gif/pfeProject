const User = require('../models/user');
var jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    var user = new User(
        {
        email: req.body.email,
        username: req.body.username,
        password: User.hashPassword(req.body.password)
        }
    );
    user.save()
    .then((doc)=>{
        res.status(201).json(doc);
    })
    .catch((err) => {
        return res.status(501).json({message: 'Error registering user.'})
      })
}
exports.signin =(req, res, next) => {
    User.findOne({email:req.body.email}).exec()
    .then((doc)=>{
        if(doc){
            if(doc.isValid(req.body.password)){
                // generate token
             let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});
             return res.status(200).json;
            }
            else {
                return res.status(501).json({message:' Invalid Credentials'});
              }
        }
        else{
            return res.status(501).json({message:'User email is not registered.'})
        }
    })
    .catch(err => {
        return res.status(501).json({message:'Some internal error'});
    })

   
}
exports.findUser= (req,res, next) => {
    return res.status(200).json(decodedToken.username);
}

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      next();
    }
  })
}
// exports.findAll = (req, res, next)=> {
//     User.find((error, data)=> {
//         if (error){
//             return next(error)
//         }
//         else {
//             res.send(data)
//         }
//     })
// }
// exports.findUser = (req, res) => {
//     const id= req.params.id;
//     User.findById(id)
//     .then(data => {
//         if(!data)
//         //Error 404 couldn't find the request
//         //Status 200 : ok /s tatus 201: ok + created
//         res.status(404).send({ message: "Not found Tutorial with id " + id });
//         else res.send(data);
//     })
//     .catch(err => {
//         res
//             //Server probleme crashed       
//           .status(500)
//           .send({ message: "Error retrieving data with id=" + id });
//     });

// }
// exports.createUser = (req, res, next)=> {
//     if(!req.body){
//         return res.status(400).send({
//             message : "please comlpelte al  fields"
//         });
       
//     }
//     const newUser = new User({
//         email: req.body.email,
//         password: req.body.password
//     });
//     User.save() 
//     .then(data => {
//         res.send(data)
//     })
//     .catch(err => {
//         res.status(500).send({message: err.message || "there is a probleme , sorry"})
//     })
// }

// exports.loginUser = (req,res, next) =>{

// }

