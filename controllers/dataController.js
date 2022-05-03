// const infos = require('../models/data');
// exports.findEvery =(req, res, next) => {
//     infos.find({},{_id: 0},(error, data) => {
//         if(error)  {
//             return next(error);
//         }
//         else {
             
//             res.send(data)
//         }
//     })
//     .sort( {semaine_prod: 1})

// }
// exports.findOne = (req, res) =>  {
//     const id = req.params.id;
//     infos.findById(id)
//     .then(data => {
//         if(!data)
//         res.status(404).send({message: "Not Found"});
//         else 
//           res.send(data);
//     })
//     .catch(error => {
//         res
//         .status(500)
//         .send({message: 'Error while retriving data by their Id'})
//     })
// }
// exports.createCommande = (req, res) => {

//      //valdate request
//      if(!req.body){
//         //status 400 Bad Request/ Empty
//         return res.status(400).send({
//             message : "please comlpelte al  fields"
//         });
       
//     }
//     //create a new Command 
//     const info = new infos({
      
//        item_number:req.body.item_number,
//        item_name:req.body.item_name,
//        on_hand_balance: req.body.on_hand_balance,
//        planning_date :req.body.planning_date,
//        semaine_cmd :req.body.semaine_cmd,
//        semaine_prod : req.body.semaine_prod,
//        cmd_mois: req.body.cmd_mois,
//        cmd_annee: req.body.cmd_annee,
//        customer_name: req.body.customer_name,
//        order_number: req.body.order_number
//    });
//    //save nformation
//    infos.save() 
//    .then(data => {
//        res.send(data)
//    })
//    .catch(err => {
//        res.status(500).send({message: err.message || "there is a probleme , sorry"})
//    })

// }





























const infos = require('../models/data');
exports.display = async (req, res, next) => {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7));
    
    const data = await infos.aggregate(
        [    { "$project" : 
                {
                    "semaine_prod": "$semaine_prod",
                    "semaine_cmd" : "$semaine_cmd",
                    "planning_date": "$planning_date",
                    "on_hand_balance" : "$on_hand_balance",
                    "item_number": "$item_number",
                    "item_name": '$item_name' 
                }
            },
            { "$group": 
                {"_id": 
                {
                 semaine_cmd: "$semaine_cmd", 
                 semaine_prod: "$semaine_prod",
                 on_hand_balance: "$on_hand_balance",
                 planning_date: "$planning_date",
                 item_number : "$item_number",
                 item_name:"$item_name"
                },
                "BesoinBrut" : 
                {
                    "$sum" :1
                },
                }
           },
           
           { 
             $sort : 
               {
                "semaine_cmd": 1,
                "planning_date": 1,
                "item_number": 1
            
               }
           }
        ]
    );
   let tab = [];
   data.forEach((el)=> {
    tab.push({
        semaine_cmd: el._id.semaine_cmd,
        semaine_prod: el._id.semaine_prod,
        on_hand_balance: el._id.on_hand_balance,
        item_number: el._id.item_number,
        item_name : el._id.item_name,
        BesoinBrut : el.BesoinBrut,
        planning_date : el._id.planning_date,
        BesoinNet : el._id.on_hand_balance - el.BesoinBrut, 

        
    });
   })

    res.send(tab);
}


//remarque ajouter un champ retard pour les commandes avant la date d'aujourd'hui
exports.countDistinct = async (req, res, next) =>  {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7));
   
    const calcul = await  infos.aggregate([
         { 
             "$project" : { 
                //  "semaine_prod" : "$semaine_prod",
                 "semaine_cmd" : "$semaine_cmd",
                 "on_hand_balance" : "$on_hand_balance",
                //  "planning_date": "$planning_date",
                 "item_number": "$item_number",
                 "StatusCommande": {
                     "$cond" : {
                         if:
                         {
                             "$lt": [ "semaine_cmd", out]
                         },
                         then : "Retard",
                         else : "A temps"
                     }
                 }
             }
            },
             {

              "$group" : 
              {
                  "_id" : {
                    item_number : "$item_number",
                    on_hand_balance : "son_hand_balance",
                    semaine_cmd : "$semaine_cmd"
                  },
                "BesoinParSemaine": {
                    "$sum": 1
                }
              }
         },
         {
             $sort : {
                item_number: 1,
             }
         }
    ]);
    
 let tab2 = [];
    calcul.forEach((x)=> {
        tab2.push({
            semaine_cmd: x._id.semaine_cmd,
            on_hand_balance: x._id.on_hand_balance,
            item_number: x._id.item_number,
            BesoinParSemaine : x.BesoinParSemaine
    
            
        });
    })
    res.send(tab2);
}
exports.test = async (req, res, next) =>  {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7));
    const elm = infos.aggregate([
        {
            "$project" : {
                "item_number": "$item_number",
                "semaine_cmd": "$semaine_cmd",
                "on_hand_balance": "$on_hand_balance",
            }
        }
        ,
        {

         "$group" : {
             "_id" : {
               "item_number" : "$item_number",
             },

           "StatusCommande": {
               "$sum": 1
           }
         },
         
    },
    {
        $sort : {
            item_number: -1
        }
    }
]);
console.log(elm);
res.send(elm)
}
// exports.all = async (req,res,next) => {
//     const test = await infos.aggregate([
//         { $project : 
//             {
//                 "order_number" : "$order_number",
//                 "item_number" : "$item_number",
//                 "planning_date" : "$planning_date",
//                 "on_hand_balance" : "$on_hand_balance",
//                 "semaine_prod": "$semaine_prod",
//                 "semaine_cmd": "$semaine_cmd",
//             }
//         },
//         {
//             $group : {
//                 "_id" : {
//                     "item_number" :"$item_number",
//                     "order_number": "$order_number",
//                     "planning_date" :"$planning_date",
//                     "semaine_prod" :"$semaine_prod",
//                     "semaine_cmd" :"$semaine_cmd"
                    
//                 }
//             }
//         }
//     ]);

//     res.send(test)
// }


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
       //save nformation
       infos.save() 
       .then(data => {
           res.send(data)
       })
       .catch(err => {
           res.status(500).send({message: err.message || "there is a probleme , sorry"})
       })
    
    }