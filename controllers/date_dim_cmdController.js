const dim = require('../models/dim_stock_date_cmd');


//get all dimension
exports.retrieve = async (req, res, next) => {
      try {
          const all = await dim.find()
          res.send(all)
      }
      catch(erro){
        res.status(500).json({message: erro});
      }
}
exports.retards =async (req, res, next) => {
  const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7)) - 2;
      try{
         const data= await dim.aggregate([
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
              "week" : "$week",
              "week_prod": "$week_prod",
               "planning_date": "$planning_date",
              "on_hand_balance" : "$on_hand_balance",
              "calendar_year":"$calendar_year",
              "item_number": "$item_number",
              "month": "$month",
              "planning_date":"$planning_date",
              "StatusCommande": {
                "$cond" : {
                    if:
                    {
                        "$lt": [ "$week", out]
                    },
                    then : "Retard",
                    else : "A temps"
                }

            }
             }
          },
          {

            "$group" : {
              "_id": {
                week: "$week", 
                on_hand_balance: "$on_hand_balance",
                planning_date: "$planning_date",
                item_number : "$item_number",
                calendar_year:"$calendar_year",
                month: "$month",
                week_prod: "$week_prod",
               StatusCommande: "$StatusCommande",
              },
              "BesoinBrut": {
                "$sum" : 1
              }
            }
          },
          {
            $sort : {
            item_number: 1,
            StatusCommande: 1
            }
        }
         ])
         let table =  [];
         data.forEach((el)=> {
           table.push({
            week: el._id.week,
            month:el._id.month,
            item_number: el._id.item_number,
            BesoinBrut : el.BesoinBrut,
            StatusCommande: el._id.StatusCommande,
            BesoinNet: el._id.on_hand_balance - el.BesoinBrut,
            calendar_year: el._id.calendar_year,
            planning_date: el._id.planning_date,
            week_prod: el._id.week_prod
           })
         })
         let t = [];
         t = table.sort((a,b)=>(a.item_number>b.item_number))
         res.send(t)
      }
      catch(error){
          res.status(500).json({message: error.message})
      }
}

exports.RetardsSemaine = async (req, res) => {
  const date = new Date();
    var oneJ = new Date(date.getFullYear(),0,1);
    var numDay = Math.floor((date - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((date.getDay()+1+numDay/7)) - 2;
    console.log(out)
  try{
    const rate = await dim.countDocuments({week: {"$lt": out}});
    const r = rate
    res.send(200).json(r)
    r
  }
  catch(error) {
     res.status(500).json(error)
  }
}
exports.ReatrdsAnnee = async (req, res) => {

}