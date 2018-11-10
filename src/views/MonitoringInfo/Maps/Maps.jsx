import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import imgPort from '../../../assets/img/port.svg'
import imgShip from '../../../assets/img/ship.svg'
import imgRep from '../../../assets/img/rep.svg'
import ol from 'openlayers';
import 'openlayers/css/ol.css';
import './Mapsnew.css';
import {userService} from '_services';

var smooth = require('chaikin-smooth');


/*import Popup from 'ol-popup';
import 'ol-popup/src/ol-popup.css'*/
/*var ol = require('openlayers');
var React = require('react');*/

let changed=false;//画面分辨率十字星和船型分布的标志 8->9 true  9->8 false
let JsonShip,start,end;
let ShipFeatures;
let RouteFeatures;

let geojsonObjectRoute = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:3857'
        }
    },
    'features': [
    ]
};
let geojsonObjectPort = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:3857'
        }
    },
    'features': [{
        'type': 'Feature',
        'properties':{'kind':'port','name':'上海','amountOfShips':'578','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13590350.76,3670964.78]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'连云港','amountOfShips':'345','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13306157.883883,4127905.275513]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'日照','amountOfShips':'376','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13307457.313364,4211680.258513]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'青岛','amountOfShips':'424','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13401207.328556,4307990.914153]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'仁川','amountOfShips':'512','country':'韩国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [14072974.151640,4498471.988639]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'鹿儿岛','amountOfShips':'219','country':'日本'},
        'geometry': {
            'type': 'Point',
            'coordinates': [14514474.427016,3717897.055791]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'舟山','amountOfShips':'436','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13630862.380039,3492254.948293]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'福州','amountOfShips':'129','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13330617.732935,2986547.569158]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'台北','amountOfShips':'425','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13528742.510250,2880147.225785]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'深圳','amountOfShips':'253','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [12700165.123639,2541989.812652]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'海口','amountOfShips':'123','country':'中国'},
        'geometry': {
            'type': 'Point',
            'coordinates': [12288628.163351,2280880.924030]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'马尼拉','amountOfShips':'687','country':'菲律宾'},
        'geometry': {
            'type': 'Point',
            'coordinates': [13464535.406490,1643166.797046]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'斯里巴加湾','amountOfShips':'528','country':'文莱'},
        'geometry': {
            'type': 'Point',
            'coordinates': [12812068.933048,550346.603653]
        }
    },{
        'type': 'Feature',
        'properties':{'kind':'port','name':'东京','amountOfShips':'358','country':'日本'},
        'geometry': {
            'type': 'Point',
            'coordinates': [15549126.041884,4185691.668896]
        }
    }]
};

let geojsonObjectShip = {
    'type': 'FeatureCollection',
    'crs': {
        'type': 'name',
        'properties': {
            'name': 'EPSG:3857'
        }
    },
    'features': []
};

let listener;
//定义一个控制鼠标点击次数的变量
let helpTooltipElement;
//创建一个帮助提示信息对象
let helpTooltip;
//创建一个测量提示框对象
let measureTooltipElement;
//创建一个测量提示信息对象
let measureTooltip;
//继续绘制多边形的提示信息
let count = 0;
let sketch;
let isDrawing=false;//是否在测距指示量
let drawcir;
let myMap;
let drawpol;
let dragBox;
let drawLine;
let layerHeat,heatsource;
let vectorSourceDraw;
let vectorSourcePort;
let vectorSourceRoute,layerRoute;
let vectorSourceShip;
let  container,closer,content,overlay;
let featuresShip,ShipLength,v;
let SelectShips,SelectRoutes;//用于存储被选中区域的航船和航线features
let createMeasureTooltip=function() {
    //创建测量提示框的div
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.setAttribute('id','lengthLabel');
    //设置测量提示要素的样式
    measureTooltipElement.className = 'tooltip tooltip-measure';
    //创建一个测量提示的覆盖标注
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning:'bottom-center'
    });
    //将测量提示的覆盖标注添加到地图中
    myMap.addOverlay(measureTooltip);
};
class Map extends React.Component {
    state = {
        value: 0,
        open: false,
        stat:0,
    };
    constructor(props){

        super(props);

        this.container = null;
        this.closer = null;
        this.content = null;
        this.setContainer = element => {
            this.container = element;
        };
        this.setCloser = element => {
            this.closer = element;
        };
        this.setContent = element => {
            this.content = element;
        };
    }


