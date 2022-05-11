const infos = require('../models/data');
exports.display = async (req, res, next) => {
        try {
            const data = await infos.aggregate(
                [    { "$project" : 
                        {
                            "semaine_prod": "$semaine_prod",
                            "semaine_cmd" : "$semaine_cmd",
                            "planning_date": "$planning_date",
                            "on_hand_balance" : "$on_hand_balance",
                            "item_number": "$item_number",
                            "item_name": '$item_name' ,
                            "order_number": "$order_number",
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
                         item_name:"$item_name",
                         order_number: "$order_number",
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
                order_number: el._id.order_number,
                // BesoinCumule : el.BesoinNet 
                
            });
           })
           let tabs = [];
           tabs= tab.sort((a,b)=>(a.item_number>b.item_number? 1: -1))
          res.send(tabs);
        }
        catch(err){
             res.status(500).json({message: err.message || "Some went wrong while retrieving data"});
        }
    
}


//remarque ajouter un champ retard pour les commandes avant la date d'aujourd'hui
exports.countDistinct = async (req, res, next) =>  {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7)) - 2;
    console.log(out)
   try {
    const calcul = await  infos.aggregate([
        { 
            "$project" : { 
                            "semaine_cmd" : "$semaine_cmd",
                            "semaine_prod": "$semaine_prod",
                             "planning_date": "$planning_date",
                            "on_hand_balance" : "$on_hand_balance",
                            "item_number": "$item_number",
                            "cmd_mois": "$cmd_mois",
                    "StatusCommande": {
                        "$cond" : {
                            if:
                            {
                                "$lt": [ "$semaine_cmd", out]
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
                    semaine_cmd: "$semaine_cmd", 
                    on_hand_balance: "$on_hand_balance",
                    planning_date: "$planning_date",
                    item_number : "$item_number",
                    cmd_mois: "$cmd_mois",
                   StatusCommande: "$StatusCommande",

                 },
               "BesoinBrut": {
                   "$sum": 1
               }
             }
        },
                {
                    $sort : {
                    item_number: 1,
                    StatusCommande: 1
                    }
                }
        ]);
        
        let tab2 = [];
        calcul.forEach((x)=> {
            tab2.push({
                semaine_cmd: x._id.semaine_cmd,
                // on_hand_balance: x._id.on_hand_balance,
                cmd_mois:x._id.cmd_mois,
                item_number: x._id.item_number,
                BesoinBrut : x.BesoinBrut,
                StatusCommande: x._id.StatusCommande,
                BesoinNet: x._id.on_hand_balance - x.BesoinBrut
            });
        })
        let tabs = tab2.sort((a,b)=>(a.semaine_cmd> b.semaine_cmd? 1: -1))
        res.status(200).json(tabs)

   } catch (err) {
       res.status(500).json({message: err.message || "Some error occurred!!"})
   }
}
//get All Datas
exports.getData = async (req, res, next) =>  {
    const page =parseInt( req.query.page);
    const limit =parseInt( req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page  * limit;
  
   try {
    const dats  = await infos.find();
    const results = {};
    if(endIndex < dats.length) {
        results.next = {
            page: page +1,
            limit: limit
        }
    }
    
    if(startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    
     results.results = dats.slice(startIndex, endIndex);
    res.status(200).json(results);
   }
   catch(error){
    res.status(404).json({ message: error.message });
   }
   
}
