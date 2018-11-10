import './map.css'
import { Tree } from 'antd';
import 'antd/dist/antd.css';
import {withStyles} from 'material-ui/styles';
require('openlayers/css/ol.css');

var ol = require('openlayers');
var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var createStore = Redux.createStore;

class Map extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        function placeSelector(state, action) {
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

        var overlay = new ol.Overlay({
            element: document.getElementById('popup-container'),
            positioning: 'bottom-center',
            offset: [0, -20]
        });
        var geojsonObject = {
            'type': 'FeatureCollection',
            'crs': {
             'type': 'name',
             'properties': {
             'name': 'EPSG:4326' //3857
             }
             },
            'features': [  
                {
                'type': 'Feature',
                'properties': {'name': 'B'}, 'geometry': {
                    'type': 'Point',
                    'coordinates': [13329437.736311, 3798427.286883]
                }
            }, {
                'type': 'Feature',
                'style': {
                    'stroke': {
                        'color':'#555555',
                        'width': 4
                    },
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13331176.678704, 3798763.609778], [13330546.073221, 3797532.973593], [13331971.623915, 3796820.198246],]
                }
            }, {
                'type': 'Feature',
                'properties': {'name': 'A'}, 'geometry': {
                    'type': 'Point',
                    'coordinates': [13338041.679307, 3797038.043952]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13336723.140569, 3798108.162348], [13337239.090510, 3797821.523492], [13337525.729366, 3798423.465089],]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13337100.548396, 3797525.330007], [13336689.699369, 3796622.417610], [13337200.871996, 3796393.106526], [13337597.389080, 3797276.909665]]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#ff0000',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13336579.821141, 3797783.304978], [13337100.548396, 3797532.495978], [13337611.721023, 3797282.881308]]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13335737.819501, 3795522.441000], [13336265.712728, 3795795.942242], [13336396.491706, 3795856.255835]]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13335575.390816, 3796030.030641], [13335739.610994, 3795525.128240], [13335882.333258, 3795076.956445],]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13336034.012986, 3794584.893075], [13336529.659341, 3794758.070717], [13337090.993768, 3794752.696239],]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13335884.721915, 3795078.747938], [13336218.536749, 3795242.072369], [13336389.773608, 3795288.352601],]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13335386.388320, 3794842.569464], [13335881.736094, 3795074.567788],]
                }
            }, {
                'type': 'Feature', 'properties': {
                    'stroke': '#555555',
                    'stroke-width': 4,
                    'stroke-opacity': 1
                },
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [[13334673.672748, 3795054.264202], [13335219.480903, 3795235.802144], [13335257.699417, 3795252.821326], [13335266.955464, 3795256.553603], [13335737.819501, 3795525.576113]]
                }
            }
                , {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334535.727799, 3795488.999800], [13334546.476756, 3795469.442670], [13334670.686927, 3795063.221666], [13334777.877916, 3794671.332605], [13335342.571391, 3794825.326345]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334777.877916, 3794671.332605], [13334896.116444, 3794248.391001],]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335570.912084, 3794438.587826], [13336033.863695, 3794597.433525], [13335884.274042, 3795076.508572],]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336820.179765, 3793911.291763], [13337152.203107, 3794027.141634], [13337148.172248, 3794045.728373], [13337140.259821, 3794293.551550], [13337091.740223, 3794744.186648], [13337128.167244, 3794425.823439], [13337643.221439, 3794395.965225]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336691.789444, 3794333.188330], [13337124.733550, 3794427.092413], [13337161.235216, 3794429.854298],]
                    }
                },
                {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337389.426618, 3794351.551131], [13337482.733538, 3794000.269242]]
                    }
                },
                {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336740.159751, 3794180.612855], [13337140.110530, 3794293.178323], [13337173.103857, 3794302.359724], [13337390.023783, 3794351.551131], [13337398.757310, 3794410.371813]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337154.591764, 3794026.693761], [13337181.314866, 3794027.589508], [13337615.304009, 3793989.072411]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337624.261473, 3793988.923120], [13338007.790234, 3793970.709610], [13338118.414917, 3793959.064906], [13338216.349860, 3794263.618691], [13338309.134260, 3794545.480232], [13338408.338177, 3794905.644941]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337653.223941, 3794394.696251], [13337928.889903, 3794360.956469], [13338395.499145, 3794203.006516],]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337092.188096, 3794744.933103], [13337670.989578, 3794732.541944], [13338688.109644, 3794422.464390]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13334673.672748, 3795054.264202], [13335219.480903, 3795235.802144], [13335257.699417, 3795252.821326], [13335266.955464, 3795256.553603], [13335737.819501, 3795525.576113]]
                    }
                },
                //add          
                {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13326719.444492, 3799202.167315], [13330503.077392, 3797530.107321], [13329280.084940, 3794701.937275], [13329595.387681, 3794338.861390], [13331191.010647, 3793679.592021]]
                    }
                },{
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13329050.773855, 3798169.073105], [13329645.549481, 3799504.332443], [13336121.198971, 3796332.195769], [13336804.354912, 3793919.652063], [13336942.897025, 3793733.336807]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336942.897025, 3793733.336807], [13337248.645138, 3793814.551150], [13337604.555051, 3793815.148314], [13337676.214765, 3794732.392653], [13338084.675135, 3795845.506878]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13331229.229161, 3793672.426050], [13331835.948073, 3794092.829706], [13336121.198971, 3796332.195769], [13339212.121303, 3795559.465186], [13339422.323130, 3794752.099075], [13340124.588328, 3792888.946510], [13335605.249030, 3792817.286796], [13335672.131430, 3793586.434393], [13335094.076404, 3795774.444328]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13335590.917088, 3793997.283420], [13336680.144741, 3794331.695419]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336039.984629, 3794584.893075], [13336283.627656, 3793586.434393], [13336245.409142, 3792841.173367]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337676.214765, 3794727.018175], [13337537.672652, 3792849.533667]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13332671.978070, 3798047.251591], [13331912.385101, 3796864.866310], [13334549.462577, 3795512.886372]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13336453.222313, 3795097.260030], [13337267.754396, 3795360.012315], [13338880.097961, 3794750.904746], [13339021.028732, 3794543.091575], [13339515.480759, 3793109.897295], [13339532.201358, 3792890.140839]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13337604.555051, 3793816.939807], [13337991.517507, 3793809.773835], [13338266.213078, 3793900.542806], [13338662.730162, 3793826.494435], [13339159.570846, 3794048.639549]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13338115.727678, 3793960.259235], [13338184.998735, 3793719.004864], [13338586.293133, 3792873.420239]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13338610.179705, 3794844.062374], [13338287.710992, 3793907.708778]]
                    }
                }, {
                    'type': 'Feature', 'properties': {
                        'stroke': '#555555',
                        'stroke-width': 4,
                        'stroke-opacity': 1
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[13338426.253105, 3793222.164180], [13339336.331474, 3793561.353493]]
                    }
                }]
        };
        const vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
            })
        });

        const myMap = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                }),
                vectorLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([119.79059814453124, 32.247918113355036]),
                zoom: 13.6,
            })
        });

        myMap.on('singleclick', function (event) {
            overlay.setPosition();
            var feature = myMap.getFeaturesAtPixel(event.pixel);
            if (feature) {
                var geo = feature[0].getGeometry();
                if (geo.getType() === 'Point') {
                    var coords = geo.getCoordinates();
                    overlay.getElement().innerHTML = '明珠大道拐角;<br>' +
                        '管径大小：DN400</br>' +
                        '瞬时流量：331.80 m3/h</br>' +
                        '正向流量：8486050.23 m3</br>' +
                        '反向流量：-14405.10 m3</br>' +
                        '管道压力：0.45 MPa</br>' +
                        '电池电压：14.26 V</br>' +
                        '采集日期：2018年03月19日</br>' +
                        '采集时间：16时00分00秒';
                    overlay.setPosition(coords);
                }

            }
        });

        function visiblePlacesAction(places) {
            return {
                type: 'visible',
                places: places
            };
        }

        function updateVisiblePlaces() {
            var extent = myMap.getView().calculateExtent(myMap.getSize());
            var places = vectorLayer.getSource().getFeaturesInExtent(extent).map(function (feature) {
                return feature.getProperties();
            });
            // Update state in Redux store
            store.dispatch(visiblePlacesAction(places))
        }

        vectorLayer.on('change', updateVisiblePlaces);
        myMap.on('moveend', updateVisiblePlaces);

        // myMap.addLayer(vectorLayer);
        myMap.addOverlay(overlay);

    }

    render() {
        console.log(this.props.contentRender);
        console.log('cai');

        return (
            // React.createElement('div', {id: 'map'})
            <div id='map' className='myMap'>
                <div id='popup-container' className='ol-popup'></div>
            </div>
        )

    }
}

