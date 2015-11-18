var stockApp = angular.module('stocksApp', ['ngRoute']);


	stockApp.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl: 'stocksummary.html',
			controller: 'stocksController'
		}).
		when('/stockdetail',{
			templateUrl: 'stockdetail.html',
			controller: 'stocksController'
		}).
		otherwise({
			redirectTo: 'stocksummary.html'
		});
	})



	stockApp.controller('stocksController', function ($scope, $http, $location){

		$scope.getStocks = function(){
			var encodedTickers = encodeURIComponent($scope.userStocks);
			console.log($scope.userStocks);
			var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+encodedTickers+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';		
			$http.get(url).success(function(stockData){
				// console.log(encodedTickers);
				if(($scope.userStocks).indexOf(',') != -1){
					$scope.listOfStocks = stockData.query.results.quote;
				}else{
					$scope.listOfStocks = [stockData.query.results.quote];

			}
				
				// $scope.loadStock($scope.)
			})
		}

		$scope.loadStock = function(stockData){
			// init array
			$scope.dataList = [];
			for(name in stockData){
				$scope.dataList.push({
					prop:name,
					value: stockData[name]
				});
			}
			console.log($scope.dataList);

			//Creating an array that will hold only values I want
			$scope.mainData = [];
			// symbol
			$scope.mainData.push($scope.dataList[0].value);
			//bid
			$scope.mainData.push($scope.dataList[3].value);
			//ask
			$scope.mainData.push($scope.dataList[1].value);
			//change
			$scope.mainData.push($scope.dataList[8].value);
			//average daily volume
			$scope.mainData.push($scope.dataList[2].value);
			//day low
			$scope.mainData.push($scope.dataList[21].value);
			//day high
			$scope.mainData.push($scope.dataList[22].value);
			//year low
			$scope.mainData.push($scope.dataList[23].value);
			//year high
			$scope.mainData.push($scope.dataList[24].value);

			console.log($scope.mainData);

			$scope.valuesArray = ["Symbol:", "Bid:", "Ask:", "Change:", "ADV:", "Day Low:", "Day High:", "Year Low:", "Year High:"]
		}

		

		$scope.getChangeClass = function (change){
			if(change.indexOf('+') > -1){
				return 'change-positive';
			}else if(change.indexOf('-') > -1){
				return 'change-negative';
			}
		}

		$scope.moreDetail = function(){
			$location.path("/stockdetail")
		}



});