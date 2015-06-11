app.factory('$options', ['$http', function ($http) {

    return {
        //月份帳項目
        DebtAll: [
           {
               text: "本月帳",
               value: "0"
           },
           {
               text: "次月帳",
               value: "1"
           },
           {
               text: "前月帳",
               value: "2"
           }
        ],

        //可收件時間區間
        ReceiveAreaAll: [
            {
                text: "不指定",
                value: "0"
            },
            {
                text: "上午",
                value: "1"
            },
            {
                text: "下午",
                value: "2"
            }
        ],
        WarehousingAll: [
            {
                text: "CA",
                value: "CA"
            },
            {
                text: "CG",
                value: "CG"
            },
            {
                text: "CW",
                value: "CW"
            },
            {
                text: "CH",
                value: "CH"
            }
        ]
    };
}]);