const TreeNode = Tree.TreeNode;
class CityTree extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }

  render() {
    return (
        <Tree
        defaultExpandAll
        checkable
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        style={{fontSize: 40}}
        >
        <TreeNode title="扬中市" key="0-0">
          <TreeNode title="三茅街道" key="0-0-0">
            <TreeNode title="文化新村" key="0-0-0-0" />
            <TreeNode title="扬子新村" key="0-0-0-1" />
            <TreeNode title="江州路" key="0-0-0-2" />
            <TreeNode title="英雄社区" key="0-0-0-3" />
            <TreeNode title="广宁" key="0-0-0-4" />
            <TreeNode title="中桥" key="0-0-0-5" />
          </TreeNode>
          <TreeNode title="兴隆街道" key="0-0-1">
            <TreeNode title="三跃社区" key="0-0-1-0" />
            <TreeNode title="新星村" key="0-0-1-1" />
            <TreeNode title="德云村" key="0-0-1-2" />
            <TreeNode title="双跃村" key="0-0-1-3" />
            <TreeNode title="福源村" key="0-0-1-4" />
            <TreeNode title="兴城村" key="0-0-1-5" />
            <TreeNode title="恒跃村" key="0-0-1-6" />
          </TreeNode>
          <TreeNode title="新坝镇" key="0-0-2">   
            <TreeNode title="新安村" key="0-0-2-0" />
            <TreeNode title="双新村" key="0-0-2-1" />
            <TreeNode title="五一村" key="0-0-2-2" />
            <TreeNode title="向阳村" key="0-0-2-3" />
            <TreeNode title="立新村" key="0-0-2-4" />
          </TreeNode>
          <TreeNode title="油坊镇" key="0-0-3">
            <TreeNode title="油坊" key="0-0-3-0" />
            <TreeNode title="良善" key="0-0-3-1" />
            <TreeNode title="老桥" key="0-0-3-2" />
            <TreeNode title="晨光" key="0-0-3-3" />
            <TreeNode title="如意" key="0-0-3-4" />
          </TreeNode>
          <TreeNode title="八桥镇" key="0-0-4">
            <TreeNode title="八桥" key="0-0-4-0" />
            <TreeNode title="同胜" key="0-0-4-1" />
            <TreeNode title="长胜" key="0-0-4-2" />
          </TreeNode>
          <TreeNode title="西来桥镇" key="0-0-5">
            <TreeNode title="西来" key="0-0-5-0" />
            <TreeNode title="东来" key="0-0-5-1" />
            <TreeNode title="三新" key="0-0-5-2" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
  }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    tree: {
        height: 1000,
        width: 400
    }
})

class Maps extends React.Component {
    
    render() {
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <CityTree className={classes.tree}/>
                <Map/>
            </div>
        )
    }
}

export default withStyles(styles)(Maps);