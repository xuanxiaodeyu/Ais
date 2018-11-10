//实时数据监控（表格显示）
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ChartCard,RegularCard,ItemGrid, TrafficAnalysisCard} from "components";
import  Grid  from "material-ui/Grid/Grid";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange, LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { lighten } from 'material-ui/styles/colorManipulator';
import  Button from 'material-ui/Button';
import tableStyle from "variables/styles/tableStyle";
import ReactEcharts from 'echarts-for-react';
import {Select, MenuItem} from 'material-ui';
import axios from "axios/index";
import ReactTable from "react-table";

const nowDate = new Date();
const beforeDate = new Date();
beforeDate.setDate(nowDate.getDate()-1);
const NumToCity = (data) =>{
    switch (data){
        case "0-0-0-0" :
            return "文化新村";
        case "0-0-0-1":
            return "扬子新村";
        case "0-0-0-2" :
            return "江州路";
        case "0-0-0-3":
            return "英雄社区";
        case "0-0-0-4" :
            return "广宁";
        case "0-0-0-5":
            return "中桥";
        case "0-0-1-0" :
            return "三跃社区";
        case "0-0-1-1":
            return "新星村";
        case "0-0-1-2" :
            return "德云村";
        case "0-0-1-3":
            return "双跃村";
        case "0-0-1-4" :
            return "福源村";
        case "0-0-1-5":
            return "兴城村";
        case "0-0-1-6":
            return "恒跃村";
        case "0-0-2-0" :
            return "新安村";
        case "0-0-2-1":
            return "双新村";
        case "0-0-2-2" :
            return "五一村";
        case "0-0-2-3":
            return "向阳村";
        case "0-0-2-4" :
            return "立新村";
        case "0-0-3-0" :
            return "油坊";
        case "0-0-3-1":
            return "良善";
        case "0-0-3-2" :
            return "老桥";
        case "0-0-3-3":
            return "晨光";
        case "0-0-3-4" :
            return "如意";
        case "0-0-4-0" :
            return "八桥";
        case "0-0-4-1":
            return "同胜";
        case "0-0-4-2" :
            return "长胜";
        case "0-0-5-0" :
            return "西来";
        case "0-0-5-1":
            return "东来";
        case "0-0-5-2" :
            return "三新";
        default:
            return data
    }
};


