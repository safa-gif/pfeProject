const User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
//register
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

//login
exports.signin = async (req, res, next) => {
    // User.findOne({email:req.body.email}).exec()
    // .then((doc)=>{
    //     if(doc){
    //         if(doc.isValid(req.body.password)){
    //             // generate token
    //          let token = jwt.sign({username:doc.username},'secret', {expiresIn : '3h'});
    //          return res.status(200).json;
    //         }
    //         else {
    //             return res.status(501).json({message:' Invalid Credentials'});
    //           }
    //     }
    //     else{
    //         return res.status(501).json({message:'User email is not registered.'})
    //     }
    // })
    // .catch(err => {
    //     return res.status(501).json({message:'Some internal error'});
    // })

    // try {
    //   const { email, password } = req.body;
    //   // checks if email and password is entered by user
    //   if (!email || !password) {
    //      return res.send({ status:'NOK',message:'please entre email & password'})
    //   }
    
    //   // finding user in database
    //   const verifuser = await User.findOne({ email: req.body.email }).select("password")
    //   if (!verifuser) {
         
    //       return res.send({ status:'NOK',message:'invalid email'})
    //   }
    //   // bcrypt.
    //   const verifpass = await bcrypt.compare(password, verifuser.password)
    
    //   if (!verifpass) {
    //       return res.send({ status:'NOK',message:'invalid password'})
    //   }
      
    //   return res.send({ status: 'OK', token: token })
    // }
    // catch(error){
    //   res.status(500).json(error)
    // }
}






 





exports.loggin = async (req, res, next) => {

 try {
        const { email, password } = req.body;
        // checks if email and password is entered by user
        if (!email || !password) {
          return res.send({ status:'NOK',message:'please entre email & password'})
        }
          // finding user in database
        const verifuser = await User.findOne({ email: req.body.email })
        // .select("password")
        if (!verifuser) {
            return res.send({ status:'NOK',message:'invalid email'})
        }
          // bcrypt. 
        const verifpass = await bcrypt.compare(password, verifuser.password)
        if (!verifpass) {
           return res.send({ status:'NOK',message:'invalid password'})
         }
       
          // return res.send({status: 'OKAY', message: 'Email & Password is valid'})
          
        else {
          
           return res.send({status:'ok',message:'valid Password && Email'})
        }
    }
    catch(error){
       res.status(500).json(error)
    }




}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(u => {
            if (!u) {
                const error = new Error("A user with this mail could not be found");
                error.statusCode = 401;
                throw error;
            }
            loadedUser = u;
            return bcrypt.compare(password, loadedUser.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error("Wrong Password");
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 'supersecretcode', { expiresIn: '12h' });
            res.status(200).json({
                message: 'User Logged',
                token: token
            })

        })
        .catch(err => {
            console.log(err);
            next();
        })

    }














// //verifuy token
// exports.verifyToken= (req,res, next) => {
//     return res.status(200).json(decodedToken.username);
// }

// var decodedToken='';
// function verifyToken(req,res,next){
//   let token = req.query.token;

//   jwt.verify(token,'secret', function(err, tokendata){
//     if(err){
//       return res.status(400).json({message:' Unauthorized request'});
//     }
//     if(tokendata){
//       decodedToken = tokendata;
//       next();
//     }
//   })
// }
// //validate
// exports.validateToken = (req, res, next) => {
//   logging.info(User, 'Token validated, user authorized!')
//   return res.status(200).jopn({
//     message : "Authentiifcation autherazied"
//   })
// }
//getAllUsers
exports.findAll = (req, res, next)=> {
    User.find((error, data)=> {
        if (error){
            return next(error)
        }
        else {
            res.send(data)
        }
    })
}
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


// exports.SignUp = (req, res, next)=> {
//   const user = new User(
//     {
//       email : req.body.email,
//       username: req.body.username,
//       password : req.body.password
//     }
//   )
//   user.save()
//   .then(result => res.status(201))
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({error : err})
//   })


// }
// exports.GetAllUsers = (req, res, next)=> {
//  const users = User.find()
//   .then(
//     doc => res.status(200)
//   )
//   .catch(
//     error => {
//       res.status(500).json({error : error})
//     }
//   )
// }