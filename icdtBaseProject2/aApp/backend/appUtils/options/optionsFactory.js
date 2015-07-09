app.factory('OptionService', ['$http', function ($http) {
    return {
        //現賒別
        NC_MARK: [
           {
               text: "賒帳",
               value: "N"
           },
           {
               text: "收現",
               value: "C"
           }
        ],

        //貼標
        LABEL_MARK: [
            {
                text: "是",
                value: "Y"
            },
            {
                text: "否",
                value: "N"
            }
        ],

        //發票
        INVO_TYPE: [
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
        ],

        //稅性
        PROD_TAX: [
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
        ],

        //狀態碼
        STAT_MARK: [
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
        ],

        //加單戳記
        ADD_MARK: [
            {
                text: "正常單",
                value: "N"
            },
            {
                text: "加單",
                value: "Y"
            }
        ],

        //替代產品配送
        SUBS_MARK: [
            {
                text: "Y",
                value: "Y"
            },
            {
                text: "N",
                value: "N"
            }
        ]

    };
}]);