import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import 'openlayers/css/ol.css';
import { Manager, Target, Popper } from "react-popper";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import MenuItem from "material-ui/Menu/MenuItem";
import MenuList from "material-ui/Menu/MenuList";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
//import Paper from "material-ui/Paper";
import Grow from "material-ui/transitions/Grow";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";
// material-ui-icons
import Router from "material-ui-icons/Router";
import Panorama from "material-ui-icons/Panorama";
import Undo from "material-ui-icons/Undo";
import Visibility from "material-ui-icons/Visibility";
import ExitToApp from "material-ui-icons/ExitToApp";
import AspectRatio from "material-ui-icons/AspectRatio";
import HourglassFull from "material-ui-icons/HourglassFull";
import Notifications from "material-ui-icons/Notifications";
import Dashboard from "material-ui-icons/Dashboard";
import Search from "material-ui-icons/Search";
import LocationOn from "material-ui-icons/LocationOn";
import DirectionsBoat from "material-ui-icons/DirectionsBoat";
import BluetoothSearching from "material-ui-icons/BluetoothSearching";
import WbSunny from "material-ui-icons/WbSunny";
import Explore from "material-ui-icons/Explore";
import RoundedCorner from "material-ui-icons/RoundedCorner";
import Create from "material-ui-icons/Create";
import GolfCourse from "material-ui-icons/GolfCourse";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SearchButton from "components/CustomButtons/IconButton.jsx";
import InputLabel from "material-ui/Input/InputLabel";
import Select from "material-ui/Select";

import headerLinksStyle from "../../assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
//import {Container,Map} from 'views/MonitoringInfo/Maps/Maps.jsx'
import {showroute,hideroute,Drawrec,Drawcir,Drawpol,Drawcancel,SearchShip,SearchRoute,MeasureDis,CancelMeasureDis} from "../../views/MonitoringInfo/Maps/Maps";
import DateRangePickerWrapper from 'components/Header2/DatePicker.jsx';
import FormControl from "material-ui/Form/FormControl";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import ItemGrid from "components/Grid/ItemGrid.jsx";

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { START_DATE, END_DATE } from 'react-dates/lib/constants';
import moment from "moment/moment";
import DateRangePicker from 'react-dates/lib/components/DateRangePicker';
import SAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "../../assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import Checkbox from "material-ui/Checkbox";
import Check from "material-ui-icons/Check";
import IconCard from "components/Cards/IconCard.jsx";
import MailOutline from "material-ui-icons/MailOutline";
import FiberManualRecord from "material-ui-icons/FiberManualRecord";
import Radio from "material-ui/Radio";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import GridContainer from "components/Grid/GridContainer.jsx";
import imgPort from '../../assets/img/port.svg'
import {cookies} from "../../variables/general";
import Button from 'material-ui/Button';
import { userActions } from '_actions';
import { history } from '_helpers/history.js';
const HeaderStyle = {
    ...headerLinksStyle,
    ...sweetAlertStyle,
    ...regularFormsStyle,
};
let isshow=false;//航线显示标志
let ishcsx=false;//航船搜索标志
let issx=false;//筛选按钮标志

