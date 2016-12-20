(function () {
    "use strict";
    var app = angular.module('imgLoad', [])
            .factory('pagination', function ($sce) {
                var currentPage = 0;
                var itemsPerPage = 8;
                var products = [];
                return {
                    setProducts: function (newProduct) {
                        products = newProduct;
                    },
                    getPageProducts: function (num) {
                        var num = angular.isUndefined(num) ? 0 : num;
                        var first = itemsPerPage * num;
                        var last = first + itemsPerPage;
                        currentPage = num;
                        last = last > products.length ? (products.length) : last;
                        return products.slice(first, last);
                    },
                    getTotalPagesNum: function () {
                        return Math.ceil(products.length / itemsPerPage);
                    },
                    getPaginationList: function () {
                        var pagesNum = this.getTotalPagesNum();
                        var paginationList = [];
                        paginationList.push({
                            name: $sce.trustAsHtml('&laquo'),
                            link: 'prev'
                        });
                        for (var i = 0; i < pagesNum; i++) {
                            var name = i + 1;
                            paginationList.push({
                                name: $sce.trustAsHtml(String(name)),
                                link: i
                            });
                        }
                        paginationList.push({
                            name: $sce.trustAsHtml('&raquo'),
                            link: 'next'
                        });
                        if (pagesNum > 1)
                            return paginationList;
                        else
                            return false;
                    },
                    getCurrentPageNum: function () {
                        return currentPage;
                    },
                    getPrevPageProducts: function () {
                        var prevPageNum = currentPage - 1;
                        if (prevPageNum < 0)
                            prevPageNum = 0;
                        return this.getPageProducts(prevPageNum);
                    },
                    getNextPageProducts: function () {
                        var nextPageNum = currentPage + 1;
                        var pagesNum = this.getTotalPagesNum();
                        if (nextPageNum >= pagesNum)
                            nextPageNum = pagesNum - 1;
                        return this.getPageProducts(nextPageNum);
                    }
                };
            })
            .controller('imgCtrl', ['$http', '$scope', 'pagination', function ($http, $scope, pagination) {
                    $http.get('http://imgdb/public/').then(function (response) {
                        console.log(response.data);
                        pagination.setProducts(response.data);
                        $scope.images = pagination.getPageProducts();
                        $scope.paginationList = pagination.getPaginationList();
                    }, function (response) {
                        console.log(response.status);
                        console.log("false");
                    });

                    $scope.showPage = function (page) {
                        if (page == 'prev')
                            $scope.images = pagination.getPrevPageProducts(page);
                        else if (page == 'next') {
                            console.log(page);
                            $scope.images = pagination.getNextPageProducts(page);
                        } else
                            $scope.images = pagination.getPageProducts(page);
                    };
                    $scope.currentPageNum = function () {
                        return pagination.getCurrentPageNum();
                    };
                    $scope.name = '';
                    $scope.submit = function () {
                        $http({
                            method: 'POST',
                            url: 'http://imgdb/public/add'
                        }).then(function (response) {
                            console.log('eeee');
                            console.log(response.status);
//                            $http.get('http://imgdb/public/').then(function (response) {
//                                pagination.setProducts(response.data);
//                                $scope.images = pagination.getPageProducts();
//                                $scope.paginationList = pagination.getPaginationList();
//                            }, function (response) {
//                                console.log(response.status);
//                            });
                        }, function (response) {
                            console.log('uuuu');
                            console.log(response.status);
                        });
                    };
                }]);
})();