const styles = theme => ({
  root: {
    width: '100%',
    height: 700
  },
  table: {
    minWidth: 1700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class MonitorTableRaw extends React.Component {
    dataTable = [];
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillReceiveProps(nextProp) {
        this.setState({
            data: nextProp.dataFromParents.map((prop, key) => {
                return ({
                    //todo 更改数据
                    id: key,
                    name: NumToCity(prop.M_Name),
                    size: prop.volt,
                    material: prop.M_Material,
                    flow: prop.now_traffic,
                    forwardtraffic: prop.forward_traffic,
                    reversetraffic: prop.reverse_traffic,
                    pressure: prop.pressure,
                    batteryvoltage: prop.volt,
                    time: prop.created,
                    //todo
                    actions:(
                        <div className="actions-center">
                            {prop.warns == 1 ? (
                                <TableCell>
                                    <Button variant="raised" color="secondary" size="small">告警</Button>
                                </TableCell>
                            ) : (
                                <TableCell> </TableCell>
                            )}
                        </div>
                    )
                })
            })
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <ReactTable
                    data={
                        this.state.data
                    }
                    filterable
                    columns={[
                        {
                            Header: " ",
                            accessor: "actions",
                            sortable: false,
                            filterable: false,
                        },
                        {
                            Header: "站点名称",
                            accessor: "name",
                        },
                        {
                            Header: "管径大小",
                            accessor: "size"
                        },
                        {
                            Header: "管线材质",
                            accessor: "material"
                        },
                        {
                            Header: "瞬时流量（m3/h）",
                            accessor: "flow"
                        },
                        {
                            Header: "正向流量（m3/h）",
                            accessor: "forwardtraffic",
                        },
                        {
                            Header: "反向流量（m3/h）",
                            accessor: "reversetraffic"
                        },
                        {
                            Header: "管道压力（MPa）",
                            accessor: "pressure"
                        },
                        {
                            Header: "电池电压（V）",
                            accessor: "batteryvoltage"
                        },
                        {
                            Header: "最后采集时间",
                            accessor: "time",
                        }
                    ]}
                    defaultPageSize={14}
                    showPaginationTop={false}
                    showPaginationBottom
                    className="-striped -highlight"
                    nextText = '下一页'
                    previousText = '上一页'
                    loadingText = '加载中...'
                    noDataText = '无数据'
                    pageText = ' '
                    rowsText = '行'
                />
            </div>
        )
    }
}


const MonitorTable = withStyles(styles)(MonitorTableRaw);

class MonitorChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  timeTicket = null;
  count = 51;
  getInitialState = () => ({
    option: this.getOption(),
    place: 1
  });

  fetchNewDate = () => {
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    let option = this.state.option;
    let data0 = option.series[0].data;
    let data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000) % 100);
    data1.shift();
    data1.push(Math.random().toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(this.count++);
    this.setState({option: option});
  };

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  };

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };

  getOption = () => ({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:['瞬时流量（m3/h）', '正向流量（m3/h）', '管道压力（MPa）', '电池电压（V）' ]
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    grid: {
      top: 60,
      left: 30,
      right: 60,
      bottom:30
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
        '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
        '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let now = new Date();
          let res = [];
          let len = 50;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(now - 2000);
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function (){
          let res = [];
          let len = 50;
          while (len--) {
            res.push(50 - len + 1);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '流量大小',
        max: 120,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: '压力大小',
        max: 1.2,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name:'瞬时流量（m3/h）',
        type:'line',
        data:(function (){
          let res = [];
          let len = 50;
          while (len--) {
            res.push(Math.round(Math.random() * 1000) % 100);
          }
          return res;
        })()
      },
      {
        name: '管道压力（MPa）',
        type: 'bar',
        animationEasing: 'elasticOut',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 4,
          }
        },
        animationDelay: function (idx) {
          return idx * 10;
        },
        animationDelayUpdate: function (idx) {
          return idx * 10;
        },
        data: (function () {
          let res = [];
          let len = 50;
          while (len--) {
            res.push(Math.random().toFixed(1));
          }
          return res;
        })()
      }
    ]
  });

  handlePlaceChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Select
          value={this.state.place}
          onChange={this.handlePlaceChange}
          inputProps={{
            name: 'place'
          }}
          >
          <MenuItem value={1}>新安村</MenuItem>
          <MenuItem value={2}>油坊镇</MenuItem>
          <MenuItem value={3}>八桥镇</MenuItem>
        </Select>
        <ReactEcharts
          option={this.state.option}
          style={{height: 600}}
        />
      </div>

    );
  }
}

class Monitor extends React.Component {

    requestUrl = "http://132.148.150.37:8000/api/monitor/";
    state = {
        showChart: false
    };
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        axios({
            method: 'get',
            url: this.requestUrl,
        }).then((response) => {
            if (response.status === 200) {
                this.setState({data: response.data.results});
            }
        });
    }

  render() {
    return (
        <div>
          <Grid container>
            <ItemGrid xs={12} sm={12} md={12}>
              <TrafficAnalysisCard
                headerColor={'red'}
                cardTitle="监测信息"
                cardSubtitle=" "
                handleClick={showChart => this.setState({showChart})}
                content={
                  !this.state.showChart?
                    <MonitorTable dataFromParents={this.state.data}/>
                    :
                    <MonitorChart/>
                }
              />
              </ItemGrid>
            </Grid>
        </div>
    );
  }
}

export default Monitor;



