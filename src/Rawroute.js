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
},{ collection: "Rawroutes"});

module.exports =  mongoose.model('Rawroute',RoutedataSchema);
