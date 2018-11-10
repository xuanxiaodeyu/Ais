import Dashboard from "views/Dashboard/Dashboard.jsx";
import Buttons from "views/Components/Buttons.jsx";
import GridSystem from "views/Components/GridSystem.jsx";
import Panels from "views/Components/Panels.jsx";
import SweetAlert from "views/Components/SweetAlert.jsx";
import Notifications from "views/Components/Notifications.jsx";
import Icons from "views/Components/Icons.jsx";
import Typography from "views/Components/Typography.jsx";
import RegularForms from "views/Forms/RegularForms.jsx";
import ExtendedForms from "views/Forms/ExtendedForms.jsx";
import ValidationForms from "views/Forms/ValidationForms.jsx";
import Wizard from "views/Forms/Wizard.jsx";
import RegularTables from "views/Tables/RegularTables.jsx";
import ExtendedTables from "views/Tables/ExtendedTables.jsx";
import ReactTables from "views/Tables/ReactTables.jsx";
import GoogleMaps from "views/Maps/GoogleMaps.jsx";
import FullScreenMap from "views/Maps/FullScreenMap.jsx";
import VectorMap from "views/Maps/VectorMap.jsx";
import Charts from "views/Charts/Charts.jsx";
import Calendar from "views/Calendar/Calendar.jsx";
import Widgets from "views/Widgets/Widgets.jsx";
import UserProfile from "views/Pages/UserProfile.jsx";
import TimelinePage from "views/Pages/Timeline.jsx";
import RTLSupport from "views/Pages/RTLSupport.jsx";
import gkhwttl from "views/gkhwttl/gkhwttl.jsx";
import gkhwttl_nh from "views/gkhwttl_nh/gkhwttl_nh.jsx";
import jzxttl from "views/jzxttl/jzxttl.jsx";
import jzxttl_nh from "views/jzxttl_nh/jzxttl_nh.jsx";
import dckbsl from "views/dckbsl/dckbsl.jsx";
import yhgkmtkbnl_max_bw from "views/yhgkmtkbnl_max_bw/yhgkmtkbnl_max_bw.jsx";
import yhgkmtkbnl_max_bw_nh from "views/yhgkmtkbnl_max_bw_nh/yhgkmtkbnl_max_bw_nh.jsx";
import bmaxttl from "views/bmaxttl/bmaxttl.jsx";
import bmaxttl_nh from "views/bmaxttl_nh/bmaxttl_nh.jsx";
import mtnlsyd from "views/mtnlsyd/mtnlsyd.jsx";
import mtnlsyd_nh from "views/mtnlsyd_nh/mtnlsyd_nh.jsx";
import cbzgpjts from "views/cbzgpjts/cbzgpjts.jsx";
import ddsr from "views/ddsr/ddsr.jsx";
import ddsr_nh from "views/ddsr_nh/ddsr_nh.jsx";
import lsgkdj from "views/lsgkdj/lsgkdj.jsx";
import lsgkdj_nh from "views/lsgkdj_nh/lsgkdj_nh.jsx";
import qwdttlswrs from "views/qwdttlswrs/qwdttlswrs.jsx";
import qwdttlswrs_nh from "views/qwdttlswrs_nh/qwdttlswrs_nh.jsx";
import gkjxzdf from "views/gkjxzdf/gkjxzdf.jsx";
import gkjxzdf_nh from "views/gkjxzdf_nh/gkjxzdf_nh.jsx";
import DataManage from "views/DataManage/DataManage.jsx";
import DataManage_nh from "views/DataManage_nh/DataManage_nh.jsx";

//import pagesRoutes from "./pages.jsx";

// material-ui-icons
import DashboardIcon from "material-ui-icons/Dashboard";
import Image from "material-ui-icons/Image";
import Apps from "material-ui-icons/Apps";
import ContentPaste from "material-ui-icons/ContentPaste";
import GridOn from "material-ui-icons/GridOn";
import Place from "material-ui-icons/Place";
import WidgetsIcon from "material-ui-icons/Widgets";
import Timeline from "material-ui-icons/Timeline";
import DateRange from "material-ui-icons/DateRange";


