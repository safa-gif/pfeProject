const User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');

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
                token: token,
            })
        })
       
        .catch(err => {
            console.log(err);
            next();
        })

    }

exports.updateUser = async (req, res, next)=> {
    User.findByIdAndUpdate(
        req.params.id,
        {
            username : req.body.username,
            email: req.body.email
          },
          { new: true }
    )
    .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "User  not found with id " + req.params.id,
          });
        }
        res.send(data);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.id,
          });
        }
        return res.status(500).send({
          message: "Error updating message with id " + req.params.id,
        });
      });
  
       
    
}

//getAllUsers
exports.findAll = async (req, res, next)=> {
    
    try {
          const users = await User.find()
        res.status(200).json(users)
    }
    catch(error){
      res.status(500).json(error)
    }
}

exports.count = async (req, res) => {
    try{
        const usercomptes = await User.countDocuments();
        const qtu =usercomptes;
        res.status(200).json(qtu);
      qtu
    }
   catch(error) {
       res.status(500).json(error)
   }
}



exports.deleteUser = async (req,res,next) => {
  const user  = await User.findById(req.params.id);
  if (!user){
  return next (new ErrorHandler('user not found',404));
      }
  await user.remove();
  res.status(200).json({
  success: true,
  message : 'user is deleted!!!!'
  })
} 

exports.getSingleUser = async (req,res,next) => {
  try {
    const id = req.params.id
    const user = await User.findById(id);
    res.status(200).json(user)
     const _id= id
     console.log(_id) 
     console.log(user) 

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logoutUser = async (req, res,next) => {
  

}
