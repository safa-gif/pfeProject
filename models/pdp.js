const mongoose = require ('mongoose');
const Schema = mongoose.Schema
const pdpSchema =new Schema( {
    Item_number :
    {
     type : String,
        },
    Stock : {
        type: Number
    },
    Backlog : {
        type: Number
    },
    Order_book : {
        type: Number
    },
    RAP : {
        type: Number
    },
    Somme_planifie : {
        type: Number
    },
    Planning: {
        type:String
    },
    S013 : {
            type: Number
    },
    S014 : {
        type: Number
     },   
      S015 : {
    type: Number
      },
    S016 : {
    type: Number
     },
     S017 : {
         type:Number
     },
     S018 : {
         type:Number
     }
     ,
     S019 : {
         type:Number
     }
     ,
     S020 : {
         type:Number
     },
     S021 : {
         type:Number
     },
     S022 : {
         type:Number
     }
     ,
     S023 : {
         type:Number
     }
     ,
     S024 : {
         type:Number
     },
     S025 : {
         type:Number
     },
     S026 : {
         type:Number
     }
     ,
     S027 : {
         type:Number
     }
     ,
     S028: {
         type:Number
     },
     S029: {
         type:Number
     },
     S030 : {
         type:Number
     }
     ,
     S031 : {
         type:Number
     }
     ,
     S032 : {
         type:Number
     }
     ,
     S033 : {
         type:Number
     }
     ,
     S034 : {
         type:Number
     },
     S035 : {
         type:Number
     },
     S036 : {
         type:Number
     },
     S037 : {
         type:Number
     },
     S038 : {
         type:Number
     },
     S039 : {
         type:Number
     },
     S040 : {
         type:Number
     },
     S041 : {
         type:Number
     },
     S042 : {
         type:Number
     },
     S043 : {
         type:Number
     },
     S044 : {
         type:Number
     },
     S045 : {
         type:Number
     },
     S046 : {
         type:Number
     },
     S047 : {
         type:Number
     },
     S049 : {
         type:Number
     },
     S050: {
         type:Number
     },
     S051 : {
         type:Number
     },
     S052 : {
         type:Number
     } 
})
const PDP = mongoose.model('pdp', pdpSchema);
module.exports = PDP;