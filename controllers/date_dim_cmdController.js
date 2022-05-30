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
exports.retards = async (req, res, next) => {

  const dates = new Date();
  var oneJ = new Date(dates.getFullYear(),0,1);
  var numDay = Math.floor((dates - oneJ)/ (24*60*60*1000));
  const out = Math.ceil((dates.getDay()+1+numDay/7)) - 6

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
              "order_number":"$order_number",
              "planning_date":"$planning_date",
              "item_name":"$item_name",
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
               order_number: "$order_number",
               item_name: "$item_name"
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
           
            item_number: el._id.item_number,
            item_name: el._id.item_name,
            calendar_year: el._id.calendar_year,
            planning_date: el._id.planning_date,
            week: el._id.week,
            week_prod: el._id.week_prod,
            month:el._id.month,
            StatusCommande: el._id.StatusCommande,
            BesoinBrut : el.BesoinBrut,
            BesoinNet: el._id.on_hand_balance - el.BesoinBrut,
            order_number:el._id.order_number
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
  const dates = new Date();
    var oneJ = new Date(dates.getFullYear(),0,1);
    var numDay = Math.floor((dates - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((dates.getDay()+1+numDay/7)) - 6
    // console.log(out)
  try{
    const rate = await dim.countDocuments({week: {"$lt": out}});
    const r = rate
    res.status(200).json(r)
    r
  }
  catch(error) {
     res.status(500).json(error)
  }
}
exports.RetardsAnnee = async (req, res) => {
 try {
   const  rateA = await dim.countDocuments({calendar_year: {"$lt": 2022}})
   const ra = rateA;
   res.status(200).json(ra)
   ra
 }
 catch(error) {
   res.status(500).json(error)
 }
}
//
exports.RetardsMois = async (req, res) => {
  const month = ["janvier","février","mars","avril","mai","juin","juilliet","aout","september","october","november","décember"];

const d = new Date();
let name = month[d.getMonth()];
// console.log(name)
  try {
    const rp = await dim.countDocuments({mois: {"$neq" : "name"} }, {calendar_year: {"$lt": 2022}})
    const rpe = rp
    res.status(200).json(rpe)
  }
  catch(error){
      res.status(500).json(error)
  }
}
exports.late = async(req,res,next) => {
 try {
   const la = await dim.aggregate([
     {
       "$project" : {
           
          calendar_year: "$calendar_year",
          month: "$month"
       }
     },
     {
       "$group" : {
         "_id":
         {
          calendar_year: "$calendar_year",
          month: "$month"
         },
         "Besoin": {
           "$sum" : 1
         }

       }
     },
     {
        "$sort": {
          month:1,
          calendar_year:1,
          Besoin:1
        }
     }
   ])
   let s = []
    la.forEach((x)=> {
      s.push({
        calendar_year:x._id.calendar_year,
        month: x._id.month,
        Besoin:x.Besoin
      })
    })
    let t = [];
         t = s.sort((a,b)=>(a.month>b.month))
        //  const d = s.filter((elem)=> {
        //    return elem._id.calendar_year == year & elem._id.month == month
        //  })
         res.send(t)
 }
 catch(error) {
   res.status(500).json(error)
 }
}

// exports.chart = async(req,res,next) => {
//   try {
//     const la = await dim.aggregate([
//       {
//         "$project" : {
            
//            month: "month",
//            calendar_year:"$calendar_year",
//            week: "$week",  item_number: "$item_number",
//         }
//       },
//       {
//         "$group" : {
//           "_id":
//           {
 
//            item_number: "$item_number",
//            week: "$week",
//            month: "month",
//            calendar_year:"$calendar_year",
//            week: "$week",
//           },
//           "BesoinCode": {
//             "$sum" : 1
//           }
 
//         }
//       },
//       {
//          "$sort": {
//            item_number: 1,
//            BesoinCode:1
//          }
//       }
//     ])
//     let s = []
//      la.forEach((x)=> {
//        s.push({
//          item_number:x._id.item_number,
//          week:x._id.week,
//          BesoinCode:x.BesoinCode,
//          month:x._id.month,
//          calendar_year:x._id.calendar_year
//        })
//      })
//      let t = [];
//           t = s.sort((a,b)=>(a.item_number>b.item_number))
//           res.send(t)
//           console.log(t)
//   }
//   catch(error) {
//     res.status(500).json(error)
//   }
//  }
exports.latepie = async (req, res,next) => {
  const dates = new Date();
    var oneJ = new Date(dates.getFullYear(),0,1);
    var numDay = Math.floor((dates - oneJ)/ (24*60*60*1000));
    const out = Math.ceil((dates.getDay()+1+numDay/7)) - 6
    // console.log(out)
   try {
      const pie = await dim.aggregate([
        {"$project": {
           "week": "$week",
            // "item_number":"$item_number",
            "StatusCommande": {
              "$cond" : {
                  if:
                  {
                      "$lt": [ "$week", out]
                  },
                  then : "Retard",
                  else : "Temps"
              }
          }
        }
      },
      {
        "$group" : {
          "_id":
          {
 
          //  week: "$week",
           StatusCommande : "$StatusCommande",
          },
          "BesoinStatus": {
            "$sum" : 1
          }
 
        }
      },
     {
        "$sort": {
        //  week:1,
          StatusCommande:1,
          BesoinStatus:1
        }
     }
      ])
      let tab = []
      pie.forEach((s)=> {
        tab.push({
          StatusCommande: s._id.StatusCommande,
          BesoinStatus:s.BesoinStatus
        })
      })
      let t = [];
          t = tab.sort((a,b)=>(a.StatusCommande>b.StatusCommande))
          res.send(t)

   }
   catch(error)  {
    res.status(500).json(error)
   }
} 