import { authHeader } from '../_helpers/auth-header.js';

export const userService = {
    login,
    logout,
    register,
    get_stat,
    get_gkjxzdf,
    get_gkjxzdf_nh,
    get_gkjxzdf_year,
    get_gkjxzdf_nh_year,
    get_gkjxzdf_gk,
    get_gkjxzdf_nh_gk,
    get_qwdttlswrs,
    get_qwdttlswrs_nh,
    get_qwdttlswrs_year,
    get_qwdttlswrs_nh_year,
    get_qwdttlswrs_gk,
    get_qwdttlswrs_nh_gk,
    get_qwdttlswrs_jxsp,
    get_qwdttlswrs_nh_jxsp,
    get_ddsr,
    get_ddsr_nh,
    get_ddsr_year,
    get_ddsr_nh_year,
    get_ddsr_gk,
    get_ddsr_nh_gk,
    get_ddsr_jxsp,
    get_ddsr_nh_jxsp,
    get_overall_metric_rank,
    get_overall_metric_rank_nh,
    get_overall_metric_for_order,
    get_overall_metric_nh_for_order,
    get_overall_metric_for_trend,
    get_overall_metric_nh_for_trend,
    get_lsgkdj,
    get_lsgkdj_nh,
    get_lsgkdj_year,
    get_lsgkdj_nh_year,
    get_lsgkdj_gk,
    get_lsgkdj_nh_gk,
    get_lsgkdj_jxsp,
    get_lsgkdj_nh_jxsp,
    get_mtnlsyd_year,
    get_mtnlsyd_nh_year,
    get_mtnlsyd,
    get_mtnlsyd_nh,
    get_mtnlsyd_gk,
    get_mtnlsyd_nh_gk,
    get_mtnlsyd_jxsp,
    get_mtnlsyd_nh_jxsp,
    get_mtnlsyd_metric,
    get_mtnlsyd_nh_metric,
    get_yhgkjxpjldt,
    get_yhgkhwttl,
    get_gkhwttl_nh,
    get_yhgkhwttl_year,
    get_gkhwttl_nh_year,
    get_yhgkhwttl_gk,
    get_gkhwttl_nh_gk,
    get_yhgkhwttl_jxsp,
    get_gkhwttl_nh_jxsp,
    get_cbzgpjts,
    get_cbzgpjts_year,
    get_cbzgpjts_gk,
    get_cbzgpjts_jxsp,
    get_dckbsl,
    get_dckbsl_year,
    get_dckbsl_gk,
    get_dckbsl_nh_gk,
    get_dckbsl_jxsp,
    get_jzxttl,
    get_jzxttl_nh,
    get_jzxttl_year,
    get_jzxttl_nh_year,
    get_jzxttl_gk,
    get_jzxttl_nh_gk,
    get_jzxttl_jxsp,
    get_jzxttl_nh_jxsp,
    get_bmaxttl_total_metric,
    get_bmaxttl_nh_total_metric,
    get_bmaxttl_jzx_metric,
    get_bmaxttl_f_jzx_metric,
    get_bmaxttl_year,
    get_bmaxttl_nh_year,
    get_bmaxttl_gk,
    get_bmaxttl_nh_gk,
    get_bmaxttl_jxsp,
    get_bmaxttl_nh_jxsp,
    get_gkmtkbnl_nh_gk,
    get_gkmtkbnl_nh_jxsp,
    get_yhgkmtkbnl_max_bw_year,
    get_gkmtkbnl_nh_max_bw_year,
    get_yhgkmtkbnl_max_bw,
    get_gkmtkbnl_nh_max_bw,
    get_yhgkmtkbnl_syx,
    get_gkmtkbnl_nh_syx,
    getAll,
    getById,
    update,
    delete: _delete,
    get_bmaxttl_zbwcd,
    updateRadar,
    get_editor_gk,
    //Ais
    filter_RS,getRouteData,DbInsert,Dbfindport,getData,getRoutes,analyseRoutes,getPorts,RefreshRoutes,getShips
};



function get_editor_gk(username){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    };
    return fetch('/get_editor_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch('/login', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {
            // login successful if there's a jwt token in the response
            //
            let error = "用户名或密码错误";
            if (loginResult.success) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(loginResult.user));
                return loginResult.user;
            }
            else 
                return error;
            //return user;
        });
}

function updateRadar() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/update_radar', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        });
}

function get_lsgkdj_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/lsgkdj_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.lsgkdj_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
    }


