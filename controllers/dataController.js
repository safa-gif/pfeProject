const infos = require('../models/data');
const db = require('../database/db.config')
exports.findEvery =(req, res, next) => {
    const piplene = db.collection('filtreData').aggregate(
        [
            {
                "$match" :  {
                    item_number : "Z64314M1"
                }
            },

            {
                "$count" : {
                    "count" : 1
                }
            },
            {
                "$filter" : {
                    semaine_prod : 2
                }
            }
        ]
       
    )
    infos.find({},{_id: 0},(error, data) => {
        if(error)  {
            return next(error);
        }
        else {
             
            res.send(data)
        }
    })
    .sort( {semaine_prod: 1})
    // .count({item_number: 1})

}
exports.findOne = (req, res) =>  {
    const id = req.params.id;
    infos.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not Found"});
        else 
          res.send(data);
    })
    .catch(error => {
        res
        .status(500)
        .send({message: 'Error while retriving data by their Id'})
    })
}
exports.createCommande = (req, res) => {

     //valdate request
     if(!req.body){
        //status 400 Bad Request/ Empty
        return res.status(400).send({
            message : "please comlpelte al  fields"
        });
       
    }
    //create a new Command 
    const info = new infos({
      
       item_number:req.body.item_number,
       item_name:req.body.item_name,
       on_hand_balance: req.body.on_hand_balance,
       planning_date :req.body.planning_date,
       semaine_cmd :req.body.semaine_cmd,
       semaine_prod : req.body.semaine_prod,
       cmd_mois: req.body.cmd_mois,
       cmd_annee: req.body.cmd_annee,
       customer_name: req.body.customer_name,
       order_number: req.body.order_number
   });
   //save Cmd
   info.save() 
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({message: err.message || "there is a probleme , sorry"})
   })

}