const cmd = require('../models/commande');

exports.retrieve = async (req, res, next)=> {
    cmd.find()
    .then(data=> {
        res.send(data)
    })
    .catch(error=>{
        res.status(500).send({message : error.message || "Error retrieving dta baed on condition"})
    })
}
exports.cmdparDate = async (req, res, next) => {
    const item= req.params.item_number;
    const pr =  cmd.aggregate([
        { 
            "$match" : {
                'item_number': item
            }
        },
         {
            '$match': {
                  'planning_date': {
                    "$exists": true
                  }
                }
         },
         {
              "$lookup" : {
                    from : "stocks",
                    localField : "item_number",
                    foreignField : "on_handbalance",
                    as: "quantite"
              }
         } ,
         {
            $unwind: {path : "$quantite"}
          },
               
        ,{
         "$project" : {
         'planning_date' : "$planning_date",
          'customer_name' : "$customer_name",
          'item_number' : "$item_number",
          'calendar_year' : "$calendar_year"
        //   annee : {
        //       $year : {
        //           $lt : [
        //               "$year" , 2021
        //           ]
        //       },
        //   },
          
       }
    },
    {

        "$group" : {
              "_id" : 
              { 
                  planning_date: "$planning_date",
              },
              "TotalCommandes" : 
              {
                  "$sum": 1
              },
        }
    },
    {
        $sort : {
            'planning_date' : 1
        }
    }
    ])
    var cursor  = cmd.aggregate(pr)
    cursor.forEach((doc) => {
     console.log(doc)
    })
    await cursor.toArray((error, resultat) => {
        if(error) {
            return res.status(500).send(error);
        }
        cursor.forEach(doc => {
            res.send(doc)
          })

    })
//     tab=[] ;
//     pr.forEach((x)=> {
//     tab.push( { 
//         item_number : x._id.item_number,
//         planning_date: x._id.planning_date,
//         TotalCommandes: x.TotalCommandes,
       
//     })
//    })
//     res.send(tab)
}

exports.getElmentById = async (req, res, next) => {
   var x = req.params.item;
//    var condition = { item_number: { $regex: new RegExp(item), $options: "i" }
    try {
        const test = await cmd.findById(condtion);
        res.status(200).json(test);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }

}