const infos = require('../models/data');
exports.display = async (req, res, next) => {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7));
    
    const data = await infos.aggregate(
        [    {$project: 
                {
                    "semaine_prod": "$semaine_prod",
                    "semaine_cmd" : "$semaine_cmd",
                    "planning_date": "$planning_date",
                    "on_hand_balance" : "$on_hand_balance",
                    "item_number": "$item_number",
                    "item_name": '$item_name'
                   

                          
                }
            },
            {$group: 
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
                "planning_date": 1
            
               }
           }
        ]
    );
   console.log("aggregate function",data.length)
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
   Retards = [];
    Retards = tab.filter((el) =>{
  
     
    
   })
//    console.log("tableau tab longuer : ",tab.length);
//    console.log("tableau tab contenu : ",tab);

   console.log("tableau d longuer : ",Retards.length);

    res.send(tab);
}


//remarque ajouter un champ retard pour les commandes avant la date d'aujourd'hui
exports.countDistinct = async (req, res, next) =>  {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7));
    console.log(`Today's date is  (${date}) in weeks:  ${out}`);
    const calcul = await  infos.aggregate([
         { 
             $project : { 
                 "semaine_prod" : "$semaine_prod",
                 "semaine_cmd" : "$semaine_cmd",
                 "on_hand_balance" : "$on_hand_balance",
                 "planning_date": "$planning_date",
                 "item_number": "$item_number"
             }
            },
             {

              $group : {
                  "_id" : {
                    "item_number" : "$item_number",
                    "planning_date" : "$planning_date"
                  },
                  "BesoinParItemDistinct" : {
                      "$sum" : 1
                     },
              }
         },
         {
             $sort : {
                 BesoinParItemDistinct: -1
             }
         }
    ]);
   
  console.log("d'apres fonction calcul",calcul.length)
    res.send(calcul);

}
exports.all = async (req,res,next) => {
    const test = await infos.aggregate([
        { $project : 
            {
                "order_number" : "$order_number",
                "item_number" : "$item_number",
                "planning_date" : "$planning_date",
                "on_hand_balance" : "$on_hand_balance",
                "semaine_prod": "$semaine_prod",
                "semaine_cmd": "$semaine_cmd",
            }
        },
        {
            $group : {
                "_id" : {
                    "item_number" :"$item_number",
                    "order_number": "$order_number",
                    "planning_date" :"$planning_date",
                    "semaine_prod" :"$semaine_prod",
                    "semaine_cmd" :"$semaine_cmd"
                    
                }
            }
        }
    ]);

    console.log(test.length)
    res.send(test)
}