function get_lsgkdj_nh_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/lsgkdj_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.lsgkdj_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_lsgkdj(year) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year })
        };
        return fetch('/lsgkdj_chart', requestOptions)
            .then(response => {

                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(loginResult => {

                if (loginResult.success) {
                    return loginResult.lsgkdj;
                }
                else
                {
                    //FIXME: deal with fail situation
                }
            });
}

function get_lsgkdj_nh(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/lsgkdj_nh_chart', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.lsgkdj;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_stat(viewStat) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ viewStat })
    };
    return fetch('/viewStat', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.viewStat;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
function get_gkjxzdf_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkjxzdf_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.gkjxzdf_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}
function get_gkjxzdf_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkjxzdf_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.gkjxzdf_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkjxzdf_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkjxzdf_year', requestOptions)
        .then(response => {

            console.log(response)
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {
            console.log(Result);
            if (Result.success) {
                return Result.gkjxzdf_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkjxzdf_nh_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkjxzdf_nh_year', requestOptions)
        .then(response => {

            console.log(response)
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {
            console.log(Result);
            if (Result.success) {
                return Result.gkjxzdf_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_gkjxzdf(year,gk) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year,gk })
        };
        return fetch('/gkjxzdf', requestOptions)
            .then(response => {

                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(Result => {


                if (Result.success) {
                    let metric = Result.gkjxzdf.overall_metric;
                    Result.gkjxzdf.overall_metric = metric.toFixed(2);
                    return Result.gkjxzdf;
                }
                else
                {
                    //FIXME: deal with fail situation
                }
            });
}

function get_gkjxzdf_nh(year,gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year,gk })
    };
    return fetch('/gkjxzdf_nh', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {


            if (Result.success) {
                let metric = Result.gkjxzdf.overall_metric;
                Result.gkjxzdf.overall_metric = metric.toFixed(2);
                return Result.gkjxzdf;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_qwdttlswrs_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/qwdttlswrs_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.qwdttlswrs_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
    }


function get_qwdttlswrs_nh_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/qwdttlswrs_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.qwdttlswrs_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_qwdttlswrs(year) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year })
        };
        return fetch('/qwdttlswrs_chart', requestOptions)
            .then(response => {

                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(loginResult => {
                console.log(loginResult);
                if (loginResult.success) {
                    return loginResult.metric;
                }
                else
                {
                    //FIXME: deal with fail situation
                }
            });
}

function get_qwdttlswrs_nh(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/qwdttlswrs_nh_chart', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {
            console.log(loginResult);
            if (loginResult.success) {
                return loginResult.metric;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_overall_metric_rank(year,gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year,gk })
    };
    return fetch('/overall_metric_rank', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {
            if (loginResult.success) {
                return loginResult.rank[0];
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_overall_metric_rank_nh(year,gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year,gk })
    };
    return fetch('/overall_metric_rank_nh', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {
            if (loginResult.success) {
                return loginResult.rank[0];
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_overall_metric_for_order(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/overall_metric_for_order', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.overall_metric_for_order;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_overall_metric_nh_for_order(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/overall_metric_nh_for_order', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.overall_metric_for_order;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_overall_metric_for_trend(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/overall_metric_for_trend', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.overall_metric_for_trend;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
function get_overall_metric_nh_for_trend(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/overall_metric_nh_for_trend', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.overall_metric_for_trend;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
function get_ddsr_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/ddsr_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.ddsr_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
    }

function get_ddsr_nh_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/ddsr_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.ddsr_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_ddsr(year) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year })
        };
        return fetch('/ddsr_chart', requestOptions)
            .then(response => {

                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(loginResult => {

                if (loginResult.success) {
                    return loginResult.ddsr;
                }
                else
                {
                    //FIXME: deal with fail situation
                }
            });
}


function get_ddsr_nh(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/ddsr_nh_chart', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.ddsr;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_cbzgpjts_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/cbzgpjts_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.cbzgpjts_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
    }

function get_cbzgpjts(year) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year })
        };
        return fetch('/cbzgpjts_chart', requestOptions)
            .then(response => {

                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(loginResult => {

                if (loginResult.success) {
                    return loginResult.jqpjqdts;
                }
                else
                {
                    //FIXME: deal with fail situation
                }
            });
}

//根据港口名称查询“港口绩效评价雷达图”所需的数据
function get_yhgkjxpjldt(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/yhgkjxpjldt', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {
            if (loginResult.success) {
                // store yhgkjxpjldt in local storage for drawing radar chart
                localStorage.setItem('yhgkjxpjldt', JSON.stringify(loginResult.yhgkjxpjldt));
            }
            return loginResult.yhgkjxpjldt;
        });
}

//根据“年” 查询“港口货物吞吐量排名”柱状图所需的货物吞吐量数据
function get_yhgkhwttl(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/yhgkhwttl', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.yhgkhwttl;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_gkhwttl_nh(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/gkhwttl_nh', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.yhgkhwttl;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}




function get_yhgkhwttl_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/yhgkhwttl_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkhwttl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkhwttl_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkhwttl_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkhwttl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}



//根据“港口” 查询“港口货物吞吐量绩效水平”折线图所需的货物吞吐量数据
function get_yhgkhwttl_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/yhgkhwttl_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.gkhwttl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkhwttl_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/gkhwttl_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.gkhwttl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}











//根据查询“港口货物吞吐量排名”柱状图所需的年份数据
function get_yhgkhwttl_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/yhgkhwttl_year', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkhwttl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}



function get_gkhwttl_nh_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkhwttl_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkhwttl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_jzxttl_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/jzxttl_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.jzxttl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_jzxttl_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/jzxttl_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.jzxttl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


//根据“港口” 查询“港口集装箱吞吐量绩效水平”折线图所需的集装箱吞吐量数据
function get_jzxttl_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/jzxttl_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.jzxttl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_jzxttl_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/jzxttl_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.jzxttl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_gkmtkbnl_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/gkmtkbnl_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.gkmtkbnl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

//根据“年” 查询“港口集装箱吞吐量排名”柱状图所需的数据
function get_jzxttl(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/jzxttl_chart', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.jzxttl;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_jzxttl_nh(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/jzxttl_nh_chart', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.jzxttl;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

//根据查询“最大靠泊能力排名”柱状图所需的年份数据 
function get_yhgkmtkbnl_max_bw_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/yhgkmtkbnl_max_bw_year', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkmtkbnl_max_bw_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkmtkbnl_nh_max_bw_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkmtkbnl_nh_max_bw_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkmtkbnl_max_bw_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
//根据“年” 查询“最大靠泊能力排名”柱状图所需的数据
function get_yhgkmtkbnl_max_bw(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/yhgkmtkbnl_max_bw', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkmtkbnl_max_bw;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_gkmtkbnl_nh_max_bw(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/gkmtkbnl_nh_max_bw', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkmtkbnl_max_bw;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
function get_yhgkmtkbnl_syx(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/yhgkmtkbnl_syx', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkmtkbnl_syx;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkmtkbnl_nh_syx(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/gkmtkbnl_nh_syx', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.yhgkmtkbnl_syx;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
//根据查询“百米岸线吞吐量”柱状图所需的年份数据 
function get_bmaxttl_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/bmaxttl_year', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}




function get_bmaxttl_nh_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/bmaxttl_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

//根据“年” 查询“百米岸线吞吐量总体指标”柱状图所需的数据
function get_bmaxttl_total_metric(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/bmaxttl_total_metric', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_total_metric;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_bmaxttl_nh_total_metric(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/bmaxttl_nh_total_metric', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_total_metric;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

//根据“年” 查询“百米岸线吞吐量非集装箱指标”柱状图所需的数据
function get_bmaxttl_f_jzx_metric(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/bmaxttl_f_jzx_metric', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {





            if (Result.success) {
                return Result.f_bmaxttl_jzx_metric;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

//根据“年” 查询“百米岸线吞吐量集装箱指标”柱状图所需的数据
function get_bmaxttl_jzx_metric(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/bmaxttl_jzx_metric', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_jzx_metric;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_mtnlsyd_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/mtnlsyd_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.mtnlsyd_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
    }


function get_mtnlsyd_nh_year() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/mtnlsyd_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.mtnlsyd_year;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_mtnlsyd(year) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ year })
        };
        return fetch('/mtnlsyd', requestOptions)
            .then(response => {

                if (!response.ok) { 
                    return Promise.reject(response.statusText);
                }
    
                return response.json();
            })
            .then(loginResult => {

                if (loginResult.success) {
                    return loginResult.mtnlsyd;
                }
                else
                {
                    //FIXME: deal with fail situation
                }
            });
}


function get_mtnlsyd_nh(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/mtnlsyd_nh', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.mtnlsyd;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_mtnlsyd_metric(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/mtnlsyd_metric', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.mtnlsyd_metric;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_mtnlsyd_nh_metric(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/mtnlsyd_nh_metric', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.mtnlsyd_metric;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

    //根据查询“港口连通性排名”柱状图所需的年份数据
function get_dckbsl_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/dckbsl_year', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.dckbsl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
//根据“年” 查询“港口连通性排名”柱状图所需的货物吞吐量数据
function get_dckbsl(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year })
    };
    return fetch('/dckbsl_chart', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.dckbsl;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

//根据查询“港口集装箱吞吐量排名”柱状图所需的年份数据
function get_jzxttl_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/jzxttl_year', requestOptions)
        .then(response => {

            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.jzxttl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_jzxttl_nh_year(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/jzxttl_nh_year', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.jzxttl_year;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/register', requestOptions)
        .then(response => {
            if(!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        }).then(loginResult => {
            let error = "用戶名已存在";
            if(loginResult.success) {
                return true;
            } else {
                return error;
            }
        })
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}

function get_bmaxttl_zbwcd(year) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({year})
    };

    return fetch('/bmaxttl_zbwcd', requestOptions)
        .then(response => {
            if(!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        });
}















function get_dckbsl_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/dckbsl_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.dckbsl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_dckbsl_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/dckbsl_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.dckbsl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_dckbsl_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/dckbsl_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.dckbsl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}







function get_bmaxttl_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/bmaxttl_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}



function get_bmaxttl_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/bmaxttl_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.bmaxttl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_gkmtkbnl_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/gkmtkbnl_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.gkmtkbnl_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_bmaxttl_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/bmaxttl_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.bmaxttl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}



function get_bmaxttl_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/bmaxttl_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.bmaxttl_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}







function get_mtnlsyd_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/mtnlsyd_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.mtnlsyd_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_mtnlsyd_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/mtnlsyd_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.mtnlsyd_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_mtnlsyd_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/mtnlsyd_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.mtnlsyd_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_mtnlsyd_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/mtnlsyd_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.mtnlsyd_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}






function get_cbzgpjts_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/cbzgpjts_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.cbzgpjts_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_cbzgpjts_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/cbzgpjts_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.cbzgpjts_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}







function get_ddsr_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/ddsr_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.ddsr_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_ddsr_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/ddsr_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.ddsr_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_ddsr_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/ddsr_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.ddsr_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}


