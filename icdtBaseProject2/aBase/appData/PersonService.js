
app.factory('PersonService', ['$uuid', function ($uuid) {

    // check if data exist in localStorage
    var _data;
    if (localStorage['personsave'] == null) {
        // have some data 
        _data = [
        {
            DataNick: '東協-業務',
            Status: '業務窗口',
            CompanyName: '東協股份有限公司',
            FirstName: '李',
            LastName: '大仁',
            Phone: '0912345678',
            TEL: '02-212345678',
            Email: 'a1@gmail.com',
            Contract: '',
            Remark: '',
        },
        {
            DataNick: '西獨-業務',
            Status: '業務窗口',
            CompanyName: '西獨股份有限公司',
            FirstName: '程',
            LastName: '又青',
            Phone: '0912876543',
            TEL: '02-287654321',
            Email: 'b1@gmail.com',
            Contract: '',
            Remark: '',
        }



        ];



        localStorage['personsave'] = JSON.stringify(_data);
    } else {

    }

    return {

        getAll: function () {
            //return an array
            var returnData = JSON.parse(localStorage['personsave']);
            return returnData;
        },
        getOne: function (ppId) {
            //return single obj
            var data = JSON.parse(localStorage['personsave']);
            var returnData = _find(data, function (itme) { item.id == data.id });
            return returnData;
        },
        create: function (ppObj) {

            var data = JSON.parse(localStorage['personsave']);

            // generate uuid for new obj
            var newId = $uuid.newuuid();
            ppObj.id = newId;

            data.push(ppObj);
            localStorage['personsave'] = JSON.stringify(data);

            return newId;

        },
        update: function (ppObj) {

            var data = JSON.parse(localStorage['personsave']);

            // find index of ppObj in array
            var theIndex = _findIndex(data, function (item) {
                return item.id == ppObj.id;
            });

            // apply ppObj by array index
            data[theIndex] = ppObj;
            localStorage['personsave'] = JSON.stringify(data);

            return 'OK';
        },

        remove: function (ppId) {

            var data = JSON.parse(localStorage['personsave']);

            // remove corresponding obj from array
            _.remove(data, function (item) {
                return item.id == ppId;
            });

            localStorage['personsave'] = JSON.stringify(data);

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