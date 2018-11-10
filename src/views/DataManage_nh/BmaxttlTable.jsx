import React from 'react';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Reactables, Header } from 'gigatables-react';
//import Reactables from '../../../reactables-master/src/Reactables.jsx';
//import Header from '../../../reactables-master/src/components/table/Header';
import 'gigatables-react/main.css';
import { userService } from '_services';
import { userActions} from "../../_actions";
import {cookies} from '../../variables/general';

let editor = {
  ajax: {
      create: {
          url: '/bmaxttl_nh',
          type: 'POST',
      },
      edit: {
          url: '/bmaxttl_nh',
          type: 'PUT',
      },
      delete: {
          url: '/bmaxttl_nh',
          type: 'DELETE',
      },
  },
  //ajaxFiles: 'http://gigatables.loc/uploadFiles.php',
  struct: {
      buttons: ['top', 'bottom'] // buttons
  },
  fields: [
      {
          label: "年:",
          name: "year",
          type: 'text',
          //value: '2000'
      },
      {
          label: "港口:",
          name: "gk",
          type: 'select',
          values: [],
          defaultValue: '泸州港',
      },
      {
          label: "港口货物吞吐量:",
          name: "gkhwttl",
          type: 'text',
      },
      {
        label: "码头岸线长度:",
        name: "mtaxcd",
        type: 'text',
      },
  ]
};

let settings = {
  struct: {
    search: ['top', 'bottom'],
    rowsSelector: ['asc', 'top', 'bottom'],
    pagination: ['top', 'bottom'],
    fixedHeader: true, // default false
    editableCells: false, // default false
  },
  lang: 'ch', // english default
  perPageRows: [25, 50, 100, 200, 500],
  defaultPerPage: 50,
  ajax: '/get_table_bmaxttl_nh?user=test',
    //ajax: '/get_table_bmaxttl?user='+userActions.currentUsername.prop,
  requestType: 'GET',
  columns: [
    {
      data: "year",
      sortable: true,
      searchable: true
    },
    {
      data: "gk",
      sortable: true,
      searchable: true
    },
    {
      data: "gkhwttl",
      sortable: true,
      searchable: true
    },
    {
      data: "mtaxcd",
      sortable: true,
      searchable: true
    },
    {
      data: "bmmtaxttl",
      sortable: true,
      searchable: true
    },
    {
      data: "metric",
      sortable: true,
      searchable: true
    },
  ],
  columnOpts: [
    {
      render: function (data, row, type) {
        return '<div><form method="post" class="accForm" action=""><input type="hidden" name="action" value="forms" /><input type="hidden" name="id" value="' + row.id + '" /><div>' + data + '</div></form></div>';
      },
      target: 2
    },
    {
      render: function (data, row, type) {
        return '<div><form method="post" class="accForm" action=""><input type="hidden" name="action" value="forms" /><input type="hidden" name="id" value="' + row.id + '" /><div>' + data + '</div></form></div>';
      },
      target: 3
    }
  ],
  tableOpts: {
    buttons: [
      {extended: "editor_create", editor: editor, triggerAfter: (function () {
          
        }), triggerBefore: (function () {

        })},
      {extended: "editor_edit", editor: editor},
      {extended: "editor_remove", editor: editor, triggerAfter: (function () {

          })}
    ],
    buttonsPosition: ['top', 'bottom'],
    theme: 'std'
  }
 };


class BmaxttlTable extends React.Component {
    componentWillMount() {
        //console.log(cookies.get('username'));
        settings.ajax = '/get_table_bmaxttl_nh?user='+cookies.get('username');
        userService.get_editor_gk(cookies.get('username'))
            .then(
                gk => {
                    let gks = [];
                    gk.map((currentValue ,index) => {
                        let o = {};
                        o[currentValue] = currentValue;
                        gks.push(o);
                    });
                    editor.fields[1].values = gks;
                    editor.fields[1].defaultValue = (Object.keys(gks[0]))[0];
                })
    }
  render() {
    return (
      <Reactables editor={editor} settings={settings}>
        <Header data="year">年</Header>
        <Header data="gk">港口</Header>
        <Header data="gkhwttl">港口货物吞吐量<br/>重量（万吨）</Header>
        <Header data="mtaxcd">码头岸线长度<br/>长度（米）</Header>
        <Header data="百米码头岸线吞吐量">集装箱吞吐量<br/>吞吐量（万吨/百米）</Header>
        <Header data="metric">指标值</Header>
      </Reactables>
    );
  }
}

export default BmaxttlTable;