function get_ddsr_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/ddsr_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.ddsr_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}







function get_lsgkdj_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/lsgkdj_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.lsgkdj_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_lsgkdj_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/lsgkdj_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.lsgkdj_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_lsgkdj_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/lsgkdj_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.lsgkdj_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_lsgkdj_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/lsgkdj_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.lsgkdj_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}







function get_qwdttlswrs_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/qwdttlswrs_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.qwdttlswrs_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}


function get_qwdttlswrs_nh_gk() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/qwdttlswrs_nh_gk', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(Result => {

            if (Result.success) {
                return Result.qwdttlswrs_gk;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function get_qwdttlswrs_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/qwdttlswrs_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.qwdttlswrs_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}

function get_qwdttlswrs_nh_jxsp(gk) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gk })
    };
    return fetch('/qwdttlswrs_nh_jxsp', requestOptions)
        .then(response => {

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(loginResult => {

            if (loginResult.success) {
                return loginResult.qwdttlswrs_jxsp;
            }
            else
            {
                //FIXME: deal with fail situation
            }
        });
}



//Ais
function RefreshRoutes() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/RefreshRoutes', requestOptions)
        .then(response => {
            //console.log("res"+response);
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log("result"+Result);
            return Result;
        });
}

function getPorts() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/getPorts', requestOptions)
        .then(response => {
            //console.log("res"+response);
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log("result"+Result);
            return Result;
        });
}