class HeaderLinks extends React.Component {
    constructor(props) {
        super(props);
        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = START_DATE;
        } else if (props.autoFocusEndDate) {
            focusedInput = END_DATE;
        }
        this.state = {
            checked:0,
            selectedEnabled: "",
            alert: null,
            s_time: '',
            e_time: '',
            type: '',
            open: false,
            ShipName: "",
            ShipNo:"",
            simpleSelect: "",
            focusedInput,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
            TargetPort:"",
            MinShipLeng:0,
            MaxShipLeng:1000,
            ShipCountry:"",
            MinDepth:0,
            MaxDepth:100
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
    }
    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
        let value = event.target.value;
        if(value==="a")
        {
            Drawcir();
        }
        else if(value==="b")
        {
            Drawpol();
        }
        else if(value==="c")
        {
            Drawrec();
        }
        else if(value==="d")
        {
            Drawcancel();
            this.HideArea();
        }
    }
    handleToggle(value) {
            if(value===2)
            {
                Drawcir();
            }
            else if(value===3)
            {
                Drawpol();
            }
            else if(value===4)
            {
                Drawrec();
            }
            else if(value===5)
            {
                Drawcancel();
                this.HideArea();
            }
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    };
    getMindep = (event) =>{
        this.setState({MinDepth:event.target.value});
    };
    getMaxdep = (event) =>{
        this.setState({MaxDepth:event.target.value});
    };
    getTarget = (event) =>{
      this.setState({TargetPort:event.target.value});
    };
    salert = () =>{
        this.setState({
            alert: (
                <SAlert
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        this.props.classes.button + " " + this.props.classes.success
                    }
                >
                    <h3>标注信息说明</h3>
                    <p align="left">1.<img src={require('../../assets/img/ship.svg')}></img>(高分辨率下)<img src={require('../../assets/img/rep.svg')}></img>(低分辨率下)代表航船，<img src={require('../../assets/img/port.svg')}></img>状代表港口</p>
                    <p align="left">2.货船的航线用<font color="red">红色</font>表示,油轮的航线用<font color="green">绿色</font>表示</p>
                    <p align="left">3.游轮的航线用<font color="yellow">黄色</font>表示,拖船的航线用<font color="black">黑色</font>表示</p>
                    <p align="left">(其余类型由于数量较少而且颜色类型不够所以统一用<font color="gray">灰色</font>表示)</p>
                </SAlert>
            )
        });
    };//img 的 src属性 当用webpack打包到服务器上的时候不能直接使用路径，会找不到，应该用require加路径的形式
    hcsx = () =>{//航船筛选
        if(ishcsx===false)
        {
            document.getElementById('HcMenu').style.display = "inline";
            document.getElementById('hcss').style.display = "none";
            document.getElementById('qxhcss').style.display = "inline";
            ishcsx=true;
            this.HideArea();
            this.qxsx();
        }
    };
    qxhcsx = () =>{//取消航船筛选
        if(ishcsx===true)
        {
            document.getElementById('HcMenu').style.display = "none";
            document.getElementById('hcss').style.display = "inline";
            document.getElementById('qxhcss').style.display = "none";
            ishcsx=false;
        }
    };
    cxsx = () =>{//船线筛选
        if(issx===false)
        {
            document.getElementById('cx').style.display = "none";
            document.getElementById('qx').style.display = "inline";
            document.getElementById('FC').style.display = "inline-table";
            document.getElementById('ST').style.display = "inline-table";

            document.getElementById('HxMenu').style.display = "inline";
            issx=true;
            this.qxhcsx();
            this.HideArea();
        }
    };
    qxsx = () =>{//取消船线筛选
        if(issx===true)
        {
            document.getElementById('cx').style.display = "inline";
            document.getElementById('qx').style.display = "none";
            document.getElementById('FC').style.display = "none";
            document.getElementById('ST').style.display = "none";

            document.getElementById('HxMenu').style.display = "none";
            issx=false;
        }
    };
    onDatesChange({ startDate, endDate }) {
        let start=moment(startDate, 'YYYY-DD-MM', true).format().substr(0, 10);
        let end=moment(endDate, 'YYYY-DD-MM', true).format().substr(0, 10);
        this.setState({ startDate, endDate });

        console.log(moment(startDate, 'YYYY-DD-MM', true).format().substr(0, 10));
        //this.props.DatesChanged({ startDate, endDate });
        var kind=this.state.type;
            //SearchRoute(start, end, kind);
    }

    onFocusChange(focusedInput) {//DateRangePicker 的一个调用函数
        this.setState({ focusedInput });
    }
    handleClick = () => {
        this.setState({ open: !this.state.open });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    GetSearchName=(event)=>{//搜索船名时用于获取输入的船名的
        this.setState({ShipName:event.target.value});
    };
    GetSearchNo=(event)=>{//搜索船名时用于获取输入的船名的
        this.setState({ShipNo:event.target.value});
    };
    ShowRoute=()=>//显示航线
    {
        if(isshow===false) {
            document.getElementById("show").style.display = "none";
            document.getElementById("hide").style.display = "inline";
            showroute();
            isshow=true;
        }
    };

    HideRoute=()=>//隐藏航线
    {
        if(isshow) {
            document.getElementById("show").style.display = "inline";
            document.getElementById("hide").style.display = "none";
            hideroute();
            isshow=false;
        }
    };
    MeasureDistance=()=>//测距
    {
        document.getElementById("Mea").style.display = "none";
        document.getElementById("CM").style.display = "inline";
        MeasureDis();
    };
    CancelMeasureDistance=()=>//取消测距
    {
        document.getElementById("Mea").style.display = "inline";
        document.getElementById("CM").style.display = "none";
        CancelMeasureDis();
    };

    handleSimple2 = event => {//获取用户选择的航船类型
        this.setState({ [event.target.name]: event.target.value });
        if(event.target.value==="11")
        {
            this.state.type='Cargo';
        }
        if(event.target.value==="12")
        {
            this.state.type='Passenger';
        }
        else if(event.target.value==="13")
        {
            this.state.type='Tanker';
        }
        else if(event.target.value==="14")
        {
            this.state.type='Vessel';
        }
        else if(event.target.value==="15")
        {
            this.state.type='Law Enforcement';
        }
        else if(event.target.value==="16")
        {
            this.state.type='Tug';
        }
        else if(event.target.value==="17")
        {
            this.state.type='Wing In Ground-effect';
        }
        else if(event.target.value==="18")
        {
            this.state.type='All';
        }
    };
    Decide = () =>{//确定筛选按钮函数
        var kind=this.state.type;
        let start=moment(this.state.startDate, 'YYYY-DD-MM', true).format().substr(0, 10);
        let end=moment(this.state.endDate, 'YYYY-DD-MM', true).format().substr(0, 10);
        let target=this.state.TargetPort;
        let min=this.state.MinDepth;
        let max=this.state.MaxDepth;
        if(start!="" && end!="" && kind!="") {
            SearchRoute(start, end, kind, target,min,max);
            //console.log(this.state.TargetPort,min,max);
            this.qxsx();
        }
        else
        alert("请将搜索信息填写完整！");
    };
    ShowArea = () =>{//区域定制二态按钮函数实现
        document.getElementById("AreaDraw").style.display = "inline";
        document.getElementById("Area").style.display = "none";
        document.getElementById("CancelArea").style.display = "inline";
        this.qxsx();
        this.qxhcsx();
    };
    HideArea = () =>{
        document.getElementById("AreaDraw").style.display = "none";
        document.getElementById("CancelArea").style.display = "none";
        document.getElementById("Area").style.display = "inline";
        Drawcancel();
    };
    handleLogout = () => {
        userActions.logout();
        history.push('/login');
    };
    render() {
        const { classes, rtlActive } = this.props;
        // const { open } = this.state;
        // const searchButton =
        //     classes.top +
        //     " " +
        //     classes.searchButton +
        //     " " +
        //     classNames({
        //         [classes.searchRTL]: rtlActive
        //     });
        // const dropdownItem =
        //     classes.dropdownItem +
        //     " " +
        //     classNames({
        //         [classes.dropdownItemRTL]: rtlActive
        //     });
        const wrapper = classNames({
            [classes.wrapperRTL]: rtlActive
        });
        // const managerClasses = classNames({
        //     [classes.managerClasses]: true
        // });
        return (
            <div className={wrapper}>
                {this.state.alert}

                    <GridContainer>
                        <ItemGrid xs={1.7}>
                            <IconButton
                                id="Area"
                                style={{marginRight:"20px",width: '78px',fontSize:'15px'}}
                                color="inherit"
                                aria-label="区域限定"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                onClick={this.ShowArea}
                            >
                                <RoundedCorner className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>区域限定 </p>
                            </IconButton>
                            <IconButton
                                id="CancelArea"
                                style={{marginRight:"20px",display:"none",width: '78px',fontSize:'15px'}}
                                color="inherit"
                                aria-label="取消限定"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                onClick={this.HideArea}

                            >
                                <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>取消限定 </p>
                            </IconButton>
                        </ItemGrid>
                        <ItemGrid xs={1.7}>
                            <IconButton
                                id="hide"
                                style={{marginRight:"20px",display:"none",width: '78px',fontSize:'15px'}}
                                color="inherit"
                                aria-label="隐藏航线"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                onClick={this.HideRoute}

                            >
                                <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>隐藏航线 </p>
                            </IconButton>

                            <IconButton
                                id="show"
                                style={{marginRight:"20px",width: '78px',fontSize:'15px'}}
                                color="inherit"
                                aria-label="显示航线"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                onClick={this.ShowRoute}
                            >
                                <Visibility className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>显示航线 </p>
                            </IconButton>
                        </ItemGrid>
                        <ItemGrid xs={1.7}>
                            <IconButton
                                id="Mea"
                                style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                                color="inherit"
                                aria-label="开始测距"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.MeasureDistance}
                            >
                                <Panorama className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>开始测距 </p>
                            </IconButton>

                            <IconButton
                                id="CM"
                                style={{width: '78px',marginRight:"10px",display:"none",fontSize:'15px'}}
                                color="inherit"
                                aria-label="取消测距"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.CancelMeasureDistance}
                            >
                                <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>取消测距 </p>
                            </IconButton>
                        </ItemGrid>
                        <ItemGrid xs={1.7}>
                            <IconButton
                                style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                                color="inherit"
                                aria-label="标注说明"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.salert}
                            >
                                <GolfCourse className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>标注说明 </p>
                            </IconButton>

                        </ItemGrid>
                        <ItemGrid xs={1.7}>
                            <IconButton
                                id="cx"
                                style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                                color="inherit"
                                aria-label="船线筛选"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.cxsx}
                            >
                                <Router className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>船线筛选 </p>
                            </IconButton>

                            <IconButton
                                id="qx"
                                style={{width: '78px',marginRight:"10px",display:'none',fontSize:'15px'}}
                                color="inherit"
                                aria-label="取消筛选"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.qxsx}
                            >
                                <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>取消筛选 </p>
                            </IconButton>
                        </ItemGrid>
                        <ItemGrid xs={1.7}>
                            <IconButton
                                id="hcss"
                                style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                                color="inherit"
                                aria-label="搜索航船"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.hcsx}
                            >
                                <Search className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>搜索航船 </p>
                            </IconButton>

                            <IconButton
                                id="qxhcss"
                                style={{width: '78px',marginRight:"10px",display:'none',fontSize:'15px'}}
                                color="inherit"
                                aria-label="取消搜索"
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                                onClick={this.qxhcsx}
                            >
                                <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                                <p className={classes.linkText}>取消搜索</p>
                            </IconButton>
                        </ItemGrid>
                        <ItemGrid xs={1.7}>
                            <Button
                                color="primary"
                                onClick={this.handleLogout}
                                style={{width: '150px',marginRight:"10px",fontSize:'15px'}}
                                aria-label={cookies.get('username')+"注销"}
                                className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                                classes={{
                                    label: rtlActive ? classes.labelRTL:""
                                }}
                            >
                                {cookies.get('username')}注销
                            </Button>
                        </ItemGrid>
                    </GridContainer>

                {/*<IconButton
                    id="Area"
                    style={{marginRight:"20px",width: '78px',fontSize:'15px'}}
                    color="inherit"
                    aria-label="区域限定"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    onClick={this.ShowArea}
                >
                    <RoundedCorner className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>区域限定 </p>
                </IconButton>

                <IconButton
                    id="CancelArea"
                    style={{marginRight:"20px",display:"none",width: '78px',fontSize:'15px'}}
                    color="inherit"
                    aria-label="取消限定"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    onClick={this.HideArea}

                >
                    <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>取消限定 </p>
                </IconButton>


                <IconButton
                    id="hide"
                    style={{marginRight:"20px",display:"none",width: '78px',fontSize:'15px'}}
                    color="inherit"
                    aria-label="隐藏航线"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    onClick={this.HideRoute}

                >
                    <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>隐藏航线 </p>
                </IconButton>

                <IconButton
                    id="show"
                    style={{marginRight:"20px",width: '78px',fontSize:'15px'}}
                    color="inherit"
                    aria-label="显示航线"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    onClick={this.ShowRoute}
                >
                    <Visibility className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>显示航线 </p>
                </IconButton>

                <IconButton
                    id="Mea"
                    style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                    color="inherit"
                    aria-label="开始测距"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.MeasureDistance}
                >
                    <Panorama className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>开始测距 </p>
                </IconButton>

                <IconButton
                    id="CM"
                    style={{width: '78px',marginRight:"10px",display:"none",fontSize:'15px'}}
                    color="inherit"
                    aria-label="取消测距"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.CancelMeasureDistance}
                >
                    <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>取消测距 </p>
                </IconButton>

                <IconButton
                    style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                    color="inherit"
                    aria-label="标注说明"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.salert}
                >
                    <GolfCourse className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>标注说明 </p>
                </IconButton>

                <IconButton
                    id="cx"
                    style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                    color="inherit"
                    aria-label="船线筛选"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.cxsx}
                >
                    <Router className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>船线筛选 </p>
                </IconButton>

                <IconButton
                    id="qx"
                    style={{width: '78px',marginRight:"10px",display:'none',fontSize:'15px'}}
                    color="inherit"
                    aria-label="取消筛选"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.qxsx}
                >
                    <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>取消筛选 </p>
                </IconButton>

                <IconButton
                    id="hcss"
                    style={{width: '78px',marginRight:"10px",fontSize:'15px'}}
                    color="inherit"
                    aria-label="搜索航船"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.hcsx}
                >
                    <Search className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>搜索航船 </p>
                </IconButton>

                <IconButton
                    id="qxhcss"
                    style={{width: '78px',marginRight:"10px",display:'none',fontSize:'15px'}}
                    color="inherit"
                    aria-label="取消搜索"
                    className={rtlActive ? classes.buttonLinkRTL:classes.buttonLink}
                    classes={{
                        label: rtlActive ? classes.labelRTL:""
                    }}
                    onClick={this.qxhcsx}
                >
                    <Undo className={rtlActive ? classes.links + " " + classes.linksRTL:classes.links} />
                    <p className={classes.linkText}>取消搜索</p>
                </IconButton>*/}

                    <div id='HxMenu' style={{display:'none'}}>
                        <ItemGrid xs={12} sm={12} md={6}>
                        <IconCard
                            icon={MailOutline}
                            iconColor="red"
                            title="船线筛选"
                            content={
                                <form>
                                    <DateRangePicker
                                        startDatePlaceholderText="开始日期"
                                        endDatePlaceholderText="截止日期"
                                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                        startDateId="开始日期" // PropTypes.string.isRequired,
                                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                        endDateId="截止日期" // PropTypes.string.isRequired,
                                        onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                        onFocusChange={this.onFocusChange} //
                                        isOutsideRange={() => false}
                                        small
                                    />
                                    <div>
                                    <FormControl
                                        id="ST"
                                        marginDense
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            id='FC'
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            <font size="2" color="gray">航船类型</font>
                                        </InputLabel>
                                        <Select

                                            style={{marginRight:"20px",width: '78px'}}
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={this.state.simpleSelect}
                                            onChange={this.handleSimple2}
                                            inputProps={{
                                                name: "simpleSelect",
                                                id: "simple-select"
                                            }}
                                        >
                                            <MenuItem
                                                disabled
                                                classes={{
                                                    root: classes.selectMenuItem
                                                }}
                                            >
                                                航船类型
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="11"
                                            >
                                                货船
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="12"
                                            >
                                                游轮
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="13"
                                            >
                                                油轮
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="14"
                                            >
                                                大木船
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="15"
                                            >
                                                渔政船
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="16"
                                            >
                                                拖船
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="17"
                                            >
                                                地效翼效应
                                            </MenuItem>
                                            <MenuItem
                                                classes={{
                                                    root: classes.selectMenuItem,
                                                    selected: classes.selectMenuItemSelected
                                                }}
                                                value="18"
                                            >
                                                所有
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    </div>
                                    <div>
                                        <GridContainer>
                                            <ItemGrid xs={12} sm={12} md={4}>
                                    <CustomInput
                                        rtlActive={rtlActive}
                                        formControlProps={{
                                            className: classes.top + " " + classes.search,
                                            fullWidth: false
                                        }}
                                        inputProps={{
                                            placeholder: "目的港口",
                                            inputProps: {
                                                onChange: event =>
                                                    this.getTarget(event),
                                                "aria-label": "目的港口",
                                                className: classes.searchInput
                                            }
                                        }}
                                    />
                                            </ItemGrid>
                                        </GridContainer>
                                        </div>
                                    <div>
                                        <GridContainer>
                                                <ItemGrid xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive={rtlActive}
                                            formControlProps={{
                                                className: classes.top + " " + classes.search,
                                                fullWidth: false
                                            }}
                                            inputProps={{
                                                placeholder: "最小吃水深度",
                                                inputProps: {
                                                    onChange: event =>
                                                        this.getMindep(event),
                                                    "aria-label": "最小吃水深度",
                                                    className: classes.searchInput
                                                }
                                            }}
                                        />
                                                </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={6}>
                                        <CustomInput
                                            rtlActive={rtlActive}
                                            formControlProps={{
                                                className: classes.top + " " + classes.search,
                                                fullWidth: false
                                            }}
                                            inputProps={{
                                                placeholder: "最大吃水深度",
                                                inputProps: {
                                                    onChange: event =>
                                                        this.getMaxdep(event),
                                                    "aria-label": "最大吃水深度",
                                                    className: classes.searchInput
                                                }
                                            }}
                                        />
                                            </ItemGrid>
                                        </GridContainer>
                                   </div>
                                    <div>
                                        <Button style={{color:"white"}} onClick={this.Decide}>确 定</Button>
                                    </div>
                                </form>
                            }
                    />
                        </ItemGrid>
                </div>


                <div id='HcMenu' style={{display:'none'}}>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <IconCard
                            icon={MailOutline}
                            iconColor="red"
                            title="搜索航船"
                            content={
                                <form>
                                    <CustomInput
                                        rtlActive={rtlActive}
                                        formControlProps={{
                                            className: classes.top + " " + classes.search
                                        }}
                                        inputProps={{
                                            placeholder: "请输入航船名",
                                            inputProps: {
                                                onChange: event =>
                                                    this.GetSearchName(event),
                                                "aria-label": "搜索航船名",
                                                className: classes.searchInput
                                            }
                                        }}
                                    />
                                    <CustomInput
                                        rtlActive={rtlActive}
                                        formControlProps={{
                                            className: classes.top + " " + classes.search
                                        }}
                                        inputProps={{
                                            placeholder: "请输入航船编号",
                                            inputProps: {
                                                onChange: event =>
                                                    this.GetSearchNo(event),
                                                "aria-label": "搜索航船编号",
                                                className: classes.searchInput
                                            }
                                        }}
                                    />
                                    <div>
                                    <Button
                                        style={{color:"rose"}}
                                        onClick={SearchShip.bind(this,this.state.ShipName,this.state.ShipNo)}
                                    >
                                        搜索
                                    </Button>
                                    </div>
                                </form>
                            }
                        />
                    </ItemGrid>
                </div>

                <div id='AreaDraw' style={{display:'none',top:'100px'}}>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <IconCard
                            icon={MailOutline}
                            iconColor="red"
                            title="区域定制"
                            content={
                                <form>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={this.state.selectedEnabled === "a"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="a"
                                                    name="radio button demo"
                                                    aria-label="A"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio
                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="圆形"
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            //disabled
                                            control={
                                                <Radio
                                                    checked={this.state.selectedEnabled === "b"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="b"
                                                    name="radio1 button enabled"
                                                    aria-label="B"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio,

                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="多边形"
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            //disabled
                                            control={
                                                <Radio
                                                    checked={this.state.selectedEnabled === "c"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="c"
                                                    name="radio2 button enabled"
                                                    aria-label=""
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio,

                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="矩形"
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.checkboxAndRadio +
                                            " " +
                                            classes.checkboxAndRadioHorizontal
                                        }
                                    >
                                        <FormControlLabel
                                            //disabled
                                            control={
                                                <Radio
                                                    checked={this.state.selectedEnabled === "d"}
                                                    onChange={this.handleChangeEnabled}
                                                    value="d"
                                                    name="radio3 button enabled"
                                                    aria-label="D"
                                                    icon={
                                                        <FiberManualRecord
                                                            className={classes.radioUnchecked}
                                                        />
                                                    }
                                                    checkedIcon={
                                                        <FiberManualRecord
                                                            className={classes.radioChecked}
                                                        />
                                                    }
                                                    classes={{
                                                        checked: classes.radio,

                                                    }}
                                                />
                                            }
                                            classes={{
                                                label: classes.label
                                            }}
                                            label="取消定制"
                                        />
                                    </div>

                                </form>
                            }
                        />
                    </ItemGrid>
                </div>
            </div>

        );
    }
}
HeaderLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool
};
export default withStyles(HeaderStyle)(HeaderLinks);