var dashRoutesNormal = [
  {
    collapse: true,
    path: "/harbourscore/yh",
    name: "沿海港口绩效",
    state: "openComponents",
    icon: Place,
    views: [
      {
          path: "/harbourscore/yh/gkjxzdf",
          name: "绩效总体评价",
          mini: "",
          component: gkjxzdf
      },
      {
        path: "/harbourscore/yh/gkhwttl",
        name: "港口货物吞吐量",
        mini: "",
        component: gkhwttl
      },
      {
        path: "/harbourscore/yh/gkjzxttl",
        name: "港口集装箱吞吐量",
        mini: "",
        component: jzxttl
      },
        {
            path: "/harbourscore/yh/yhgkmtkbnl_max_bw",
            name: "码头靠泊能力",
            mini: "",
            component: yhgkmtkbnl_max_bw
        },
        {
            path: "/harbourscore/yh/dckbsl",
            name: "港口连通性",
            mini: "",
            component: dckbsl
        },
        {
            path: "/harbourscore/yh/bmaxttl",
            name: "港口岸线利用率",
            mini: "",
            component: bmaxttl
        },
        {
            path: "/harbourscore/yh/mtnlsyd",
            name: "港口通过能力适应度",
            mini: "",
            component: mtnlsyd
        },
        {
            path: "/harbourscore/yh/cbzgpjts",
            name: "港口作业效率",
            mini: "",
            component: cbzgpjts
        },
        {
            path: "/harbourscore/yh/ddsr",
            name: "港口经济贡献",
            mini: "",
            component: ddsr
        },
        {
            path: "/harbourscore/yh/lsgkdj",
            name: "绿色港口等级",
            mini: "",
            component: lsgkdj
        },
        {
            path: "/harbourscore/yh/qwdttlswrs",
            name: "港口安全生产水平",
            mini: "",
            component: qwdttlswrs
        }
    ]
  },
  {
      collapse: true,
      path: "/harbourscore/nh",
      name: "内河港口绩效",
      state: "openTables",
      icon: Timeline,
      views: [
          {
              path: "/harbourscore/nh/gkjxzdf",
              name: "绩效总体评价",
              mini: "",
              component: gkjxzdf_nh
          },
          {
              path: "/harbourscore/nh/gkhwttl",
              name: "港口货物吞吐量",
              mini: "",
              component: gkhwttl_nh
          },
          {
              path: "/harbourscore/nh/gkjzxttl",
              name: "港口集装箱吞吐量",
              mini: "",
              component: jzxttl_nh
          },
          {
              path: "/harbourscore/nh/yhgkmtkbnl_max_bw",
              name: "码头靠泊能力",
              mini: "",
              component: yhgkmtkbnl_max_bw_nh
          },
          {
              path: "/harbourscore/nh/bmaxttl",
              name: "港口岸线利用率",
              mini: "",
              component: bmaxttl_nh
          },
          {
              path: "/harbourscore/nh/mtnlsyd",
              name: "港口通过能力适应度",
              mini: "",
              component: mtnlsyd_nh
          },
          {
              path: "/harbourscore/nh/ddsr",
              name: "港口经济贡献",
              mini: "",
              component: ddsr_nh
          },
          {
              path: "/harbourscore/nh/lsgkdj",
              name: "绿色港口等级",
              mini: "",
              component: lsgkdj_nh
          },
          {
              path: "/harbourscore/nh/qwdttlswrs",
              name: "港口安全生产水平",
              mini: "",
              component: qwdttlswrs_nh
          }
      ]
  },
    {
        collapse: true,
        path: "/harbourscore/datamanage",
        name: "数据管理",
        state: "openMaps",
        icon: GridOn,
        views: [
            {
                path: "/harbourscore/datamanage/yanhai",
                name: "沿海数据管理",
                mini: "",
                component: DataManage
            },
            {
                path: "/harbourscore/datamanage/neihe",
                name: "内河数据管理",
                mini: "",
                component: DataManage_nh
            }
        ]
    },
  { redirect: true, path: "/", pathTo: "/harbourscore/yh/gkjxzdf", name: "港口绩效总得分" }
];

