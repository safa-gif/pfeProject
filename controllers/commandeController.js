const cmd = require('../models/commande');
//GetAllCommandesWIthPaginator
exports.retrieve = async (req, res)=> {
    const page =parseInt( req.query.page);
    const limit =parseInt( req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page  * limit;
    try {
   const infos = await cmd.find();
        const results = {};
        if(endIndex < infos.length) {
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
        results.results = infos.slice(startIndex, endIndex);
       res.status(200).json(results);
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
            "customer_name": "$customer_name"
          }
        },
        {
            "$group": {
                "_id": {
                    "order_number": "$order_number",
                    "item_number": "$item_number",
                    // "calendar_year": "$calendar_year",
                    
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
//getTotalCommandesByCustomer 

//getCommandById
 exports.getElmentById = async (req, res, next) => {
//    var x = req.params.item_number;
//    var condition = `{ item_number: {$regex: new RegExp(${item_number}), $options: "i" }`
//    var ab = `${item_number}`;

// //forcer une expression
//     try {
//         const test = await cmd.findById(item_number);
//         res.status(200).json(test);
//     } catch(error) {
//         res.status(404).json({ message: error.message});
//     }
        var id = req.params.id
try {
    const cmds = await cmd.findById(id);
  
    res.status(200).json(cmds);
  } catch (err) {
    res.status(404).json(err);
  }

}

// exports.getSingle = async (req,res) => {
//     try {
//       const cmds = await cmd.findById(req.params.item_number);
//       res.status(200).json(cmds);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }