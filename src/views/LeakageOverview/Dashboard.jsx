//import React from "react";
import PropTypes from "prop-types";

//import Echart from 'echarts-for-react';
import IconCard from "components/Cards/IconCard.jsx";
import Timeline from "material-ui-icons/Timeline";


/*import {
  ContentCopy,
  Store,
  InfoOutline,
  DateRange,
  LocalOffer,
  Update,
  Alarm,
  Opacity,
  ShoppingCart,
  TrendingUp,
  SwapVert,
  Assessment,
  DonutSmall
} from "material-ui-icons";*/

import ContentCopy from "material-ui-icons/ContentCopy";
import Store from "material-ui-icons/Store";
import InfoOutline from "material-ui-icons/InfoOutline";
import DateRange from "material-ui-icons/DateRange";

import LocalOffer from "material-ui-icons/LocalOffer";
import Update from "material-ui-icons/Update";
import Alarm from "material-ui-icons/Alarm";
import ShoppingCart from "material-ui-icons/ShoppingCart";
import TrendingUp from "material-ui-icons/TrendingUp";
import SwapVert from "material-ui-icons/SwapVert";
import Assessment from "material-ui-icons/Assessment";
import DonutSmall from "material-ui-icons/DonutSmall";
import Opacity from "material-ui-icons/Opacity";
import  withStyles from "material-ui/styles/withStyles";
import   Grid  from "material-ui/Grid";
import StatsCard from 'components/Cards/StatsCard.jsx';
import ItemGrid from 'components/Grid/ItemGrid.jsx';

import dashboardStyle from "variables/styles/dashboardStyle";

import React from 'react';
// import the core library.
import ReactEchartsCore from 'echarts-for-react/lib/core';

// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
 import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';

// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
 //import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';

// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';

import 'echarts/lib/component/title';

// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';

// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';

// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';

// import 'zrender/lib/vml/vml';

// The usage of ReactEchartsCore are same with above.




let option = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
      orient: 'vertical',
      x: 'left',
      data:['商用船只','民用船只','军用船只','其他船只']
  },
  series: [
      {
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:[
              {value:11, name:'军用船只'},
              {value:54, name:'民用船只'},
              {value:72, name:'商用船只'},
              {value:11, name:'其他船只'}
          ]
      }
  ],
};

let optionbar = {
    color: ['#4682B4'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'供水量',
            type:'bar',
            barWidth: '60%',
            data: [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
        }
    ]
};
let optionline = {
    color: ['#43CD80'],
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [12, 17, 7, 17, 23, 18, 38],
        type: 'line'
    }]
};



class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="进出港比"
              description="38.2"
              small="%"
              statIcon={DateRange}
              statIconColor="danger"
              statLink={{ text: "查看详情", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="船队收支比"
              description="32.8"
              small="%"
              statIcon={DateRange}
              statLink={{ text: "查看详情", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="船队总量"
              description="43"
              small="个"
              statIcon={LocalOffer}
              statLink={{ text: "查看详情", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Alarm}
              iconColor="blue"
              title="监测船只数"
              description="48"
              small="个"
              statIcon={Update}
              statLink={{ text: "查看实时监测数据", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Opacity}
              iconColor="blue"
              title="今日入港船只数"
              description="29.8"
              small="km3"
              statIcon={Update}
              statLink={{ text: "查看分析数据", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={SwapVert}
              iconColor="green"
              title="今日出港船只数"
              description="892"
              small="次"
              statIcon={Update}
              statLink={{ text: "查看历史数据", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={TrendingUp}
              iconColor="red"
              title="统计分析"
              description="355"
              small="个"
              statIcon={Update}
              statLink={{ text: "查看统计详情", href: "/home/ship" }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ShoppingCart}
              iconColor="orange"
              title="今日降水概率"
              description="26.5"
              small="%"
              statIcon={Update}
              statLink={{ text: "查看实时监测数据", href: "/home/ship" }}
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4}>
              <IconCard
                  icon={Timeline}
                  title="船只入港量分析 "
                  iconColor="green"
                  content={
                      <ReactEchartsCore
                          echarts={echarts}
                      option={optionline}
                    />
                  }
              />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
              <IconCard
                  icon={Assessment}
                  title="海域降水率统计"
                  iconColor="blue"
                  content={
                      <ReactEchartsCore
                          echarts={echarts}
                      option={optionbar}
                    />
                  }
              />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
              <IconCard
                  icon={DonutSmall}
                  iconColor="red"
                  title="各类型船只占比"
                  content={
                    <ReactEchartsCore
                        echarts={echarts}
                        option={option}
                    />
                  }
               />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
