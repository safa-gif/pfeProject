const dateM = require('../models/date');



exports.findEl = async (req, res, next) => {
    const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7)) - 3;
    const items = dateM.distinct('item_number');
    const com = await dateM.aggregate([
        // { 
        //     "$project": { 

        //         "item_number": "$item_number",
        //         "semaine_cmd" :  "$semaine_cmd",
        //         "semaine_prod": "$semaine_prod",
        //         "annee_cmd": "$annee_cmd"
        //     }
        // }
        // ,

        // {
        //     "$match ": 
        //     { 
   
        //     }
        // },
        {   
            "$group" : {
              "_id" : 
              {
                  _id : "_id",
                semaine_cmd: "$semaine_cmd",
                semaine_prod: "$semaine_prod",
                annee_cmd : "$annee_cmd",
                item_number: "$item_number",
               },
               "BesoinNet": {
                   "$sum": 1
               },
            }
        },
           {
               $sort : {
                   BesoinNet : -1               
                }
            }
    ])
    let tab = [];
    com.forEach((el)=> {
      tab.push({
          semaine_cmd : el._id.semaine_cmd,
          semaine_prod : el._id.semaine_prod,
          item_number : el._id.item_number,
          annee_cmd: el._id.annee_cmd,
          BesoinNet : el.BesoinNet
      })
    })
    res.send(tab)
    // try{
    //     const info = await dateM.find(
    //         {'item_number' : "Z62421FF"}
    //     );
    //     res.status(202).json(info);
        
    // }
    // catch(error){
    //     res.status(404).json({ message: error.message });
    // }
}