// material-ui-icons
import ContentPaste from "material-ui-icons/ContentPaste";
import Notifications from "material-ui-icons/Notifications";
import Sort from "material-ui-icons/Sort";
import DirectionsBoat from "material-ui-icons/DirectionsBoat";


import DashboardPage from "views/LeakageOverview/Dashboard.jsx";
import Maps from 'views/MonitoringInfo/Maps/Maps.jsx';

var dashboardRoute2 = [
    {
        path: "/harbourmap/ship",
        name: "船舶航线",
        icon: DirectionsBoat,
        component: Maps
    },
    {
        path: "/harbourmap/monitor",
        name: "我的定制",
        icon: Sort,
        component: Maps
    },
    {
        path: "/harbourmap/notification",
        name: "区域提醒",
        icon: Notifications,
        component: Maps
    },
    {
        path: "/harbourmap/statistics",
        name: "统计信息",
        icon: ContentPaste,
        component: DashboardPage
    },
    { redirect: true, path: "/", pathTo: "/harbourmap/ship", name: "港口绩效总得分" }
];
export default dashboardRoute2;
