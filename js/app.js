var app = angular.module('stodo', ['LocalStorageModule', 'ngAnimate']);

app.controller('mainCtrl', function($scope, localStorageService) {
    if (localStorageService.get('todolist')) {
        $scope.list = localStorageService.get('todolist');
    } else {
        $scope.list = [];
    }

    $scope.newTask = {};

    $scope.$watchCollection('list', function(newValue, oldValue) {
        localStorageService.set('todolist', $scope.list);
    });

    $scope.addTask = function() {
        $scope.newTask.done = false;
        $scope.list.push($scope.newTask);
        $scope.newTask = {};
        $scope.openModal = false;
    }

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.list, function(item) {
            count += item.done ? 0 : 1;
        });

        return count;
    }

    $scope.clearList = function() {
        oldList = $scope.list;
        $scope.list = [];
        angular.forEach(oldList, function(item) {
            if (!item.done) $scope.list.push(item);
        });
    }

    $scope.openModal = false;
});