    componentWillMount() {
        //this.get_Route();
        //userService.getData();
        //userService.DbInsert();
        //var id = 25170;
        //userService.Dbfindport(id)
        function makeSmooth(path, numIterations) {
            while (numIterations > 0) {
                path = smooth(path);
                numIterations--;
            }
            return path;
        }
        userService.analyseRoutes();
        userService.getShips()
            .then(
                Ships =>{
                    var format = new ol.format.GeoJSON({
                        featureProjection:"EPSG:3857"
                    });
                    for(var i=0;i < Ships.length;i++)
                    {
                        let name =  Ships[i].Name;
                        let LRI =  Ships[i].IMO;
                        let country = Ships[i].Country;
                        let lat = Ships[i].Lat;

                        let type = Ships[i].VesselType;
                        let speed = Ships[i].SPEED;
                        let MMSI = Ships[i].MMSI;
                        let rot = Ships[i].RoT;
                        let status = Ships[i].Status;
                        let depth = Ships[i].Draught;
                        let to = Ships[i].Destination;

                        let lont = Ships[i].Lon;
                        var coord = [lont,lat];
                        var lonLat = new ol.geom.Point(ol.proj.fromLonLat(coord));
                      var pointFeature = new ol.Feature({
                        MMSI:MMSI,
                        kind:'Ship',
                        name:name,
                        type:type,
                        LRIMOShipNo:LRI,
                        country:country,
                        speed:speed,
                        rotation:rot,
                        to:to,
                        status:status,
                        coor:[lont,lat],
                        from:'Unknow',
                        depth:depth,
                        geometry: lonLat,
                        weight: 1 //  temperature
                        });
                        heatsource.addFeature(pointFeature);
                        let geojson = {
                            'type': 'Feature',
                            'properties':{
                                'MMSI':MMSI,
                                'kind':'Ship',
                                'name':name,
                                'type':type,
                                'LRIMOShipNo':LRI,
                                'country':country,
                                'speed':speed,
                                'rotation':rot,
                                'to':to,
                                'status':status,
                                'coor':[lont,lat],
                                'from':'Unknow',
                                'depth':depth
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [lont,lat]
                            }
                        };
                        vectorSourceShip.addFeatures(format.readFeatures(geojson));
                    }
                }
            )
    ;
        userService.getRoutes()
            .then(
                Routes => {
                    /*var mypath = [ [30, 50], [50, 60], [70, 65] ];
                    var mycoords = makeSmooth(mypath, 20);
                    let mygeojson = {'type':'Feature','geometry':{'type':'LineString','coordinates': mycoords},'properties':{'kind':'Route','name':"mes",'from':"sname",'startTime':'2018/6/26','to':"tname",'Count':"num",'stype':'cargo'} } ;
                    var myformat = new ol.format.GeoJSON({
                        featureProjection:"EPSG:3857"
                    });
                    vectorSourceRoute.addFeatures(myformat.readFeatures(mygeojson));*/
                    for(var i=0;i < Routes.length;i++)
                    {
                       // console.log(Routes.length);
                        var start = { x: Routes[i].SPortLont, y:Routes[i].SPortLat  };
                        var end = { x: Routes[i].DesPortLont, y: Routes[i].DesPortLat };//绘制航线
                        if(start.y < end.y) {//保证start的纬度高于end  控制点的纬度靠近低纬度那个，经度则靠近高经度那个
                            var swap =start;
                            start = end;
                            end = swap;
                        }
                        var control_point_pary = Math.abs(start.y - end.y)/90;
                        var control_point_parx = Math.abs(start.x - end.x)/90;
                        var mid = {x:(start.x+end.x)/2,y:(start.y+end.y)/2};
                        var control_point;
                        if(start.y > 0 || end.y >0) {
                            if(start.x > end.x)
                            control_point = {x: start.x + 40 * control_point_pary, y: end.y + 50 * control_point_parx};
                            else
                                control_point = {x: end.x + 40 * control_point_pary, y: end.y + 50 * control_point_parx};
                        }
                        else
                            control_point = {x:mid.x-60*control_point_pary,y:mid.y-10*control_point_parx};//待考证
                        var sname = Routes[i].SPortName;
                        var tname = Routes[i].DesPortName;
                        var Slont = Routes[i].SPortLont;
                        var Slat = Routes[i].SPortLat;
                        var Deslont = Routes[i].DesPortLont;
                        var Deslat = Routes[i].DesPortLat;
                        var num = Routes[i].Count;
                        var mes = sname + " to " + tname;
                        var path = [ [start.x, start.y], [control_point.x, control_point.y], [end.x, end.y] ];
                        var coords = makeSmooth(path, 10);
                        let geojson = {'type':'Feature','geometry':{'type':'LineString','coordinates': coords},'properties':{'kind':'Route','name':mes,'from':sname,'SLont':Slont,'SLat':Slat,'startTime':'2018/6/26','to':tname,'DesLont':Deslont,'DesLat':Deslat,'Count':num,'stype':'cargo'} } ;
                        var format = new ol.format.GeoJSON({
                            featureProjection:"EPSG:3857"
                        });
                        vectorSourceRoute.addFeatures(format.readFeatures(geojson));
                    }
                }
          //  )
            );
        userService.getPorts()
            .then(
                Ports =>{
                    for(var i=0;i < Ports.length;i++)
                    {

                        let name =  Ports[i].PortName;
                        let country = Ports[i].Country;
                        let lat = Ports[i].LatitudeDecimal;
                        let lont = Ports[i].LongitudeDecimal;

                        let geojson = {
                            'type': 'Feature',
                            'properties':{'kind':'Port','name':name,'amoutofships':'358','country':country},
                            'geometry': {
                            'type': 'Point',
                                'coordinates': [lont,lat]
                        }
                        };
                        //console.log(geojson);
                        var format = new ol.format.GeoJSON({
                            featureProjection:"EPSG:3857"
                        });
                        vectorSourcePort.addFeatures(format.readFeatures(geojson));
                    }

                }
            )
    };
    /*get_Route = () => {
        userService.getRouteData()
            .then(
                Route => {

                    let str = Route.map((item, index) => { return item;});
                    str = {
                        'features': str
                    };
                    let str2 = JSON.stringify(str);
                    JsonShip = JSON.parse(str2);
                    let i;
                    let Json_len = Route.length;//搜索阈值
                    let use=[];
                    for (i = 0; i < Json_len; i++) {
                        let feature_number=0;
                        let j = i+1;
                        var tt=Json_len-1;
                        if(i===tt)
                        {
                            let a = JsonShip.features[j].Latitude;
                            a=Number(a);
                            let b = JsonShip.features[j].Longtitude;
                            b=Number(b);
                            let coordinate=[b,a];
                            let draught = JsonShip.features[j].Draught;
                            let des = JsonShip.features[j].Destination;
                            let Shipname = JsonShip.features[j].ShipName;
                            let LRno=JsonShip.features[j].LRIMOShipNo;
                            let Cur_data=JsonShip.features[j].ETA;
                            let speed=JsonShip.features[j].Speed;
                            let s_type=JsonShip.features[j].ShipType;
                            let shipstates=JsonShip.features[j].MoveStatus;
                            let temp = [b,a];
                            temp=new ol.geom.Point(ol.proj.fromLonLat(temp));
                            let AA=temp.getCoordinates();
                            use.push(AA);
                            let cop=use.slice(0);//=号实现的是浅拷贝，会使得cop的值随着use的值变化而变化
                            let jsonRoute =
                                {
                                    'type': 'Feature',
                                    'properties': {
                                        'kind': 'Route',
                                        'name': Shipname,
                                        'from': 'Unknow',
                                        'startTime': Cur_data,
                                        'to': des,
                                        'stype':s_type,
                                        'order':feature_number
                                    },
                                    'geometry': {
                                        'type': 'LineString',
                                        'coordinates': cop,
                                    }
                                };
                            vectorSourceRoute.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonRoute));
                            end = AA;
                            let dx = end[0] - start[0];
                            let dy = end[1] - start[1];
                            let rot = Math.atan2(dy, dx);

                            let jsonShip={
                                'type': 'Feature',
                                'properties': {'kind': 'ship','name':Shipname,'LRIMOShipNo': LRno,'country':'Unknow','speed':speed,'rotation':rot, 'startTime': Cur_data,'type':s_type,'status':shipstates,
                                    'coor':coordinate,
                                    'from':'Unknow','order':feature_number,'depth':draught},
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': AA
                                }
                            };
                            vectorSourceShip.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonShip));
                            feature_number++;
                            use.splice(0,use.length);
                        }
                        if (JsonShip.features[i].LRIMOShipNo === JsonShip.features[j].LRIMOShipNo) {
                            let a = JsonShip.features[i].Latitude;
                            a=Number(a);
                            let b = JsonShip.features[i].Longtitude;
                            b=Number(b);
                            let temp = [b, a];
                            temp=new ol.geom.Point(ol.proj.fromLonLat(temp));//坐标转换，从经纬度坐标转换为墨卡托坐标
                            let AA=temp.getCoordinates();//返回一个数组坐标
                            use.push(AA);
                            if(i===0)
                                start=AA;

                        }
                        else {
                            let a = JsonShip.features[j].Latitude;
                            a=Number(a);
                            let b = JsonShip.features[j].Longtitude;
                            b=Number(b);
                            let coordinate=[b,a];
                            let draught = JsonShip.features[j].Draught;
                            let des = JsonShip.features[j].Destination;
                            let Shipname = JsonShip.features[j].ShipName;
                            let LRno=JsonShip.features[j].LRIMOShipNo;
                            let Cur_data=JsonShip.features[j].ETA;
                            let speed=JsonShip.features[j].Speed;
                            let s_type=JsonShip.features[j].ShipType;
                            let shipstates=JsonShip.features[j].MoveStatus;
                            let temp = [b,a];

                            temp=new ol.geom.Point(ol.proj.fromLonLat(temp));
                            let AA=temp.getCoordinates();
                            use.push(AA);
                            let cop=use.slice(0);//=号实现的是浅拷贝，会使得cop的值随着use的值变化而变化
                            let jsonRoute =
                                {
                                    'type': 'Feature',
                                    'properties': {
                                        'kind': 'Route',
                                        'name': Shipname,
                                        'from': 'Unknow',
                                        'startTime': Cur_data,
                                        'to': des,
                                        'stype':s_type,
                                        'order':feature_number
                                    },
                                    'geometry': {
                                        'type': 'LineString',
                                        'coordinates': cop,
                                    }
                                };
                            vectorSourceRoute.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonRoute));
                            end = AA;
                            let dx = end[0] - start[0];
                            let dy = end[1] - start[1];
                            let rot = Math.atan2(dy, dx);
                            let jsonShip={
                                'type': 'Feature',
                                'properties': {'kind': 'ship','name':Shipname,'LRIMOShipNo': LRno,'country':'Unknow','speed':speed,'rotation':rot, 'startTime': Cur_data,'type':s_type,'to': des,'status':shipstates,
                                    'coor':coordinate,
                                    'from':'Unknow','order':feature_number,'depth':draught},//kind不能改
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': AA
                                }
                            };
                            vectorSourceShip.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonShip));
                            feature_number++;
                            use.splice(0,use.length);
                        }

                    }
                    ShipFeatures=vectorSourceShip.getFeatures();
                    RouteFeatures=vectorSourceRoute.getFeatures();

                },
                error => {

                }
            );

    };*/
    componentDidMount() {//该方法发生在render方法之后。在该方法中，ReactJS会使用render生成返回的虚拟DOM对象来创建真实的DOM结构

        container = this.container;
        closer = this.closer;
        content = this.content;
        var key = 'AnLpmdb7p07BIcDLjGrsuiHNcb919pex9kaxWjIOaHcb-oO5XTfb9fVrngWF_Bd7';
        let raster = new ol.layer.Tile({
            preload: Infinity,
           //source: new ol.source.OSM()//地图基础图层
            source: new ol.source.BingMaps({key: key, imagerySet: 'Aerial'})//可选值：Road、Aerial、AerialWithLabels、collinsBart、ordnanceSurvey
        });
        //

        //创建测量提示框


                        let formatLength = function (line) {
                            //定义长度变量
                            let length;
                            let wgs84Sphere = new ol.Sphere(6378137);
                            //如果大地测量复选框被勾选，则计算球面距离
                            let coordinates = line.getCoordinates();
                            //初始长度为0
                            length = 0;
                            //获取源数据的坐标系
                            let sourceProj = myMap.getView().getProjection();
                            //进行点的坐标转换
                            for (let i = 0; i < coordinates.length - 1; i++) {
                                //第一个点
                                let c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                                //第二个点
                                let c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                                //获取转换后的球面距离
                                //Returns the distance from c1 to c2 using the haversine formula.
                        length += wgs84Sphere.haversineDistance(c1,c2);

                    }
                length = Math.round(line.getLength() * 100) / 100;
                //定义输出变量
                let output;
                //如果长度大于1000，则使用km单位，否则使用m单位
                if (length > 1000) {
                    output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km'; //换算成KM单位
                } else {
                    output = (Math.round(length * 100) / 100) + ' ' + 'm'; //m为单位
                }
                return output;
        };

        let styleFunction = function (feature) {
            let type = feature.getGeometry().getType();
            let styles = null;
            if (type === 'LineString') {
                let destination = feature.get('to');
                let count = feature.get('Count');
                let kind = feature.get('stype');
                let start = [feature.get('SLont'),feature.get('SLat')];
                let end = [feature.get('TLont'),feature.get('TLat')];
                let color = null;

                if (destination) {
                   /* if (kind === 'Tanker') {
                        color = 'red';
                    } else if (kind === 'Cargo') {
                        color = 'green';
                    }
                    else if (kind === 'Passenger') {
                        color = 'yellow';
                    }
                    else if (kind === 'Tug') {
                        color = 'black';
                    }
                    else {
                        color = 'gray';
                    }*/
                    let wid;
                    if (count === 1)
                    {
                        wid = 1.5;
                        color = 'red';
                    }
                    else if(2 <= count && count < 30)
                    {
                        wid = 3;
                        color = 'green';
                    }
                    else if(30 <= count && count < 50)
                    {
                        wid = 5;
                        color = 'yellow';
                    }
                    else if(50 <= count && count <= 70)
                    {
                        wid = 7;
                        color = 'black';
                    }
                    else
                    {
                        wid = 9;
                        color = 'gray';
                    }
                    styles = [
                        new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                //lineDash: [5, 5],//实现虚线的关键
                                width: wid,
                                color: color
                            })
                        })
                    ];
                    /*let geometry = feature.getGeometry();
                    geometry.forEachSegment(function (start, end) {*/

