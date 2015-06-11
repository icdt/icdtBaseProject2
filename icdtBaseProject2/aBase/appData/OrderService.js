
app.factory('OrderService', ['$uuid', function ($uuid) {

    // check if order exist in localStorage
    var _order;
    if (localStorage['order'] == null) {
        // have some order 
        _order = [
        {
            OrderId: 'O201505260002',
            OrderOwner: '康陽',
            NeedDateTime: '2015/05/28',
            OrderDateTime: '2015/05/26',
            StatusTime: '上午',
            MonthBill: '次月帳',
            Addressee: '李小明',
            Address: '台北市南港區',
            TEL: '02-21235678',
            OrderItem: '6',
            Warehouse: 'CW',
            HAWBNo: '5804',
            JobNo: '5938',
            CTNS: '6',
            Remark: '',
            Status: 'New',
            Contact: '東協',
            Discharge: '',
            Ton: '1.5',
            Driver: '-',
            Dialogue: '',
            UpdateTime: '2015/05/26 11:01',
            QuotedPrice: '報價',
            Bonus: '公司分紅',
            Profit: '利潤',
            Type: '卡車'
            //BackWeight: '',
            //BackFee: ''

        },
        {
            OrderId: 'O201505250088',
            OrderOwner: '亞細亞',
            NeedDateTime: '2015/05/26',
            OrderDateTime: '2015/05/25',
            StatusTime: '下午',
            MonthBill: '本月帳',
            Addressee: '張小美',
            Address: '台北市大安區',
            TEL: '02-26668888',
            OrderItem: '8',
            Warehouse: 'CA',
            HAWBNo: '5888',
            JobNo: '5601',
            CTNS: '8',
            Remark: '',
            Status: '已完成',
            Contact: '南諦',
            Discharge: 'CW',
            Ton: '0.6',
            Driver: '黃大明',
            Dialogue: '',
            UpdateTime: '2015/05/26 15:30',
            QuotedPrice: '報價',
            Bonus: '公司分紅',
            Profit: '利潤',
            Type: '卡車',
            //BackWeight: '',
            //BackFee: ''
        }


        ];
        localStorage['order'] = JSON.stringify(_order);
    } else {

    }

    return {


       

        //取得所有訂單項目
        getOrderAll: function (type, customerid, start, end) {

            //console.log(type,customerid,start,end);
            //debugger;
            return $http.get(api + "/orders/employee/drivertype?"
                + "customerid=" + customerid + "&"
                + "start=" + start + "&"
                + "end=" + end);


        },



        getAll: function () {
            //return an array
            var returnorder = JSON.parse(localStorage['order']);
            return returnorder;
        },
        getOne: function (ppId) {
            //return single obj
            var order = JSON.parse(localStorage['order']);
            var returnorder = _find(order, function (itme) { item.id == order.id });
            return returnorder;
        },
        create: function (ppObj) {

            var order = JSON.parse(localStorage['order']);

            // generate uuid for new obj
            var newId = $uuid.newuuid();
            ppObj.id = newId;

            order.push(ppObj);
            localStorage['order'] = JSON.stringify(order);

            return newId;

        },
        update: function (ppObj) {

            var order = JSON.parse(localStorage['order']);

            // find index of ppObj in array
            var theIndex = _findIndex(order, function (item) {
                return item.id == ppObj.id;
            });

            // apply ppObj by array index
            order[theIndex] = ppObj;
            localStorage['order'] = JSON.stringify(order);

            return 'OK';
        },

        remove: function (ppId) {

            var order = JSON.parse(localStorage['order']);

            // remove corresponding obj from array
            _.remove(order, function (item) {
                return item.id == ppId;
            });

            localStorage['order'] = JSON.stringify(order);

            return 'OK';
        }
    };
}])


app.factory("$uuid", function () {
    return {
        newuuid: function () {
            // http://www.ietf.org/rfc/rfc4122.txt
            // 41979d3-0376-4da5-9087-535df803b721
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 8; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            //s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            //s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            //s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        }
    }
});