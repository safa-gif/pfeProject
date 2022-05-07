const stock = require ('../models/stock');
exports.findStock = async (req, res, next)=> {
    const page =parseInt( req.query.page);
    const limit =parseInt( req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page  * limit;
   
    try {
        const stocks = await stock.find()
        const results = {};
        if(endIndex < stocks.length) {
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
        results.results = stocks.slice(startIndex, endIndex);
        res.status(200).json(results)
    }
    catch(error ){
       res.status(500).send({message : error.message ||"Some error while retrieving stock data"})
    }
}
//CountTotalsItemsInStock :
exports.countTotalItems = async(req,res,next)=> {
  try {
      const items = await stock.distinct("item_number")
       let qte = 0;
       let tab = [];
       items.forEach((el)=>{tab.push({el})})
       qte = tab.length
      res.status(200).send({qte})
  }
  catch(error) {
    res.status(500).send({message : error.message ||"Some error while retrieving the stock quantity"})

  }
}
//CountItemPlusFréquent
exports.countFrequent = async(req,res,next)=> {
    try{
       const item = await stock.find({}).select("item_number")
       const qts = await stock.find({}).select("on_hand_balance").gte(upperlimit)
       const items = await stock.aggregate([
           {"$project": 
                      {
                         "item_number": "$item_number",
                         "item_name": '$item_name',
                         "on_hand_balance": "$on_hand_balance"
                      }

            },
            {
                    "$group": {
                        "_id": {
                            'item_number': "$item_number"
                        },
                        "TotalStock": {
                            "$sum": 1
                        }
                    }
            }
       ])
       console.log(qts);
       res.status(200).json(item)
    }
    catch(error) {
    res.status(500).send({message : error.message ||"Some error while retrieving frequent item in stock"})
        
    }
}

//ItemMoinsFrequent