                        let dx = end[0] - start[0];
                        let dy = end[1] - start[1];
                        let rotation = Math.atan2(dy, dx);
                        // arrows
                        styles.push(new ol.style.Style({
                            geometry: new ol.geom.Point(end),
                            image: new ol.style.Icon({
                                src: 'https://openlayers.org/en/v4.6.5/examples/data/arrow.png',
                                anchor: [0.75, 0.5],
                                rotateWithView: true,
                                rotation: -rotation,
                                scale: myMap.getView().getZoom() / 5,
                            })
                        }));
                   /* });*/
                    return styles;
                }
                if (kind === 'Tanker') {
                    color = 'red';
                } else if (kind === 'Cargo') {
                    color = 'green';
                }
                else if (kind === 'Passenger') {
                    color = 'yellow';
                }
                else if (kind === 'Tug') {
                    color = 'black';
                }
                else {
                    color = 'gray';
                }
                styles = [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            width: 2,
                            color: color
                        })
                    })
                ];
                let geometry = feature.getGeometry();
                geometry.forEachSegment(function (start, end) {
                    let dx = end[0] - start[0];
                    let dy = end[1] - start[1];
                    let rotation = Math.atan2(dy, dx);
                    // arrows
                    /*styles.push(new ol.style.Style({
                        geometry: new ol.geom.Point(end),

                        image: new ol.style.Icon({
                            src: 'https://openlayers.org/en/v4.6.5/examples/data/arrow.png',

                            anchor: [0.75, 0.5],
                            rotateWithView: true,
                            rotation: -rotation,
                            scale: myMap.getView().getZoom() / 8,

                        })
                    }));*/
                });

            } else if (type === 'Point') {
                if (feature.get('kind') === 'Port') {
                    styles = [new ol.style.Style({
                        image: new ol.style.Icon({
                            imgSize: [30, 30] ,   // 及图标大小
                           //src: 'https://www.williambuck.com/portals/0/Skins/WilliamBuck2014/images/location-icon.svg',//如何引用本地的svg
                           src: imgPort,
                            //rotation:60
                        })
                    })];
                } else if (feature.get('kind') === 'Ship') {
                    let rot=-feature.get('rotation')+165;
                    styles = [new ol.style.Style({
                        image: new ol.style.Icon({
                            src: imgShip,
                            rotation: rot
                        })
                    })];
                        // arrows
                        /*styles.push(new ol.style.Style({
                            image: new ol.style.Icon({
                                src: 'https://openlayers.org/en/v4.6.5/examples/data/arrow.png',

                                anchor: [0.75, 0.5],
                                rotateWithView: true,
                                rotation: -feature.get('rotation'),
                                scale: myMap.getView().getZoom() / 8,

                            })
                        }));*/

                }

            }
            return styles;
        };



         vectorSourcePort = new ol.source.Vector({
            //features: (new ol.format.GeoJSON()).readFeatures(this.props.geojsonObjectPort)
             features:[]
        });
        let layerPort = new ol.layer.Vector({
            source: vectorSourcePort,
            style: styleFunction
        });
         vectorSourceRoute = new ol.source.Vector({
            //features: (new ol.format.GeoJSON()).readFeatures(this.props.geojsonObjectRoute)
             features:[]
        });

         layerRoute = new ol.layer.Vector({
            source: vectorSourceRoute,
            style:styleFunction
        });

         vectorSourceShip = new ol.source.Vector({
            //features: (new ol.format.GeoJSON()).readFeatures(this.props.geojsonObjectShip)
             features:[]
        });
        let layerShip = new ol.layer.Vector({
            source: vectorSourceShip,
            style:styleFunction
        });
         vectorSourceDraw = new ol.source.Vector({
        });
        let layerDraw= new ol.layer.Vector({
            source: vectorSourceDraw
        });
        featuresShip= vectorSourceShip.getFeatures();
        ShipLength=featuresShip.length;
        layerRoute.setVisible(false);
        layerShip.setVisible(false);
