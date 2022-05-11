const stock = require ('../models/stock');
exports.findStock = async (req, res, next)=> {
    // const page =parseInt( req.query.page);
    // const limit =parseInt( req.query.limit);
    // const startIndex = (page - 1) * limit;
    // const endIndex = page  * limit;
   
    try {
        const stocks = await stock.find()
        // const results = {};
        // if(endIndex < stocks.length) {
        //     results.next = {
        //         page: page +1,
        //         limit: limit
        //     }
        // }
        
        // if(startIndex > 0) {
        //     results.previous = {
        //         page: page - 1,
        //         limit: limit
        //     }
        // }
        // results.results = stocks.slice(startIndex, endIndex);
        res.status(200).json(stocks)
    }
    catch(error ){
       res.status(500).send({message : error.message ||"Some error while retrieving stock data"})
    }
}
// //CountTotalsItemsInStock :
// exports.countTotalItems = async(req,res,next)=> {
//   try {
//       const items = await stock.distinct("item_number")
//        let qte = 0;
//        let tab = [];
//        items.forEach((el)=>{tab.push({el})})
//        qte = tab.length
//       res.status(200).send({qte})
//   }
//   catch(error) {
//     res.status(500).send({message : error.message ||"Some error while retrieving the stock quantity"})

//   }
// }
//CountItemPlusFréquent
exports.countFrequent = async(req,res,next)=> {
    try{
       const secu = 1;
       const items = await stock.aggregate([
           {"$project": 
                      {
                         "item_number": "$item_number",
                         "item_name": '$item_name',
                         "on_hand_balance": "$on_hand_balance",
                         "Status_Produit" :{
                            "$cond" : {
                                if: {
                                    "$lt" : ["$on_hand_balance", secu]
                                },
                                then : "Produit en rupture de stock",
                                else : "Produit Disponible"
                            }
                         }
                      }

            },
            {
                    "$group": {
                        "_id": {
                            'item_number': "$item_number",
                            "Status_Produit":"$Status_Produit",
                            "on_hand_balance": "$on_hand_balance",
                            "item_name": "$item_name"
                        },
                        "TotalStock": {
                            "$sum": 1
                        }
                    }
            },
            {
                $sort : {
                item_number: 1,
                Status_Produit: 1
                }
            }
       ])
    //    console.log(qts);
       let tab = []
       items.forEach((doc)=>{
           tab.push({
            item_number: doc._id.item_number,
            item_name: doc._id.item_name,
            Status_Produit: doc._id.Status_Produit,
            on_hand_balance: doc._id.on_hand_balance
           })
       })
       let t = [];
       t = tab.sort((a,b)=>(a.item_number>b.item_number))
       res.send(t)
    //    res.status(200).json(item)
    }
    catch(error) {
    res.status(500).json(error)
        
    }
}

//ItemMoinsFrequent
//Get Total des Produuits 
exports.totalStock = async (req,res, next) => {
    try {
       const qt = await stock.countDocuments();
       const qte =  qt;
       res.status(200).json(qte)
       qt
    }
    catch(error) {
         res.status(500).json(err)
    }
  }

  exports.stockEmpty = async (req,res,next) => {
      try{
        const hors_st = await stock.countDocuments({on_hand_balance: {$lt: 1}});
        const s_hors_st = hors_st
        res.status(200).json(s_hors_st)
        s_hors_st
      }
      catch(error) {
          res.status(500).json(error)
      }
  }
  exports.stockLoaded = async (req, res, next)=> {
      try {
        const load= await stock.countDocuments({on_hand_balance: {$gt: 100}});
        const load_d = load;
        res.status(200).json(load_d)
        load_d
      }
      catch(error) {
           res.status(500).json(error)
      }
  }
