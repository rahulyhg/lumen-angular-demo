(function () {
    'use strict';

    angular
        .module('app')
        .factory('PageService', PageService);

    PageService.$inject = ['$http'];
    function PageService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetPageTemplates = GetPageTemplates;
        service.UpdatePage = UpdatePage;

        return service;

        function GetAll($paged, callback, callbackError)
        {
            if(!$paged) $paged = 1;
            return $http.get(baseApi + 'pages', {
                params: {page: $paged}
            }).success(callback).error(callbackError);
        }

        function GetById($id, callback, callbackError)
        {
            return $http.get(baseApi + 'pages/' + $id).success(callback).error(callbackError);
        }

        function GetPageTemplates(callback, callbackError)
        {
            return $http.get(baseGlobalApi + 'global/page-templates').success(callback).error(callbackError);
        }

        function UpdatePage($data, callback, callbackError)
        {
            if($data.id != 0)
            {
                $http.put(baseApi + 'pages/' + $data.id, $data).success(function (response) {
                    if(callback) callback(response);
                }).error(function(response){
                    if(callbackError) callbackError(response);
                });
            }
            else
            {
                $http.post(baseApi + 'pages/create', $data).success(function (response) {
                    if(callback) callback(response);
                }).error(function(response){
                    if(callbackError) callbackError(response);
                });
            }
        }
    }
})();