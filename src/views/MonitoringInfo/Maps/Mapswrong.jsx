import './map.css'
import {Tree} from 'antd';
import 'antd/dist/antd.css';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';

require('openlayers/css/ol.css');

var ol = require('openlayers');
var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');
const createStore = Redux.createStore;
var infoObj = new Map([
    ['A', '<span style="font-size:large; color: #08b6ff; ">测试点1<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN400</br>瞬时流量：331.80 m3/h</br>正向流量：84860120.23 m3</br>反向流量：-144123.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
    ['B', '<span style="font-size:large; color: #08b6ff; ">测试点2<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN800</br>瞬时流量：341.10 m3/h</br>正向流量：84812350.23 m3</br>反向流量：-1441325.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
    ['C', '<span style="font-size:large; color: #08b6ff; ">测试片区1</span>'],
    ['D', '<span style="font-size:large; color: #08b6ff; ">测试片区2</span>'],
    ['E', '<span style="font-size:large; color: #08b6ff; ">测试点3<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN400</br>瞬时流量：331.80 m3/h</br>正向流量：84860120.23 m3</br>反向流量：-144123.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
    ['F', '<span style="font-size:large; color: #08b6ff; ">测试点4<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN400</br>瞬时流量：331.80 m3/h</br>正向流量：84860120.23 m3</br>反向流量：-144123.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
    ['G', '<span style="font-size:large; color: #08b6ff; ">测试点5<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN400</br>瞬时流量：331.80 m3/h</br>正向流量：84860120.23 m3</br>反向流量：-144123.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
    ['H', '<span style="font-size:large; color: #08b6ff; ">测试点6<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN400</br>瞬时流量：331.80 m3/h</br>正向流量：84860120.23 m3</br>反向流量：-144123.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
    ['I', '<span style="font-size:large; color: #08b6ff; ">测试点7<br></span><span style="font-size: small; color: #ff640a; ">管径大小：DN400</br>瞬时流量：331.80 m3/h</br>正向流量：84860120.23 m3</br>反向流量：-144123.10 m3</br>管道压力：0.45 MPa</br>电池电压：14.26 V</br>采集日期：2018年03月19日</br>采集时间：16时00分00秒</span>'],
]);

const TreeNode = Tree.TreeNode;

class CityTree extends React.Component {
    onSelect = (selectedKeys, info) => {
        if (info.selected) {
            this.props.handleClick(selectedKeys);
        }
    }


    render() {
        return (
            <Tree
                defaultExpandAll
                // checkable
                onSelect={this.onSelect}
                // onCheck={this.onCheck}
                style={{fontSize: 40}}
            >
                <TreeNode title="扬中市" key="yzs">

                    <TreeNode title="测试片区1" key="C">
                        <TreeNode title="测试点1" key="A"/>
                        <TreeNode title="测试点2" key="B"/>
                        <TreeNode title="测试点3" key="E"/>
                        <TreeNode title="测试点4" key="F"/>
                    </TreeNode>
                    <TreeNode title="测试片区2" key="D">
                        <TreeNode title="测试点5" key="G"/>
                        <TreeNode title="测试点6" key="H"/>
                        <TreeNode title="测试点7" key="I"/>
                    </TreeNode>
                    <TreeNode title="三茅街道" key="smjd">
                        <TreeNode title="文化新村" key="whxc"/>
                        <TreeNode title="扬子新村" key="yzxc"/>
                        <TreeNode title="江州路" key="jzl"/>
                        <TreeNode title="英雄社区" key="yxsq"/>
                        <TreeNode title="广宁" key="0-0-0-4"/>
                        <TreeNode title="中桥" key="0-0-0-5"/>
                    </TreeNode>
                    <TreeNode title="兴隆街道" key="0-0-1">
                        <TreeNode title="三跃社区" key="0-0-1-0"/>
                        <TreeNode title="新星村" key="0-0-1-1"/>
                        <TreeNode title="德云村" key="0-0-1-2"/>
                        <TreeNode title="双跃村" key="0-0-1-3"/>
                        <TreeNode title="福源村" key="0-0-1-4"/>
                        <TreeNode title="兴城村" key="0-0-1-5"/>
                        <TreeNode title="恒跃村" key="0-0-1-6"/>
                    </TreeNode>
                    <TreeNode title="新坝镇" key="0-0-2">
                        <TreeNode title="新安村" key="0-0-2-0"/>
                        <TreeNode title="双新村" key="0-0-2-1"/>
                        <TreeNode title="五一村" key="0-0-2-2"/>
                        <TreeNode title="向阳村" key="0-0-2-3"/>
                        <TreeNode title="立新村" key="0-0-2-4"/>
                    </TreeNode>
                    <TreeNode title="油坊镇" key="0-0-3">
                        <TreeNode title="油坊" key="0-0-3-0"/>
                        <TreeNode title="良善" key="0-0-3-1"/>
                        <TreeNode title="老桥" key="0-0-3-2"/>
                        <TreeNode title="晨光" key="0-0-3-3"/>
                        <TreeNode title="如意" key="0-0-3-4"/>
                    </TreeNode>
                    <TreeNode title="八桥镇" key="0-0-4">
                        <TreeNode title="八桥" key="0-0-4-0"/>
                        <TreeNode title="同胜" key="0-0-4-1"/>
                        <TreeNode title="长胜" key="0-0-4-2"/>
                    </TreeNode>
                    <TreeNode title="西来桥镇" key="0-0-5">
                        <TreeNode title="西来" key="0-0-5-0"/>
                        <TreeNode title="东来" key="0-0-5-1"/>
                        <TreeNode title="三新" key="0-0-5-2"/>
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        height: 980
    },
    tree: {
        height: 980,
        width: 280,
        padding: 20,
        overflow: 'scroll'
    }
});

class Maps extends React.Component {

    state = {
        popupList: []
    };

    vectorLayer = null;
    overlay = null;
    myMap = null;

    componentDidUpdate() {
        if (this.state.popupList && document.getElementById("popup-container0")) {
            var features = this.vectorLayer.getSource().getFeatures();
            const setOverlay = (feature) => {
                var element = document.getElementById("popup-container" + feature.getProperties().name);
                if (feature.getProperties().name !== undefined && element !== null) {
                    var geo = feature.getGeometry();

                    var state = this.state;
                    var overlay = new ol.Overlay({
                        element: element,
                        positioning: 'bottom-center',
                        offset: [0, -20]
                    });
                    this.overlay = overlay;
                    this.myMap.addOverlay(overlay);
                    // var overlay = this.overlay;
                    overlay.setPosition();
                    var type = geo.getType();
                    if (type === 'Point') {
                        var coords = geo.getCoordinates();
                        overlay.getElement().innerHTML = infoObj.get(feature.getProperties().name);
                        overlay.setPosition(coords);
                        overlay.setOffset([8, -2]);
                    }
                    else if (type === 'Polygon') {
                        overlay.getElement().innerHTML = infoObj.get(feature.getProperties().name);
                        overlay.setOffset([10, 20]);
                        overlay.setPosition(geo.getCoordinates()[0][0]);
                    }
                }
                return true;
            };
            features.every(setOverlay);
        }
    }

    componentDidMount() {
        if (!String.prototype.format) {
            String.prototype.format = function () {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined'
                        ? args[number]
                        : match
                        ;
                });
            };
        }
        this.setState((prevState) => {
            var popList = ['popup-container0'];
            infoObj.forEach((value, key, map) => {
                popList.push("popup-container{0}".format(key))
            });
            return {popupList: popList}
        });

        const geojsonObject = {
            'type': 'FeatureCollection',
            /*'crs': {
             'type': 'name',
             'properties': {
             'name': 'EPSG:3857'
             }
             },*/
            'features': [
                {
                    'type': 'Feature',
                    'properties': {'name': 'C'},
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [[[13337210.426624, 3801547.828621], [13333159.264125, 3803057.459929], [13331095.464362, 3802684.829416],
                            [13328018.873973, 3800305.726911], [13334955.534290, 3796942.497666]]]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'D'},
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [[[13335012.862061, 3796760.959724], [13332605.095670, 3791878.544542], [13334477.802863, 3790903.972432],
                            [13337267.754396, 3791267.048316], [13338949.369018, 3795413.757101]]]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'B'},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [13329437.736311, 3798427.286883]
                    }
                },

                {
                    'type': 'Feature',

                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13331176.678704, 3798763.609778], [13330546.073221, 3797532.973593], [13331971.623915, 3796820.198246],]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {'name': 'A'}, 'geometry': {
                        'type': 'Point',
                        'coordinates': [13338041.679307, 3797038.043952]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'E'}, 'geometry': {
                        'type': 'Point',
                        'coordinates': [13330503.077392, 3797515.775379]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'F'}, 'geometry': {
                        'type': 'Point',
                        'coordinates': [13330617.732935, 3793044.209224]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'G'}, 'geometry': {
                        'type': 'Point',
                        'coordinates': [13336790.022969, 3793655.705450]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'H'}, 'geometry': {
                        'type': 'Point',
                        'coordinates': [13341185.152095, 3796502.984754]
                    }
                }, {
                    'type': 'Feature',
                    'properties': {'name': 'I'}, 'geometry': {
                        'type': 'Point',
                        'coordinates': [13339064.024560, 3793139.755509]
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336723.140569, 3798108.162348], [13337239.090510, 3797821.523492], [13337525.729366, 3798423.465089],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337100.548396, 3797525.330007], [13336689.699369, 3796622.417610], [13337200.871996, 3796393.106526], [13337597.389080, 3797276.909665]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336579.821141, 3797783.304978], [13337100.548396, 3797532.495978], [13337611.721023, 3797282.881308]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335737.819501, 3795522.441000], [13336265.712728, 3795795.942242], [13336396.491706, 3795856.255835]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335575.390816, 3796030.030641], [13335739.610994, 3795525.128240], [13335882.333258, 3795076.956445],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336034.012986, 3794584.893075], [13336529.659341, 3794758.070717], [13337090.993768, 3794752.696239],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335884.721915, 3795078.747938], [13336218.536749, 3795242.072369], [13336389.773608, 3795288.352601],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335386.388320, 3794842.569464], [13335881.736094, 3795074.567788],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334673.672748, 3795054.264202], [13335219.480903, 3795235.802144], [13335257.699417, 3795252.821326], [13335266.955464, 3795256.553603], [13335737.819501, 3795525.576113]]
                    }
                }
                , {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334535.727799, 3795488.999800], [13334546.476756, 3795469.442670], [13334670.686927, 3795063.221666], [13334777.877916, 3794671.332605], [13335342.571391, 3794825.326345]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334777.877916, 3794671.332605], [13334896.116444, 3794248.391001],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335570.912084, 3794438.587826], [13336033.863695, 3794597.433525], [13335884.274042, 3795076.508572],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336820.179765, 3793911.291763], [13337152.203107, 3794027.141634], [13337148.172248, 3794045.728373], [13337140.259821, 3794293.551550], [13337091.740223, 3794744.186648], [13337128.167244, 3794425.823439], [13337643.221439, 3794395.965225]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336691.789444, 3794333.188330], [13337124.733550, 3794427.092413], [13337161.235216, 3794429.854298],]
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337389.426618, 3794351.551131], [13337482.733538, 3794000.269242]]
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336740.159751, 3794180.612855], [13337140.110530, 3794293.178323], [13337173.103857, 3794302.359724], [13337390.023783, 3794351.551131], [13337398.757310, 3794410.371813]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337154.591764, 3794026.693761], [13337181.314866, 3794027.589508], [13337615.304009, 3793989.072411]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337624.261473, 3793988.923120], [13338007.790234, 3793970.709610], [13338118.414917, 3793959.064906], [13338216.349860, 3794263.618691], [13338309.134260, 3794545.480232], [13338408.338177, 3794905.644941]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337653.223941, 3794394.696251], [13337928.889903, 3794360.956469], [13338395.499145, 3794203.006516],]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337092.188096, 3794744.933103], [13337670.989578, 3794732.541944], [13338688.109644, 3794422.464390]]
                    }
                }, {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334673.672748, 3795054.264202], [13335219.480903, 3795235.802144], [13335257.699417, 3795252.821326], [13335266.955464, 3795256.553603], [13335737.819501, 3795525.576113]]
                    }
                }]
        };
        var styleFunction = (function () {
            var styles = {};
            var image = new ol.style.Circle({
                radius: 5,
                fill: null,
                stroke: new ol.style.Stroke({
                        color: "#ec710d",
                        width: 4
                    }
                )
            });
            styles['Point'] = new ol.style.Style({image: image});
            styles['Polygon'] = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#0a93ff',
                    width: 3
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })
            });
            styles['default'] = new ol.style.Style(
                {
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: null,
                        stroke: new ol.style.Stroke({
                                color: "#ec0005",
                                width: 4
                            }
                        )
                    })
                });
            return function (feature) {
                if (feature.getGeometry().getType() === "Point") {
                    if (Math.floor(Math.random() * 10) > 2) {
                        return styles[feature.getGeometry().getType()]
                    }
                    else{
                        return styles['default']
                    }
                }
                return styles[feature.getGeometry().getType()] || styles['default'];
            };
        })();

        this.vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
            }),
            style: styleFunction
        });

        this.myMap = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
                this.vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([119.79059814453124, 32.247918113355036]),
                zoom: 13.6,
            })
        });


        const placeSelector = (state, action) => {
            if (typeof state === 'undefined') {
                state = {places: [], selected: null};
            }
            switch (action.type) {
                case 'visible':
                    return {places: action.places, selected: state.selected};
                case 'select':
                    return {places: state.places, selected: action.placeName};
                default:
                    return state;
            }
        }

        var store = createStore(placeSelector);

        const visiblePlacesAction = (places) => {
            return {
                type: 'visible',
                places: places
            };
        }

        const updateVisiblePlaces = () => {
            var extent = this.myMap.getView().calculateExtent(this.myMap.getSize());
            var places = this.vectorLayer.getSource().getFeaturesInExtent(extent).map(function (feature) {
                return feature.getProperties();
            });
            // Update state in Redux store
            store.dispatch(visiblePlacesAction(places))
        }

        this.vectorLayer.on('change', updateVisiblePlaces);
        this.myMap.on('moveend', () => {
            var overlays = this.myMap.getOverlays().getArray();
            var style = "";
            var myMap = this.myMap;
            if (this.myMap.getView().getZoom() > 13.6) {
                style = "";
            } else {
                style = "visibility: hidden;"
            }
            overlays.forEach((overlay) => {
                overlay.getElement().style = style;
            })
        })
    }

    flyTo = (location, zoom, done) => {
        var duration = 2000;
        var called = false;
        var parts = 2;

        function callback(complete) {
            --parts;
            if (called) {
                return;
            }
            if (parts === 0 || !complete) {
                called = true;
                done(complete);
            }
        }

        this.myMap.getView().animate({
            center: location,
            zoom: zoom,
            duration: duration
        }, callback);
    }

    handleClick = (name) => {
        var state = this.state;
        var map = this.myMap;
        var features = this.vectorLayer.getSource().getFeatures();
        const setOverlay = (feature) => {
            var geo = feature.getGeometry();
            if (feature.getProperties().name === name[0]) {

                var type = geo.getType();
                if (type === 'Point') {
                    var coords = geo.getCoordinates();
                    this.flyTo(coords, 15.6, function () {
                    });
                    var flash = (feature) => {
                        var start = new Date().getTime();
                        var listenerKey;

                        var animate = (event) => {
                            var vectorContext = event.vectorContext;
                            var frameState = event.frameState;
                            var flashGeom = feature.getGeometry().clone();
                            var elapsed = frameState.time - start;
                            var elapsedRatio = elapsed / 2000;
                            // radius will be 5 at start and 30 at end.
                            var radius = ol.easing.easeOut(elapsedRatio) * 20 + 5;
                            var opacity = ol.easing.easeOut(1 - elapsedRatio);

                            var style = new ol.style.Style({
                                image: new ol.style.Circle({
                                    radius: radius,
                                    snapToPixel: false,
                                    stroke: new ol.style.Stroke({
                                        color: 'rgba(255, 0, 0, ' + opacity + ')',
                                        width: 0.2 + opacity
                                    })
                                })
                            });

                            vectorContext.setStyle(style);
                            vectorContext.drawGeometry(flashGeom);
                            if (elapsed > 2000) {
                                ol.Observable.unByKey(listenerKey);
                                return;
                            }
                            // tell OpenLayers to continue postcompose animation
                            map.render();
                        };
                        listenerKey = map.on('postcompose', animate);
                    };

                    var repeatFlash = (feature, repeatTimes) => {
                        if (repeatTimes == 0) {
                            return
                        }
                        else {
                            flash(feature);
                            setTimeout(function () {
                                repeatFlash(feature, repeatTimes - 1);
                            }, 500);
                        }
                    };
                    repeatFlash(feature, 10);
                    return false;
                }
                else if (type === 'Polygon') {
                    if (this.overlay) {
                        this.overlay.setPosition();
                    }
                    var state = this.state;
                    var overlay = new ol.Overlay({
                        element: document.getElementById("popup-container0"),
                        positioning: 'bottom-center',
                        offset: [0, -20]
                    });
                    this.overlay = overlay;
                    this.myMap.addOverlay(overlay);
                    overlay.getElement().style = "";
                    overlay.getElement().innerHTML = infoObj.get(name[0]);
                    overlay.setOffset([10, 20]);
                    this.flyTo(ol.proj.fromLonLat([119.79059814453124, 32.247918113355036]), 12.6, function () {
                    });
                    overlay.setPosition(geo.getCoordinates()[0][0]);
                    return false;
                }
            }
            return true;
        };

        features.every(setOverlay);
    };

    render() {
        const {classes} = this.props;
        if (this.myMap) {
            this.myMap.getView().setZoom(13.6);
            this.myMap.getView().setCenter(ol.proj.fromLonLat([119.79059814453124, 32.247918113355036]));
        }
        return (
            <div className={classes.root}>
                <Paper className={classes.tree}>
                    <CityTree handleClick={this.handleClick}/>
                </Paper>
                <div id='map' className='myMap'>
                    {this.state.popupList.map((val, index) => <div style={{visibility: "hidden"}} className='ol-popup'
                                                                   id={val} key={val}/>)}
                </div>
            </div>

        )
    }
}

export default withStyles(styles)(Maps);