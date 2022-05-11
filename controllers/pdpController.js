const pdp = require('../models/pdp');
//get all PDP
exports.getAll = async (req, res,next )=> {

    try{
      const results = await pdp.find().limit(10)
      res.status(200).json(results)
    }
    catch(error){
     res.status(500).json(error)
    }
}
//get PDP by item_number
exports.getElement = async (req, res, next)=> {
 try{
    var item_number = req.params.item_number;
    
 }
 catch(error){
   res.status(500).json(error)
 }
}