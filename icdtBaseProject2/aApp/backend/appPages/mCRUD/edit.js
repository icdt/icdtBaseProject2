
angular.module('app', []).controller('EditicdtdataCtrl', [
            '$scope', '$state', '$stateParams', '$timeout', '$rootScope', 'GlobalService', 'DatetimeService', 'OptionService', 'icdtdataFactory',
    function ($scope, $state, $stateParams, $timeout, $rootScope, GlobalService, DatetimeService, OptionService, icdtdataFactory) {

        // 宣告
        $scope.vm = {};
        $scope.vm.isEdit = true;    // 編輯葉面
        
        $scope.vm.singleObj = {};   // 宣告編輯物件
        $scope.vm.singleObj = GlobalService.selectedObj;    // 取得列表所選取的物件
        $scope.vm.singleObj.StartTime = DatetimeService.formatDate(DatetimeService.newDate(), "/"); // 今天
        $scope.vm.singleObj.EndTime = DatetimeService.formatDate(DatetimeService.newDateByDays(2), "/"); // example: 今天+2天

        $scope.submitted = false;   // 驗證初始化

        // 儲存        
        $scope.vm.save = function () {

            // 判斷起迄時間是否有效
            if ( !$scope.vm.compareStartEnd() ) {
                $scope.signup_form.submitted = true;
                return;
            }

            // 表單驗證
            if ($scope.signup_form.$valid) {

                $scope.signup_form.submitted = false;
                icdtdataFactory.update($scope.vm.singleObj).success(function (data) {
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

        // 刪除
        $scope.vm.remove = function () {
            icdtdataFactory.remove($scope.vm.singleObj).success(function (data) {
                alert("刪除成功");
                $state.go('m.CRUD.list');
            }).error(function (err) {
                alert("刪除失敗");
                console.log(err);
            });
        };

        //下拉選單
        $scope.product_category = {
            dataSource: {
                data: OptionService.INVO_TYPE       // 選項
            },
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "-請選擇-"
        };

        //數字篩選
        $("#price_change").kendoNumericTextBox(
            {
                culture: "de-DE",
                value: 0,
                step: 100
            });

        //自動完成


        //Tab切換容器
        $("#tabstrip").kendoTabStrip({
            animation: { open: { effects: "fadeIn" } },
            contentUrls: []
        });

        //單張圖片上傳
        $("#file").kendoUpload({
            multiple: false,
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                autoUpload: false
            }
        });

        //多張圖片上傳
        $("#files").kendoUpload({
            multiple: true,
            async: {
                saveUrl: "save",
                removeUrl: "remove",
                autoUpload: false
            }
        });

        //備註
        $("#note").kendoEditor({
            tools: [
                     "bold",
                     "italic",
                     "underline",
                     "strikethrough",
                     "justifyLeft",
                     "justifyCenter",
                     "justifyRight",
                     "justifyFull",
                     "foreColor",
                     "backColor"
            ]
        });

        // 比較起迄時間
        $scope.vm.compareStartEnd = function () {

            if (new Date($scope.vm.singleObj.StartTime) >= new Date($scope.vm.singleObj.EndTime)) {
                $scope.signup_form.isStartBigggerThanEndError = true;
                return false;   // 起訖時間驗證正確,傳會給給其他function用
            } else {
                $scope.signup_form.isStartBigggerThanEndError = false;
                return true;    // 起訖時間驗證正確,傳會給給其他function用
            }

        };

    }]);