app.factory('OptionService', ['$http', function ($http) {

    var _checklistToArray = function (objs) {
        var aa = '';
        angular.forEach(objs, function (item) {
            aa += item.text + ',';
        });
        aa = aa.substring(0, aa.length - 1);
        return aa;
    };

    var _arrayToChecklist = function (dataStr, optionArray) {

        var aa = dataStr.split(',');
        var returnList = [];

        angular.forEach(aa, function (item) {
            var bb = _.find(optionArray, function (option) {
                return option.text == item;
            });
            var cc = {
                text: bb.text,
                value: bb.value
            };
            returnList.push(cc);
        });
        return returnList;
    };

    //現賒別
    var _NC_MARK = [
       {
           text: "賒帳",
           value: "N"
       },
       {
           text: "收現",
           value: "C"
       }
    ];

    //貼標
    var _LABEL_MARK =  [
        {
            text: "是",
            value: "Y"
        },
        {
            text: "否",
            value: "N"
        }
    ];

    //發票
    var _INVO_TYPE = [
        {
            text: "不開",
            value: "0"
        },
        {
            text: "彙開",
            value: "1"
        },
        {
            text: "二聯",
            value: "2"
        },
        {
            text: "三聯",
            value: "3"
        }
    ];

    //稅性
    var _PROD_TAX = [
        {
            text: "應稅",
            value: "Y"
        },
        {
            text: "免稅",
            value: "N"
        },
        {
            text: "零稅",
            value: "0"
        },
        {
            text: "當沒有detail時",
            value: "*"
        }
    ];

    //狀態碼
    var _STAT_MARK = [
        {
            text: "訂貨",
            value: "0"
        },
        {
            text: "選單",
            value: "1"
        },
        {
            text: "銷貨",
            value: "3"
        },
        {
            text: "入帳",
            value: "4"
        },
        {
            text: "訂貨額度不足",
            value: "*"
        },
        {
            text: "出貨額度不足",
            value: "Y"
        }
    ];

    //加單戳記
    var _ADD_MARK = [
        {
            text: "正常單",
            value: "N"
        },
        {
            text: "加單",
            value: "Y"
        }
    ];

    //替代產品配送
    var _SUBS_MARK = [
        {
            text: "Y",
            value: "Y"
        },
        {
            text: "N",
            value: "N"
        }
    ];

    return {
        NC_MARK:_LABEL_MARK,
        LABEL_MARK:_LABEL_MARK,
        INVO_TYPE: _INVO_TYPE,
        PROD_TAX: _PROD_TAX,
        STAT_MARK: _STAT_MARK,
        ADD_MARK: _ADD_MARK,
        SUBS_MARK: _SUBS_MARK,

        checklistToArray: _checklistToArray,
        arrayToChecklist: _arrayToChecklist

    };



}]);