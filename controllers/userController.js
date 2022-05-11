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



// exports.loggin = async (req, res, next) => {

//  try {
//         const { email, password } = req.body;
//         // checks if email and password is entered by user
//         if (!email || !password) {
//           return res.send({ status:'NOK',message:'please entre email & password'})
//         }
//           // finding user in database
//         const verifuser = await User.findOne({ email: req.body.email })
//         // .select("password")
//         if (!verifuser) {
//             return res.send({ status:'NOK',message:'invalid email'})
//         }
//           // bcrypt. 
//         const verifpass = await bcrypt.compare(password, verifuser.password)
//         if (!verifpass) {
//            return res.send({ status:'NOK',message:'invalid password'})
//          }
       
//           // return res.send({status: 'OKAY', message: 'Email & Password is valid'})
          
//         else {
          
//            return res.send({status:'ok',message:'valid Password && Email'})
//         }
//     }
//     catch(error){
//        res.status(500).json(error)
//     }

// }

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
                // status: "Ok"
            })
            // return res.send({status: "Ok",token: token})
        })
       
        .catch(err => {
            console.log(err);
            next();
        })

    }



//getAllUsers
exports.findAll = async (req, res, next)=> {
    const users = await User.find((error, data)=> {
        if (error){
            return next(error)
        }
        else {
            res.send(users)
        }
    })
}

exports.count = async (req, res) => {
 const usercomptes = await User.countDocuments();
 res.status(200).json(usercomptes);
 usercomptes
}


