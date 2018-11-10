var mongoose = require('./MongoDB.js'),
    Schema = mongoose.Schema;

var AisSchema = new Schema({
    AISVersion: {type:Number},
    AgeMinutes: {type:Number},
    BandFlag: {type:Number},
    Callsign: {type:String},
    DTE: {type:Number},
    Destination: {type:String},
    Draught: {type:Number},
    ETA: //{type:String},//
     {type:Date},
    ExtraInfo: {type:String},
    Heading: {type:Number},
    IMO: {type:Number},
    Lat: {type:Number},
    Length: {type:Number},
    LengthBow: {type:Number},
    LengthStern: {type:Number},
    Lon: {type:Number},
    MMSI: {type:Number},
    MessageTimestamp: //{type:String},//
     {type:Date},
    Name: {type:String},
    PositionAccuracy: {type:Number},
    PositionFixType:{type:Number},
    RAIMFlag: {type:Number},
    RadioStatus: {type:Number},
    ReceivedDate: {type:Date},//{type:String},
    Regional: {type:Number},
    Regional2: {type:Number},
    RepeatIndicator: {type:Number},
    RoT: {type:Number},
    SoG: {type:Number},
    Spare: {type:Number},
    Spare2: {type:Number},
    Status: {type:String},
    TimestampUTC: {type:Number},
    VesselType: {type:String},
    Width: {type:Number},
    WidthPort: {type:Number},
    WidthStarboard: {type:Number}
},{ collection: "ships"});

module.exports =  mongoose.model('Ship',AisSchema);
