
const mongoose = require('mongoose');
const Event = require ('../models/event');

/* Fetch all events */
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();

        res.status(200).json(events);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
/*Fetch Event By Id */
exports.findEvent = async (req, res, next)=>{
     Event.findById(req.params.id)
     .then((data)=>{
         if(!data){
           return res.status(404).send({
            message: "Event not found with id " + req.params.id,
           })   
         }
         res.send(data);
     })
     .catch((err)=>{
         if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Event not found with id" + req.params.id,
         });
     }
     return res.status(500).send({
        message: "Error retrieving Event with id" + req.params.id,
      });
    });
};
/* Create new event */
exports.createEvent = async (req, res) => {
    const { title, date } = req.body;

    const newEvent = new Event({ title, date })

    try {
        await newEvent.save();
        res.status(201).json(
            {
                type: "success",
                message: "Event has been added successfully"
            }
        );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/* Delete singile event */
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No event with id: ${id}`);

    await Event.findByIdAndRemove(id);

    res.json({ message: "Event deleted successfully." });
}
exports.modifyEvent = async (req, res, next)=> {
    Event.findByIdAndUpdate(
        req.params.id,
        {
          title : req.body.title,
          date: req.body.date
        },
        { new: true }
      )
        .then((data) => {
          if (!data) {
            return res.status(404).send({
              message: "Message not found with id " + req.params.id,
            });
          }
          res.send(data);
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Message not found with id " + req.params.id,
            });
          }
          return res.status(500).send({
            message: "Error updating message with id " + req.params.id,
          });
        });
}
  //Get Total des Events

exports.totalEvents = async (req,res,next)=> {
  try {
     const qt = await Event.countDocuments();
     const qte =  qt;
     res.status(200).json(qte)
     qt
  }
  catch(error) {
       res.status(500).json(err)
  }

}