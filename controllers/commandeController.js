const cmd = require('../models/commande');

exports.retrieve = async (req, res)=> {

    try {
     const infos = await cmd.find();
       res.status(200).json(infos);
     }
     catch(error) {
      res.status(500).json(error)
     }
}
//CountTotalCommandesByOrderNumberByYear
exports.cmdparYear = async (req, res, next) => {
   try {
     const TotalCmdY = await cmd.aggregate([
        {
            "$match" : {
                "calendar_year": 
                {
                    $gt : 2021
                }
            }
        },
        { 
            "$project" : {
                "planning_date": "$planning_date",
                "calendar_year": "$calendar_year",
                 "order_number":"$order_number",
                 "item_number": "$item_number",
                "customer_name": "$customer_name",
                "item_number": "$item_number",
                "besoin": "$besoin",
                "customer_name": "$customer_name"
            }

        },
        { "$group": 
        { 
           "_id": {
               "order_number": "$order_number",
               "calendar_year": "$calendar_year",
               "item_number": "$item_number"
           },
           "TotalCmdYs": {
               "$sum": 1
           }
        }
        },
        { "$sort": 
           {
             "TotalCmdYs":1
            }
        }
      ])
      let tab = [];
      TotalCmdY.forEach((doc)=>{
          tab.push({
            item_number : doc._id.item_number,
            order_number:doc._id.order_number,
            TotalCmdYs: doc.TotalCmdYs,
            calendar_year: doc._id.calendar_year
          })
      })
      let tabs = []
      tabs= tab.sort((a,b)=>(a.item_number>b.item_number? 1: -1))
      res.send(tabs)
      console.log(tabs)
      console.log(tabs.length)
   }
   catch(error) {
       res.status(500).json(error)
   }

}
//TotalCommandesParCode
exports.totalCmdByCode = async (req, res) => {
         const TotalCmdId = await cmd.aggregate([
        {"$project": 
          {
            "planning_date": "$planning_date",
            "calendar_year": "$calendar_year",
             "order_number":"$order_number",
             "item_number": "$item_number",
            "customer_name": "$customer_name",
            "item_number": "$item_number",
            "besoin": "$besoin",
            "customer_name": "$customer_name",
            "week_prod":"$week_prod",
          }
        },
        {
            "$group": {
                "_id": {
                    "order_number": "$order_number",
                    "item_number": "$item_number",
                    "calendar_year": "$calendar_year",
                    
                },
                "TotalCmdIds":{
                    "$sum":1
                },

            }
        },
        {
              "$sort" : {
                  "order_number": 1,
                  "TotalCmdIds":1
              }
        }
      ])
      let tab2 = [];
      TotalCmdId.forEach((doc)=>{
        tab2.push({
          item_number : doc._id.item_number,
          order_number:doc._id.order_number,
          TotalCmdIds: doc.TotalCmdIds,
          calendar_year: doc._id.calendar_year
        })
    })
    let  qte =0;
    console.log(tab2)
    qte = tab2.length
    console.log(qte)

    res.status(200).send(tab2)
}

//Get Total des Commandes 
exports.totalCommandes = async (req,res, next) => {

  try {
     const qt = await cmd.countDocuments();
     const qte =  qt;
     res.status(200).json(qte)
     qt
  }
  catch(error) {
       res.status(500).json(error)
  }
}
//Total des documents en 2022
exports.totalcmdAnnee = async (req, res, next)=> {
  try {
     
      const calcul = await cmd.countDocuments({calendar_year: {$gt: 2021}})
      const test = calcul
      res.status(200).json(test)
       test
  }
  catch(error) {
    res.status(500).json(error)
  }
}

exports.getElementById = async (req, res, next) => {
    try { 
        // let cond = `item_number:{$regex:"Z$"}`
        const item = await cmd.find({item_number:{'$regex':/^Z$/i}})
        res.status(200).json(item)
    }
    catch(error) {
        res.status(500).json(error)
    }
}