function analyseRoutes() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/analyseRoutes', requestOptions)
        .then(response => {
            //console.log("res"+response);
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log("result"+Result);
            return Result;
        });
}

function getRoutes() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/getRoutes', requestOptions)
        .then(response => {
            //console.log("res"+response);
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log("result"+Result);
            return Result;
        });
}
function getData() {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/getdata', requestOptions)
        .then(response => {
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log(Result.ShipName);
            if (Result.success) {
                return Result.features;
            }
            else {
                //FIXME: deal with fail situation
            }
        });

}
function Dbfindport(ID) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({ ID })
    };
    return fetch('/findport', requestOptions)
        .then(response => {
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log(Result.ShipName);
            if (Result.success) {
                return Result.features;
            }
            else {
                //FIXME: deal with fail situation
            }
        });

}

function DbInsert() {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch('/test', requestOptions)
        .then(response => {
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log(Result.ShipName);
            if (Result.success) {
                return Result.features;
            }
            else {
                //FIXME: deal with fail situation
            }
        });

}

function filter_RS(start_data,end_data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({ start_data,end_data })
    };
    return fetch('/filter_Route_Ship', requestOptions)
        .then(response => {
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log(Result.ShipName);
            if (Result.success) {
                return Result.features;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function getRouteData() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch('/getRouteData', requestOptions)
        .then(response => {
            //console.log(`lsgkdj_year response from expressApp is: ${response.ok}`);
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(Result => {
            //console.log(Result.ShipName);
            if (Result.success) {
                return Result.features;
            }
            else {
                //FIXME: deal with fail situation
            }
        });
}

function getShips() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch('/getShips', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            console.log(response);
            return response.json();
        })
        .then(Result => {
            //console.log("result"+Result);
            return Result;
        });
}