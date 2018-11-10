var mongoose = require('./MongoDB.js'),
    Schema = mongoose.Schema;

var RouteSchema = new Schema({
    SPortName: {type:String},
    SPortLat: {type:Number},
    SPortLont: {type:Number},
    DesPortName: {type:String},
    DesPortLat:{type: Number},
    DesPortLont:{type: Number},
    Count: {type: Number},
},{ collection: "routes"});

module.exports =  mongoose.model('Route',RouteSchema);