//cluster


        //
         overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        closer.onclick = function () {//弹出框点击 x 时实现关闭弹出框
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
         v=new ol.View({
            center: [13590350.76, 3670964.78],
            zoom: 4
        });
         //

         heatsource = new ol.source.Vector({
             format: new ol.format.KML({
                 extractStyles: false
             })
         });

         layerHeat = new ol.layer.Heatmap({
            source: heatsource,
             opacity: 0.7,
            /*blur:10,
            radius:10,*/
        });
        //
        myMap = new ol.Map({
            interactions: new ol.interaction.defaults({
                constrainResolution: true, onFocusOnly: true
            }),
            layers: [raster, layerPort, layerRoute,layerShip,layerDraw,layerHeat],
            overlays:[overlay],
            target: 'map',
            view: v
        });

        //
            //创建一个交互式绘图对象
            drawLine = new ol.interaction.Draw({
                //绘制的数据源
                source: vectorSourceDraw,
                //绘制类型
                type: 'LineString',
                //样式
                freehand: true,
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color:'rgba(255,255,255,0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,0.5)',
                        lineDash: [10, 10],
                        width:2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color:'rgba(0,0,0,0.7)'
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255,255,255,0.2)'
                        })
                    })
                })
            });
            //将交互绘图对象添加到地图中

        //判断当前放大比例来确定用什么图形表示船只
         function checkZoom() {
             let features=vectorSourceShip.getFeatures();
             let length=features.length;
                 //console.log(myMap.getView().getZoom());
                 if (myMap.getView().getZoom() >= 8) {//数字越大地图显示范围越小
                     layerShip.setVisible(true);
                     layerHeat.setVisible(false);
                     /*if(!changed)
                         return ;
                    for(var i=0;i<length;i++)
                    {
                        let style_ship = [new ol.style.Style({
                            image: new ol.style.Icon({
                                src: imgShip,
                                rotation: features[i].get('rotation')
                            })
                        })];
                        features[i].setStyle(style_ship);
                    }
                    changed=false;*/
                     }
                          else {
                     layerHeat.setVisible(true);
                     layerShip.setVisible(false);
                     /*if(changed)
                         return ;
                     for(var i=0;i<length;i++)
                     {
                         let style_rep=[new ol.style.Style({
                             image: new ol.style.Icon({
                                 src: imgRep,
                                 rotation: features[i].get('rotation')
                             })
                         })];

                         features[i].setStyle(style_rep);
                     }
                     changed=true;*/

                 }
             }

        myMap.getView().on('change:resolution',checkZoom);//checkZoom为调用的函数

        //创建测量提示框
        createMeasureTooltip();
        //创建帮助提示框

        //定义一个事件监听


        //绘制开始事件
        drawLine.on('drawstart', function (evt) {
            //The feature being drawn.
            sketch = evt.feature;
            //提示框的坐标
            let tooltipCoord = evt.target.s;

            //监听几何要素的change事件
            //Increases the revision counter and dispatches a 'change' event.

            listener = sketch.getGeometry().on('change', function (evt) {
                //The event target.
                //获取绘制的几何对象
                let geom = evt.target;

                //定义一个输出对象，用于记录长度
                let output;
                if (geom instanceof ol.geom.LineString) {
                    //输出多线段的长度
                    output = formatLength(geom);
                    //Return the last coordinate of the geometry.
                    //获取多线段的最后一个点的坐标
                    tooltipCoord = geom.getLastCoordinate();
                }

                //设置测量提示框的内标签为最终输出结果
                measureTooltipElement.innerHTML = output;
                //设置测量提示信息的位置坐标
                measureTooltip.setPosition(tooltipCoord);

            });
        });
            //地图双击事件
        myMap.on('dblclick', function (evt) {

        });

    //
         let select = new ol.interaction.Select();
        myMap.addInteraction(select);
        myMap.addControl(new ol.control.FullScreen());
        let selectedFeatures = select.getFeatures();
        dragBox = new ol.interaction.DragBox({
        });
        let info = "";

        dragBox.on('boxend', function () {
            let extent = dragBox.getGeometry().getExtent();
            let temp = 0;
            let shipmes;
            vectorSourceRoute.forEachFeatureIntersectingExtent(extent, function(feature){
                selectedFeatures.push(feature);
            });
            SelectRoutes = selectedFeatures;
            let routes = SelectRoutes.getArray().map(function(feature) {
                let mesjson = {'RouteName':feature.get('name'),'Num':feature.get('Count')};
                return mesjson;
            });
            if (routes.length > 0) {
                for(var i =0 ;i<routes.length;i++)
                    temp = temp+routes[i].Num;
                info = temp;
            } else {
                info = 'No Routes were selected in this area!';
            }
            vectorSourceShip.forEachFeatureIntersectingExtent(extent, function(feature){
                selectedFeatures.push(feature);
            });
            SelectShips = selectedFeatures;
            let names = SelectShips.getArray().map(function(feature) {
                return feature.get('name');
            });
            if (names.length > 0) {
                shipmes = names.join(',');
            } else {
                shipmes = 'No Routes were selected in this area!';
            }
            let str="该区域当前停靠航船数量为 : "+names.length+"\n";
            let str2="该区域经过航线数量为 : "+routes.length+"\n"+"途径航线的总航船流量为 :"+info;
            alert(str+str2);
        });
        dragBox.on('boxstart', function () {
            selectedFeatures.clear();
            vectorSourceDraw.clear();
        });
