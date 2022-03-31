const User = require('../models/user');
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
exports.findUser = (req, res) => {
    const id= req.params.id;
    User.findById(id)
    .then(data => {
        if(!data)
        //Error 404 couldn't find the request
        //Status 200 : ok /s tatus 201: ok + created
        res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res
            //Server probleme crashed       
          .status(500)
          .send({ message: "Error retrieving data with id=" + id });
    });

}
exports.createUser = (req, res, next)=> {
    if(!req.body){
        return res.status(400).send({
            message : "please comlpelte al  fields"
        });
       
    }
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.save() 
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({message: err.message || "there is a probleme , sorry"})
    })
}

exports.loginUser = (req,res, next) =>{

}