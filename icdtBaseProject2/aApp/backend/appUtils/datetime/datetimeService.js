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



    return {
        newDate: _newDate,
        addDays: _addDays,
        newDateByDays: _newDateByDays,
        formatDate: _formatDate,
        formatTime: _formatTime,
        startTime: _createSearchStart,
        endTime: _createSearchEnd
    };
}]);