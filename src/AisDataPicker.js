const axios = require('axios');
const dbstore = require('./dbstore');
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/Ais';
	
	

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL)
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

test();
function test() {
    SendPost();
    setInterval(test,150000);
}

function ChangeDateFormat(cellval) {
    var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + currentaDte;
}

function SendPost()
{
    axios({
        url: 'https://aiswebservices.ihs.com/AISSvc.svc/AIS/GetTargets',
        method: 'post',
        auth: {
            username: 'chinwu817',
            password: '742522'
        },
        data: {
            sinceSeconds: '15'
            //MMSI:'265878000'
        }
    })
        .then(response => {

            var contents = response.data.targetArr;
            for(var i =0; i<contents.length;i++) {
                var content = JSON.stringify(contents[i]);
                content = JSON.parse(content);
                content.ETA = ChangeDateFormat(content.ETA);
                content.MessageTimestamp = ChangeDateFormat(content.MessageTimestamp);
                content.ReceivedDate = ChangeDateFormat(content.ReceivedDate);
                dbstore.dbinsert(content);
            }
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })

}