//
        //
        //
        drawpol = new ol.interaction.Draw({
            source: vectorSourceDraw,
            type:"Polygon",
            freehand: true
        });

        drawpol.on('drawend', function (evt) {
            let temp = 0;
            let shipmes;
            let polygon = evt.feature.getGeometry();
            let extent = polygon.getExtent();
            vectorSourceRoute.forEachFeatureIntersectingExtent(extent, function(feature){
                selectedFeatures.push(feature);
            });
            SelectRoutes = selectedFeatures;
            let routes = SelectRoutes.getArray().map(function(feature) {
                let mesjson = {'RouteName':feature.get('name'),'Num':feature.get('Count')};
                return mesjson;
            });
            if (routes.length > 0) {
                for(var i =0 ;i<routes.length;i++)
                    temp = temp+routes[i].Num;
                info = temp;
            } else {
                info = 'No Routes were selected in this area!';
            }
            vectorSourceShip.forEachFeatureIntersectingExtent(extent, function(feature){
                selectedFeatures.push(feature);
            });
            SelectShips = selectedFeatures;
            let names = SelectShips.getArray().map(function(feature) {
                return feature.get('name');
            });
            if (names.length > 0) {
                shipmes = names.join(',');
            } else {
                shipmes = 'No Routes were selected in this area!';
            }
            let str="该区域当前停靠航船数量为 : "+names.length+"\n";
            let str2="该区域经过航线数量为 : "+routes.length+"\n"+"途径航线的总航船流量为 :"+info;
            alert(str+str2);
        });
        drawpol.on('drawstart', function () {
            selectedFeatures.clear();
            vectorSourceDraw.clear();
        });
        //
         drawcir = new ol.interaction.Draw({
            source: vectorSourceDraw,
            type:"Circle",
             freehand: true
        });
        drawcir.on('drawend', function (evt) {
            let cir = evt.feature.getGeometry();
            let extent = cir.getExtent();
            let temp = 0;
            let shipmes;
            vectorSourceRoute.forEachFeatureIntersectingExtent(extent, function(feature){
                selectedFeatures.push(feature);
            });
            SelectRoutes = selectedFeatures;
            let routes = SelectRoutes.getArray().map(function(feature) {
                let mesjson = {'RouteName':feature.get('name'),'Num':feature.get('Count')};
                return mesjson;
            });
            if (routes.length > 0) {
                for(var i =0 ;i<routes.length;i++)
                    temp = temp+routes[i].Num;
                info = temp;
            } else {
                info = 'No Routes were selected in this area!';
            }
            vectorSourceShip.forEachFeatureIntersectingExtent(extent, function(feature){
                selectedFeatures.push(feature);
            });
            SelectShips = selectedFeatures;
            let names = SelectShips.getArray().map(function(feature) {
                return feature.get('name');
            });
            if (names.length > 0) {
                shipmes = names.join(',');
            } else {
                shipmes = 'No Routes were selected in this area!';
            }
            let str="该区域当前停靠航船数量为 : "+names.length+"\n";
            let str2="该区域经过航线数量为 : "+routes.length+"\n"+"途径航线的总航船流量为 :"+info;
            alert(str+str2);
        });
        drawcir.on('drawstart', function () {
            selectedFeatures.clear();
            vectorSourceDraw.clear();
        });

        let scaleLineControl = new ol.control.ScaleLine({
            //设置度量单位为米
            units: 'metric',
            target: 'scalebar',
            className: 'ol-scale-line'
        });
        myMap.addControl(scaleLineControl);//加载地图比例尺控件

        var overviewMapControl=new ol.control.OverviewMap({
            layer:[
                new ol.layer.Tile({
                    source:new ol.source.OSM({
                        "url":"http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
                    })
                })
            ],
            collapseLabel:"\u00BB",//鹰眼展开时功能按钮上的标识
            label:"\u00AB",//鹰眼折叠时功能按钮上的标识
            collapsed:false//初始为展开显示方式
        });
        myMap.addControl(overviewMapControl);
        myMap.on('singleclick', function (evt) {
            overlay.setPosition(undefined);
            closer.blur();
                if (!isDrawing) {
                    let feature = myMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
                        return feature;
                    });
                    if (feature) {

                        if (feature.get('kind') === 'Port') {
                            let coordinates = feature.getGeometry().getCoordinates();
                            content.innerHTML = '<h5>港口信息</h5><p>港口：' + feature.get('name') + '</p><p>坐标：' + ol.proj.transform(coordinates, 'EPSG:3857', 'EPSG:4326') + '</p><p>所属国家：' + feature.get('country') + '</p><p>在港船舶：' + feature.get('amountOfShips') + '</p>';
                            overlay.setPosition(coordinates);
                        } else if (feature.get('kind') === 'Route'){
                            let coordinates = feature.getGeometry().getCoordinates()[0];
                            content.innerHTML = '<h5>航线信息</h5><p>航线名：' + feature.get('name') + '</p><p>类型：' + feature.get('stype') + '</p><p>出发港口：' + feature.get('from') + '('+feature.get('SLont')+','+feature.get('SLat')+')'+'</p><p>出发时间：' + feature.get('startTime') + '</p><p>目的港口：' + feature.get('to') + '('+feature.get('DesLont')+','+feature.get('DesLat')+')'+'</p><p>航线流量: '+ feature.get('Count') +'</p>';
                            overlay.setPosition(coordinates);
                        }
                        else if(feature.get('kind') === 'Ship')
                        {
                            let coordinates = feature.getGeometry().getCoordinates();
                            content.innerHTML = '<h5>航船信息</h5><p>船名：' + feature.get('name') + '</p><p>LRIMOShipNo：' + feature.get('LRIMOShipNo') + '</p><p>类型：' + feature.get('type') + '</p><p>国家：' + feature.get('country') + '</p><p>速度：' + feature.get('speed') + '海里/H</p><p>出发港口：' + feature.get('from') + '</p><p>出发时间：' + feature.get('startTime') + '</p><p>目的港口：' + feature.get('to') + '</p><p>当前状态：'+feature.get('status')+'</p><p>当前坐标([经度，纬度]):['+feature.get('coor')+']</p><p>吃水深度（m）: '+feature.get('depth')+'</p>';
                            overlay.setPosition(coordinates);
                        }
                    }
                }
                else {

                    //设置测量提示信息的位置坐标，用来确定鼠标点击后测量提示框的位置
                    measureTooltip.setPosition(evt.target.s);

                    //如果是第一次点击，则设置测量提示框的文本内容为起点
                    if (count === 0) {
                        measureTooltipElement.innerHTML = "起点";
                    }
                    //根据鼠标点击位置生成一个点
                    let point = new ol.geom.Point(evt.target.s);
                    //将该点要素添加到矢量数据源中
                    vectorSourceDraw.addFeature(new ol.Feature(point));
                    //更改测量提示框的样式，使测量提示框可见
                    measureTooltipElement.className = 'tooltip tooltip-static';
                    //创建测量提示框
                    createMeasureTooltip();
                    //点击次数增加
                    count++;
                }
            }
        );
        myMap.on('pointermove', function (e) {
            //let pixel = myMap.getEventPixel(e.originalEvent);
            //let hit = myMap.hasFeatureAtPixel(pixel);
            myMap.getTargetElement().style.cursor = myMap.hasFeatureAtPixel(e.pixel) ? 'pointer' : '';
        });
    }
    render(){ //渲染并返回一个虚拟DOM
        return (
            <div>
                <div id="map" style={{position:"static",margin:'0',width: '100%',height:'100%',border:'1px'}}></div>
                <div id="cont" ref={this.setContainer}  className="ol-popup">
                    <a href="#" ref={this.setCloser} className="ol-popup-closer"></a>
                    <div ref={this.setContent}></div>
                </div>
            </div>
        );
    };
}
//

