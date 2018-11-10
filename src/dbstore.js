var Ship = require("./AisSchema.js");
var Port = require("./PortSchema.js");
var Route = require("./RouteSchema.js");
var Bearth = require("./BearthCalling.js");
var Routedata = require("./routedataSchema.js");
var Rawroute = require("./Rawroute.js");


module.exports = {
    /**
     * 插入
     */
    async dbinsert(content) {
        var ship = new Ship({
            "AISVersion": content.AISVersion,
            "AgeMinutes": content.AgeMinutes,
            "BandFlag": content.BandFlag,
            "Callsign": content.Callsign,
            "DTE": content.DTE,
            "Destination": content.Destination,
            "Draught": content.Draught,
            "ETA": content.ETA,
            "ExtraInfo": content.ExtraInfo,
            "Heading": content.Heading,
            "IMO": content.IMO,
            "Lat": content.Lat,
            "Length": content.Length,
            "LengthBow": content.LengthBow,
            "LengthStern": content.LengthStern,
            "Lon": content.Lon,
            "MMSI": content.MMSI,
            "MessageTimestamp": content.MessageTimestamp,
            "Name": content.Name,
            "PositionAccuracy": content.PositionAccuracy,
            "PositionFixType": content.PositionFixType,
            "RAIMFlag": content.RAIMFlag,
            "RadioStatus": content.RadioStatus,
            "ReceivedDate": content.ReceivedDate,
            "Regional": content.Regional,
            "Regional2": content.Regional2,
            "RepeatIndicator": content.RepeatIndicator,
            "RoT": content.RoT,
            "SoG": content.SoG,
            "Spare": content.Spare,
            "Spare2": content.Spare2,
            "Status": content.Status,
            "TimestampUTC": content.TimestampUTC,
            "VesselType": content.VesselType,
            "Width": content.Width,
            "WidthPort": content.WidthPort,
            "WidthStarboard": content.WidthStarboard
        });
        ship.save(function (err, res) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log("Store Success :" + res);
            }
        });
    },
    /**
     * 更新
     */
    async dbupdate() {
        var wherestr = {'username': 'Tracy McGrady'};
        var updatestr = {'userpwd': 'zzzz'};

        Ship.update(wherestr, updatestr, function (err, res) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                console.log("Res:" + res);
            }
        })
    },
    /**
     * 按条件查询
     */
    async getByConditions(id) {
        var wherestr = {'PortID': id};
        var test;
        Port.find(wherestr, function (err, res) {

            if (err) {
                console.log("Find Failed:" + err);
            }
            else {
                test = JSON.stringify(res);//这是个坑  以后记得获取json对象属性值要这么写
                test = test.replace("[", "");
                test = test.replace("]", "");//去掉[] 否则就是json字符串数组 转换出来的就是json对象数组  取值的时候要加下标 如 test[0][key]
                test = JSON.parse(test);
                var key = "LatitudeDecimal";
                //console.log("Find Successfully:" + test[key]);
            }
        })
    },
    /**
     * 获取航线数据
     */
    async analyseRoutes() {

        Bearth.find({}, function (err, res) {
            if (err) {
                console.log("Find Failed:" + err);
            }
            else {
                /*var str = {'PortID':25261,'TerminalID':46525};
                Bearth.count(str,function (err,res) {
                    console.log("Number : "+ res);
                });*/
                var route, SName, TerIDName, SLat, TLat, SLont, TLont, routes, IMO, temp, tempname;
                for (var i = 0; i < res.length; i++) {
                    //console.log("Order"+ i);
                    route = JSON.stringify(res[i]);
                    route = JSON.parse(route);
                    IMO = route.IMOShipNoLRNO;
                    //console.log("--"+TerID);
                    var str = {'IMOShipNoLRNO': IMO};
                    Bearth.find(str, function (err, res) {
                        //console.log("Num"+res.length);
                        for (var i = 0; i < res.length; i++) {
                            temp = JSON.stringify(res[i]);
                            temp = JSON.parse(temp);
                            if (i === 0) {
                                SLat = temp.Latitude.toFixed(1);
                                SLont = temp.Longitude.toFixed(1);
                                SName = temp.PortName;
                                continue;
                            }
                            else {
                                tempname = temp.PortName;
                                if (tempname !== SName) {
                                    TerIDName = tempname;
                                    TLat = temp.Latitude.toFixed(1);
                                    TLont = temp.Longitude.toFixed(1);
                                    var routes = new Route({
                                        SPortName: SName,
                                        SPortLat: SLat,
                                        SPortLont: SLont,
                                        DesPortName: TerIDName,
                                        DesPortLat: TLat,
                                        DesPortLont: TLont,
                                        Count: 1,
                                    });
                                    routes.save(function (err, res) {
                                        //console.log("Save Successfully"+res);
                                    });
                                    SLat = TLat;
                                    SLont = TLont;
                                    SName = TerIDName;
                                }
                            }
                        }
                        var mes ={'IMOShipNoLRNO' : IMO};
                        Bearth.deleteMany(mes,function (err,res) {
                            //console.log("remove"+res);
                        })
                    });//bearth.find
                    //var SLat,TLat,SLont,TLont,routes;//出发港口 目的港口的纬度和经度
                }
            }
        })
    },
    async getRoutes() {
        //console.log("get Routes");
       return Routedata.find({},function (err,res) {
           //console.log("test"+res);
           let responseJson = {
               features: res,
           };
           return  responseJson ;
       } )
    },
    async getPorts() {
        return Port.find({},function (err,res) {
            let responseJson = {
                features: res,
            };
             //responseJson = JSON.stringify(responseJson);//这是个坑  以后记得获取json对象属性值要这么写
            //console.log( responseJson + 'over');
            return  responseJson;
        } )
    },
     getShips() {
         return Ship.find({}).limit(10000);//这里不能用exec()，因为用了exec会阻塞进程，导致返回的内容无法被start收到
    },
    async countRoutes() {
        Routedata.find({},function(err,res) {
            if(res.length == 0) {
                Route.aggregate([{
                    $group: {
                        _id: {
                            SPortName: "$SPortName",
                            SPortLat: "$SPortLat",
                            SPortLont: "$SPortLont",
                            DesPortName: "$DesPortName",
                            DesPortLat: "$DesPortLat",
                            DesPortLont: "$DesPortLont"
                        }, count: {$sum: 1}
                    }
                }]).exec(function (err, res) {
                    let SName, SLat, SLon, TerIDName, TLon, TLat, num, mytemp;
                    for (var i = 0; i < res.length; i++) {
                        mytemp = JSON.stringify(res[i]);
                        mytemp = JSON.parse(mytemp);
                        //console.log("iii:"+temp._id.SPortName);
                        SLat = mytemp._id.SPortLat;
                        SLon = mytemp._id.SPortLont;
                        SName = mytemp._id.SPortName;
                        TLat = mytemp._id.DesPortLat;
                        TLon = mytemp._id.DesPortLont;
                        TerIDName = mytemp._id.DesPortName;
                        num = mytemp.count;
                        var myroutes = new Routedata({
                            SPortName: SName,
                            SPortLat: SLat,
                            SPortLont: SLon,
                            DesPortName: TerIDName,
                            DesPortLat: TLat,
                            DesPortLont: TLon,
                            Count: num,
                        });
                        //console.log(SName+" to "+TerIDName);
                        myroutes.save(function (err, res) {
                            //console.log("Save Successfully" + res);
                        });
                    }
                })
            }
            });
           },
    };
