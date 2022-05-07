const pdp = require('../models/pdp');
//get all PDP
exports.getAll = async (req, res,next )=> {

    try{
      const results = await pdp.find();
      res.status(200).json(results)
    }
    catch(error){
     res.status(500).json(error)
    }
}
//get PDP by id
// exports.getElement = async (req, res, next)=> {

// }