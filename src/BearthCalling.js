var mongoose = require('./MongoDB.js'),
    Schema = mongoose.Schema;

var BearthSchema = new Schema({
    CallingID: {type:Date},
    IMOShipNoLRNO: {type:Number},
    ShipName: {type:String},
    ShipTypeGroup: {type:String},
    ShipTypeLevel5: {type:String},
    StatCode5:{type:String},
    Latitude: {type:Number},
    Longitude: {type:Number},
    ArrivalDate: {type:Date},
    ArrivalDraught: {type:Number},
    DepartureDate: {type:Date},//{type:String},
    DeadWeight: {type:Number},
    GrossTonnage: {type:Number},
    MaximumDraught: {type:Number},
    TEU: {type:Number},
    MMSI: {type:Number},
    Country: {type:String},
    CountryCode: {type:String},
    BerthID: {type:Number},
    BerthName: {type:Number},
    BerthType: {type:String},
    FacilityType: {type:String},
    PortID: {type:Number},
    PortName: {type:String},
    TerminalID: {type:Number},
    TerminalName: {type:String}
},{ collection: "bearths"});

module.exports =  mongoose.model('Bearth',BearthSchema);
