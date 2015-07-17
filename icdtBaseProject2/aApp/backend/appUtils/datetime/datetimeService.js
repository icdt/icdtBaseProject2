app.factory('DatetimeService', ['$q', function ($q) {

    // 今天日期
    var _newDate = function () {
        var date = new Date();
        return date;
    }

    // 從今天起 加減 幾日
    var _newDateByDays = function (days) {
        return _addDays(_newDate(), days);
    }

    //增加指定天數
    var _addDays = function (theDate, days) {
        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    // 產生 yyyy[conStr]mm[conStr]dd 字串
    var _formatDate = function getFormattedDate(date, conStr) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + conStr + month + conStr + day;
    }

    // 產生 HH[conStr]MM[conStr]SS 字串
    var _formatTime = function getFormattedDate(datetime, conStr) {
        var hour = datetime.getHours().toString();
        hour = hour.length > 1 ? hour : '0' + hour;
        var min = datetime.getMinutes().toString();
        min = min.length > 1 ? min : '0' + min;
        var second = datetime.getSeconds().toString();
        second = second.length > 1 ? second : '0' + second;
        return hour + conStr + min + conStr + second;
    }

    var _createSearchStart = function (date) {
        var aa = _formatDate(date, "-") + " 00:00:00";
        return aa;
    };

    var _createSearchEnd = function (date) {
        var aa = _formatDate(date, "-") + " 23:59:59";
        return aa;
    };

    var _compareDate = function (date1, date2) {

        date1 = new Date(date1);
        date2 = new Date(date2);

        var y1 = date1.getFullYear();
        var m1 = (1 + date1.getMonth()).toString();
        var d1 = date1.getDate().toString();

        var y2 = date2.getFullYear();
        var m2 = (1 + date2.getMonth()).toString();
        var d2 = date2.getDate().toString();
        
        if (y1 == y2 && m1 == m2 && d1 == d2) {
            return true;
        } else {
            return false;
        }

    };

    var _compareTime = function (time1, time2) {

        var time1_hour = time1.split(':')[0];
        var time1_min = time1.split(':')[1];
        var time2_hour = time2.split(':')[0];
        var time2_min = time2.split(':')[1];

        if (time2_hour > time1_hour) {
            return true;
        }else{
            return false;
        }

        if (time2_min > time1_min) {
            return true;
        } else {
            return false;
        }

    };



    return {
        newDate: _newDate,
        addDays: _addDays,
        newDateByDays: _newDateByDays,
        formatDate: _formatDate,
        formatTime: _formatTime,
        startTime: _createSearchStart,
        endTime: _createSearchEnd,
        compareDate: _compareDate,
        compareTime: _compareTime,
    };
}]);