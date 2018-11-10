var mongoose = require('./MongoDB.js'),
    Schema = mongoose.Schema;

var RoutedataSchema = new Schema({
    SPortName: {type:String},
    SPortLat: {type:Number},
    SPortLont: {type:Number},
    DesPortName: {type:String},
    DesPortLat:{type: Number},
    DesPortLont:{type: Number},
    Count: {type: Number},
},{ collection: "routedatas"});

module.exports =  mongoose.model('Routedata',RoutedataSchema);