var dashRoutesGuest = [
    {
        collapse: true,
        path: "/harbourscore/yh",
        name: "沿海港口绩效",
        state: "openComponents",
        icon: Place,
        views: [
            {
                path: "/harbourscore/yh/gkjxzdf",
                name: "绩效总体评价",
                mini: "",
                component: gkjxzdf
            },
            {
                path: "/harbourscore/yh/gkhwttl",
                name: "港口货物吞吐量",
                mini: "",
                component: gkhwttl
            },
            {
                path: "/harbourscore/yh/gkjzxttl",
                name: "港口集装箱吞吐量",
                mini: "",
                component: jzxttl
            },
            {
                path: "/harbourscore/yh/yhgkmtkbnl_max_bw",
                name: "码头靠泊能力",
                mini: "",
                component: yhgkmtkbnl_max_bw
            },
            {
                path: "/harbourscore/yh/dckbsl",
                name: "港口连通性",
                mini: "",
                component: dckbsl
            },
            {
                path: "/harbourscore/yh/bmaxttl",
                name: "港口岸线利用率",
                mini: "",
                component: bmaxttl
            },
            {
                path: "/harbourscore/yh/mtnlsyd",
                name: "港口通过能力适应度",
                mini: "",
                component: mtnlsyd
            },
            {
                path: "/harbourscore/yh/cbzgpjts",
                name: "港口作业效率",
                mini: "",
                component: cbzgpjts
            },
            {
                path: "/harbourscore/yh/ddsr",
                name: "港口经济贡献",
                mini: "",
                component: ddsr
            },
            {
                path: "/harbourscore/yh/lsgkdj",
                name: "绿色港口等级",
                mini: "",
                component: lsgkdj
            },
            {
                path: "/harbourscore/yh/qwdttlswrs",
                name: "港口安全生产水平",
                mini: "",
                component: qwdttlswrs
            }
        ]
    },
    {
        collapse: true,
        path: "/harbourscore/nh",
        name: "内河港口绩效",
        state: "openTables",
        icon: Timeline,
        views: [
            {
                path: "/harbourscore/nh/gkjxzdf",
                name: "绩效总体评价",
                mini: "",
                component: gkjxzdf_nh
            },
            {
                path: "/harbourscore/nh/gkhwttl",
                name: "港口货物吞吐量",
                mini: "",
                component: gkhwttl_nh
            },
            {
                path: "/harbourscore/nh/gkjzxttl",
                name: "港口集装箱吞吐量",
                mini: "",
                component: jzxttl_nh
            },
            {
                path: "/harbourscore/nh/yhgkmtkbnl_max_bw",
                name: "码头靠泊能力",
                mini: "",
                component: yhgkmtkbnl_max_bw_nh
            },
            {
                path: "/harbourscore/nh/bmaxttl",
                name: "港口岸线利用率",
                mini: "",
                component: bmaxttl_nh
            },
            {
                path: "/harbourscore/nh/mtnlsyd",
                name: "港口通过能力适应度",
                mini: "",
                component: mtnlsyd_nh
            },
            {
                path: "/harbourscore/nh/ddsr",
                name: "港口经济贡献",
                mini: "",
                component: ddsr_nh
            },
            {
                path: "/harbourscore/nh/lsgkdj",
                name: "绿色港口等级",
                mini: "",
                component: lsgkdj_nh
            },
            {
                path: "/harbourscore/nh/qwdttlswrs",
                name: "港口安全生产水平",
                mini: "",
                component: qwdttlswrs_nh
            }
        ]
    },
    { redirect: true, path: "/", pathTo: "/harbourscore/yh/gkjxzdf", name: "港口绩效总得分" }
];

export {dashRoutesGuest, dashRoutesNormal};