//

class Container extends React.Component{//Container类继承自React.Component
    render(){
        return(
            <div>
                <Map geojsonObjectPort={geojsonObjectPort} geojsonObjectRoute={geojsonObjectRoute} geojsonObjectShip={geojsonObjectShip} id="MAP" ref="getbutton" />
            </div>
        );
    }
}
function showroute() {
   layerRoute.setVisible(true);

}
function hideroute() {
    layerRoute.setVisible(false);
}
function Drawrec() {
    myMap.removeInteraction(drawcir);
    myMap.removeInteraction(drawLine);
    myMap.removeInteraction(drawpol);
    myMap.removeInteraction(dragBox);
    myMap.addInteraction(dragBox);
}
function Drawcir() {
    myMap.removeInteraction(drawcir);
    myMap.removeInteraction(drawLine);
    myMap.removeInteraction(drawpol);
    myMap.removeInteraction(dragBox);
    myMap.addInteraction(drawcir);
}
function Drawpol() {
    myMap.removeInteraction(drawcir);
    myMap.removeInteraction(drawLine);
    myMap.removeInteraction(drawpol);
    myMap.removeInteraction(dragBox);
    myMap.addInteraction(drawpol);
}
function Drawcancel() {
    vectorSourceDraw.clear();
    myMap.removeInteraction(drawcir);
    myMap.removeInteraction(drawLine);
    myMap.removeInteraction(drawpol);
    myMap.removeInteraction(dragBox);
}
function SearchShip(name,No) {
   let i,ii,x,y,ex,coordinates;
   let find=false;
    coordinates=[13590350.76, 3670964.78];
    let Shipsorce=vectorSourceShip.getFeatures();
    ShipLength=Shipsorce.length;
    let flag;
    if(name === "" && No === "") {
        flag = 1;//flag为1代表输入条件为空
        return;
    }
    else if(name != "" && No === "")
        flag = 2;//flag为2代表输入条件中只有No为空
    else if(name === "" && No != "")
        flag = 3;//flag为3代表输入条件中只有Name为空
    else if(name != "" && No != "")
        flag = 4;//flag为3代表输入条件中只有Name为空
    if(flag === 2 || flag === 4) {
        for (i = 0, ii = ShipLength; i < ii; i++) {
            if (Shipsorce[i].get('name') === name) {
                        find = true;
                        ex = Shipsorce[i].getGeometry().getExtent();
                        x = ex[0] + (ex[2] - ex[0]) / 2;
                        y = ex[1] + (ex[3] - ex[1]) / 2;
                        coordinates = [x, y];
                        v.setCenter(coordinates);
                        content.innerHTML = '<h>查找结果: </h><p2>找到航船</p2>' + name + '<p></p><h5>航船信息</h5><p>船名：' + Shipsorce[i].get('name') + '</p><p>LRIMOShipNo：' + Shipsorce[i].get('LRIMOShipNo') + '</p><p>类型：' + Shipsorce[i].get('type') + '</p><p>国家：' + Shipsorce[i].get('country') + '</p><p>速度：' + Shipsorce[i].get('speed') + '海里/H</p>';
                        overlay.setPosition(coordinates);
                        return;
            }
            else {
                if(flag === 4) {
                    for (i = 0, ii = ShipLength; i < ii; i++) {
                        if (Shipsorce[i].get('LRIMOShipNo') === No) {
                            find = true;
                            ex = Shipsorce[i].getGeometry().getExtent();
                            x = ex[0] + (ex[2] - ex[0]) / 2;
                            y = ex[1] + (ex[3] - ex[1]) / 2;
                            coordinates = [x, y];
                            v.setCenter(coordinates);
                            content.innerHTML = '<h>查找结果: </h><p2>找到航船</p2>' + name + '<p></p><h5>航船信息</h5><p>船名：' + Shipsorce[i].get('name') + '</p><p>LRIMOShipNo：' + Shipsorce[i].get('LRIMOShipNo') + '</p><p>类型：' + Shipsorce[i].get('type') + '</p><p>国家：' + Shipsorce[i].get('country') + '</p><p>速度：' + Shipsorce[i].get('speed') + '海里/H</p>';
                            overlay.setPosition(coordinates);
                            return;
                        }
                    }
                }
                else
                find = false;
            }
        }
    }
    else if(flag === 3 || flag === 4) {
        for (i = 0, ii = ShipLength; i < ii; i++) {
                if (Shipsorce[i].get('LRIMOShipNo') === No) {
                    find = true;
                    ex = Shipsorce[i].getGeometry().getExtent();
                    x = ex[0] + (ex[2] - ex[0]) / 2;
                    y = ex[1] + (ex[3] - ex[1]) / 2;
                    coordinates = [x, y];
                    v.setCenter(coordinates);
                    content.innerHTML = '<h>查找结果: </h><p2>找到航船</p2>' + name + '<p></p><h5>航船信息</h5><p>船名：' + Shipsorce[i].get('name') + '</p><p>LRIMOShipNo：' + Shipsorce[i].get('LRIMOShipNo') + '</p><p>类型：' + Shipsorce[i].get('type') + '</p><p>国家：' + Shipsorce[i].get('country') + '</p><p>速度：' + Shipsorce[i].get('speed') + '海里/H</p>';
                    overlay.setPosition(coordinates);
                    return;
                }
            else {
                    if(flag === 4) {
                        for (i = 0, ii = ShipLength; i < ii; i++) {
                            if (Shipsorce[i].get('name') === name) {
                                find = true;
                                ex = Shipsorce[i].getGeometry().getExtent();
                                x = ex[0] + (ex[2] - ex[0]) / 2;
                                y = ex[1] + (ex[3] - ex[1]) / 2;
                                coordinates = [x, y];
                                v.setCenter(coordinates);
                                content.innerHTML = '<h>查找结果: </h><p2>找到航船</p2>' + name + '<p></p><h5>航船信息</h5><p>船名：' + Shipsorce[i].get('name') + '</p><p>LRIMOShipNo：' + Shipsorce[i].get('LRIMOShipNo') + '</p><p>类型：' + Shipsorce[i].get('type') + '</p><p>国家：' + Shipsorce[i].get('country') + '</p><p>速度：' + Shipsorce[i].get('speed') + '海里/H</p>';
                                overlay.setPosition(coordinates);
                                return;
                            }
                    }
                }
                find = false;
            }
        }
    }

   if(find===false)
   {
       let mes;
       if(flag === 2)
             mes="查找结果:未找到名为 "+name+" 的航船";
       else if(flag === 3)
            mes="查找结果:未找到航船编号为 "+No+" 的航船";
       else if(flag === 4)
            mes="查找结果:未找到名为 "+name+" 且航船编号为 "+No+" 的航船";
       /*content.innerHTML='<h>查找结果: </h><p2>未找到航船</p2>'+name;
       overlay.setPosition(coordinates);*/
       alert(mes);
   }
}
function SearchRoute(start,end,type,target,min,max) {
    start=start+" 0:0:0";
    end=end+" 23:59:59";
    SearchRoute2(start,end,type,target,min,max);
}

