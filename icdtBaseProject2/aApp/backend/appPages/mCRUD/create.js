
angular.module('app', []).controller('CreateicdtdataCtrl', [
            '$scope', '$state', '$stateParams', '$timeout', '$rootScope', 'GlobalService', 'DatetimeService', 'OptionService', 'icdtdatasFactory',
    function ($scope, $state, $stateParams, $timeout, $rootScope, GlobalService, DatetimeService, OptionService, icdtdatasFactory) {

        // 宣告
        $scope.vm = {};             // viewModel
        $scope.viewAction = {};     // 按扭動作
        $scope.select = {};         // 下拉選單
        $scope.autoComplete = {};   // 自動完成
        $scope.checklist = [];      // 多選
        $scope.dateTime = {};       // 時間驗證
        $scope.radio = {};          // radio 單選

        $scope.vm.isEdit = false;    // 是否為編輯頁面

        $scope.vm.singleObj = {};   // 宣告編輯物件

        // 初始化日期時間
        $scope.vm.singleObj.StartDate = DatetimeService.formatDate(DatetimeService.newDate(), "/"); // 今天
        $scope.vm.singleObj.EndDate = DatetimeService.formatDate(DatetimeService.newDateByDays(2), "/"); // example: 今天+2天
        $scope.vm.singleObj.StartTime = "00:00";
        $scope.vm.singleObj.EndTime = "01:00";

        $scope.submitted = false;   // 驗證初始化

        // 儲存        
        $scope.viewAction.save = function () {

            // 判斷起迄時間是否有效
            if (!$scope.dateTime.compareStartEndDate() || !$scope.dateTime.compareStartEndTime()) {
                $scope.signup_form.submitted = true;
                return;
            }

            // 表單驗證
            if ($scope.signup_form.$valid) {
                $scope.signup_form.submitted = false;

                // 讀出 CKeditor 內容
                $scope.vm.singleObj.CKeditorContent = editor.getData();

                // 讀出 checklist-model
                $scope.vm.singleObj.Checklist = OptionService.checklistToArray($scope.vm.singleObj.Checklist);

                icdtdatasFactory.create($scope.vm.singleObj).success(function (data) {
                    alert("儲存成功");
                    $state.go('m.CRUD.list');
                }).error(function (err) {
                    alert("儲存失敗");
                    console.log(err);
                });

            } else {
                $scope.signup_form.submitted = true;
            }
        };

        //下拉選單
        $scope.select.allOptions = {
            dataSource: {
                data: OptionService.INVO_TYPE       // 選項
            },
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "-請選擇-"
        };

        // radio 單選
        $scope.radio.allOptions = OptionService.INVO_TYPE;

        // checklist 多選
        $scope.checklist.allOptions = OptionService.INVO_TYPE;

        // 自動完成: 輸入字串時動作
        $scope.autoComplete.onType = function (typedthings) {
            icdtdatasFactory.getAll().success(function (data) {
                icdtdatasFactory.getAutoCompleteOptions(data, typedthings).then(function (searchOptions) {
                    if (searchOptions.length == 1) {
                        $scope.vm.singleObj.AutoComplete = searchOptions[0];
                    } else {
                        $scope.autoComplete.allOptions = searchOptions;
                    }
                });
            }).error();
        }

        // 自動完成: 下拉選擇動作
        $scope.autoComplete.onSelect = function (selectthing) {
            icdtdatasFactory.getAll().success(function (data) {
                var aa = _.find(data, function (item) {
                    return item.AutoComplete == selectthing;
                });
                $scope.vm.singleObj.AutoComplete = aa.AutoComplete;
            }).error();
        }

        //Tab切換容器
        $("#tabstrip").kendoTabStrip({
            animation: { open: { effects: "fadeIn" } },
            contentUrls: []
        });


        // 比較起迄日期
        $scope.dateTime.compareStartEndDate = function () {

            if (DatetimeService.compareDate($scope.vm.singleObj.StartDate, $scope.vm.singleObj.EndDate)) {
                $scope.signup_form.isDateError = false;
                return true;   // 起訖時間驗證正確,傳會給給其他function用
            } else {
                $scope.signup_form.isDateError = true;
                return false;    // 起訖時間驗證正確,傳會給給其他function用
            }

        };

        // 比較起迄時間
        $scope.dateTime.compareStartEndTime = function () {

            if (DatetimeService.compareTime($scope.vm.singleObj.StartTime, $scope.vm.singleObj.EndTime)) {
                $scope.signup_form.isTimeError = false;
                return true;   // 起訖時間驗證正確,傳會給給其他function用
            } else {
                $scope.signup_form.isTimeError = true;
                return false;    // 起訖時間驗證不正確,傳會給給其他function用
            }

        };

    }]);

//只限輸入數字
function ValidateNumber(e, pnumber) {
    if (!/^\d+$/.test(pnumber)) {
        $(e).val(/^\d+/.exec($(e).val()));
    }
    return false;
}

//檔案上傳
function readBase64(evt, $scope) {
    var file = evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
            $scope.vm.theProduct.PHOTO_BASE64 = evt.target.result;
            //callbackobj.imageFix64 = evt.target.result.substr(evt.target.result.indexOf(',') + 1);
        });
    };
    reader.readAsDataURL(file);
}