function SearchRoute2(s,e,t,target,min,max) {//s、e、t、target分别代表starttime endtime type  目的港口
    userService.filter_RS(s,e)
        .then(
            ShipName => {
                let str = ShipName.map((item,index) => { return  item; });
                str={
                    'features':str
                };
                vectorSourceShip.clear();
                vectorSourceRoute.clear();
                let str2 = JSON.stringify(str);
                JsonShip = JSON.parse(str2);
                let i;
                let Json_len =ShipName.length;//搜索阈值
                let use=[];
                for (i = 0; i < Json_len; i++) {
                    let j = i;
                    j++;
                    var tt=Json_len-1;
                    if(i===tt)
                    {
                        let a = JsonShip.features[j].Latitude;
                        a=Number(a);
                        let b = JsonShip.features[j].Longtitude;
                        b=Number(b);
                        let coordinate=[b,a];
                        let draught = JsonShip.features[j].Draught;
                        let des = JsonShip.features[j].Destination;
                        let Shipname = JsonShip.features[j].ShipName;
                        let LRno=JsonShip.features[j].LRIMOShipNo;
                        let Cur_data=JsonShip.features[j].ETA;
                        let speed=JsonShip.features[j].Speed;
                        let shipkind=JsonShip.features[j].ShipType;
                        let shipstates=JsonShip.features[j].MoveStatus;
                        let temp = [b,a];

                        temp=new ol.geom.Point(ol.proj.fromLonLat(temp));
                        let AA=temp.getCoordinates();
                        use.push(AA);
                        let cop=use.slice(0);//=号实现的是浅拷贝，会使得cop的值随着use的值变化而变化
                        let jsonRoute =
                            {
                                'type': 'Feature',
                                'properties': {
                                    'kind': 'Route',
                                    'name': Shipname,
                                    'from': 'Unknow',
                                    'startTime': Cur_data,
                                    'to': des,
                                    'stype':shipkind
                                },
                                'geometry': {
                                    'type': 'LineString',
                                    'coordinates': cop,
                                }
                            };

                        end = AA;
                        let dx = end[0] - start[0];
                        let dy = end[1] - start[1];
                        let rot = Math.atan2(dy, dx);

                        let jsonShip={
                            'type': 'Feature',
                            'properties': {'kind': 'ship','name':Shipname,'LRIMOShipNo': LRno,'country':'Unknow','speed':speed,'rotation':rot,'type':shipkind,'to': des,'status':shipstates, 'coor':coordinate, 'from':'Unknow','depth':draught,},
                            'geometry': {
                                'type': 'Point',
                                'coordinates': AA
                            }
                        };
                        if(shipkind===t )
                        {
                            if(des === target || target === "") {
                                if(min<=draught && draught<=max) {
                                    vectorSourceRoute.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonRoute));
                                    vectorSourceShip.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonShip));
                                }
                                }
                        }
                        use.splice(0,use.length);
                    }
                    if (JsonShip.features[i].LRIMOShipNo === JsonShip.features[j].LRIMOShipNo) {
                        let a = JsonShip.features[i].Latitude;
                        a=Number(a);
                        let b = JsonShip.features[i].Longtitude;
                        b=Number(b);
                        let temp = [b, a];
                        temp=new ol.geom.Point(ol.proj.fromLonLat(temp));//坐标转换，从经纬度坐标转换为墨卡托坐标
                        let AA=temp.getCoordinates();//返回一个数组坐标
                        use.push(AA);
                        if(i===0)
                            start=AA;

                    }
                    else {
                        let a = JsonShip.features[j].Latitude;
                        a=Number(a);
                        let b = JsonShip.features[j].Longtitude;
                        b=Number(b);
                        let coordinate=[b,a];
                        let draught = JsonShip.features[j].Draught;
                        let des = JsonShip.features[j].Destination;
                        let Shipname = JsonShip.features[j].ShipName;
                        let shipkind=JsonShip.features[j].ShipType;
                        let LRno=JsonShip.features[j].LRIMOShipNo;
                        let Cur_data=JsonShip.features[j].ETA;
                        let speed=JsonShip.features[j].Speed;
                        let shipstates=JsonShip.features[j].MoveStatus;
                        let temp = [b,a];

                        temp=new ol.geom.Point(ol.proj.fromLonLat(temp));
                        let AA=temp.getCoordinates();
                        use.push(AA);
                        let cop=use.slice(0);//=号实现的是浅拷贝，会使得cop的值随着use的值变化而变化
                        if(shipkind===t || t==="All") {
                            if( des===target || target==="") {
                                if (min <= draught && draught <= max) {
                                    let jsonRoute =
                                        {
                                            'type': 'Feature',
                                            'properties': {
                                                'kind': 'Route',
                                                'name': Shipname,
                                                'from': 'Unknow',
                                                'startTime': Cur_data,
                                                'to': des,
                                                'stype': shipkind
                                            },
                                            'geometry': {
                                                'type': 'LineString',
                                                'coordinates': cop,
                                            }
                                        };
                                    vectorSourceRoute.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonRoute));
                                    end = AA;
                                    let dx = end[0] - start[0];
                                    let dy = end[1] - start[1];
                                    let rot = Math.atan2(dy, dx);

                                    let jsonShip = {
                                        'type': 'Feature',
                                        'properties': {
                                            'kind': 'ship',
                                            'name': Shipname,
                                            'LRIMOShipNo': LRno,
                                            'country': 'Unknow',
                                            'speed': speed,
                                            'rotation': rot,
                                            'type': shipkind,
                                            'status': shipstates,
                                            'coor': coordinate,
                                            'to': des,
                                            'from': 'Unknow',
                                            'depth':draught,
                                        },
                                        'geometry': {
                                            'type': 'Point',
                                            'coordinates': AA
                                        }
                                    };
                                    vectorSourceShip.addFeatures((new ol.format.GeoJSON()).readFeatures(jsonShip));
                                    use.splice(0, use.length);
                                }
                            }
                        }
                    }

                }


            },
            error => {
                //alert("数据错误");
                // dispatch(failure(error));
                // dispatch(alertActions.error(error));
            }
        );
    ShipFeatures=vectorSourceShip.getFeatures();
    RouteFeatures=vectorSourceRoute.getFeatures();
    alert("数据加载完成");
}

function MeasureDis(){
    isDrawing=true;
    myMap.removeInteraction(drawcir);
    myMap.removeInteraction(drawLine);
    myMap.removeInteraction(drawpol);
    myMap.removeInteraction(dragBox);
    myMap.addInteraction(drawLine);


}
function CancelMeasureDis(){

    //设置测量提示框的样式
    measureTooltipElement.className = 'tooltip tooltip-static';
    //设置偏移量
    measureTooltip.setOffset([0, -7]);
    isDrawing=false;
    count = 0;
    myMap.getOverlays().clear();
    myMap.addOverlay(overlay);
    myMap.removeInteraction(drawcir);
    myMap.removeInteraction(drawLine);
    myMap.removeInteraction(drawpol);
    myMap.removeInteraction(dragBox);
}

export {showroute,hideroute,Drawrec,Drawcir,Drawpol,Drawcancel,SearchShip,SearchRoute,MeasureDis,CancelMeasureDis};
export default Container;