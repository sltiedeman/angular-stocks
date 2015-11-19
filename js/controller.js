var stockApp = angular.module('stocksApp', ['ngRoute']);


	stockApp.config(function($routeProvider, $locationProvider){
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

	var allData = [];
	var expandedValueArray = [];


	stockApp.controller('stocksController', function ($scope, $http, $location){

		$scope.getStocks = function(){
			allData = [];
			$location.path('/');
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
			$scope.mainData.push({val: $scope.dataList[0].value});
			//bid
			$scope.mainData.push({val: $scope.dataList[3].value});
			//ask
			$scope.mainData.push({val: $scope.dataList[1].value});
			//change
			$scope.mainData.push({val: $scope.dataList[8].value});
			//average daily volume
			$scope.mainData.push({val: $scope.dataList[2].value});
			//day low
			$scope.mainData.push({val: $scope.dataList[21].value});
			//day high
			$scope.mainData.push({val: $scope.dataList[22].value});
			//year low
			$scope.mainData.push({val: $scope.dataList[23].value});
			//year high
			$scope.mainData.push({val: $scope.dataList[24].value});
			console.log($scope.mainData);

			//pushing more data into an array for additional detail
			// allData = $scope.mainData;
			//book value
			for(i=0; i<$scope.mainData.length-1; i++){
				allData.push($scope.mainData[i]);
			}

			//book value
			allData.push({val: $scope.dataList[6].value});
			//after hours change
			allData.push({val: $scope.dataList[12].value});
			//dividend per share
			allData.push({val: $scope.dataList[13].value});
			//earnings per share
			allData.push({val: $scope.dataList[16].value});
			//eps estimate current year
			allData.push({val: $scope.dataList[18].value});
			//eps estimate next year
			// allData.push({val: $scope.dataList[19].value});
			//eps estimate next quarter
			allData.push({val: $scope.dataList[20].value});
			//market cap
			allData.push({val: $scope.dataList[32].value});
			//ebitda
			allData.push({val: $scope.dataList[34].value});
			//percent change from year low
			allData.push({val: $scope.dataList[36].value});
			//percent change from year high
			allData.push({val: $scope.dataList[40].value});
			//days range
			allData.push({val: $scope.dataList[45].value});
			//50 day ma
			allData.push({val: $scope.dataList[47].value});
			//200 day ma
			allData.push({val: $scope.dataList[48].value});
			//prior close
			allData.push({val: $scope.dataList[56].value});
			//price to book
			allData.push({val: $scope.dataList[60].value});
			//Ex div date
			allData.push({val: $scope.dataList[61].value});
			//price/earnings ratio
			allData.push({val: $scope.dataList[62].value});
			//year range
			allData.push({val: $scope.dataList[77].value});
			//exchange
			allData.push({val: $scope.dataList[80].value});
			console.log("---------------------")
			console.log(allData);


			$scope.valuesArray = ["Symbol:", "Bid:", "Ask:", "Change:", "ADV:", "Day Low:", "Day High:", "Year Low:", "Year High:"]
			for(i=0; i<$scope.valuesArray.length-1; i++){
				expandedValueArray.push($scope.valuesArray[i]);
			}
			expandedValueArray.push("Book Value:", "After Hours Change:", "Dividend/Share:", "EPS:", "EPS Next Year:", "EPS Next Quarter");
			expandedValueArray.push("Market Cap:", "EBITDA:", "% Change from YR Low:", "%Change from YR High:", "Day Range:");
			expandedValueArray.push("50 Day MA:", "200 Day MA:", "Prior Close:", "Price to Book:", "Ex Div Date:");
			expandedValueArray.push("P/E Ratio:", "Year Range:", "Exchange:");
		}

		

		$scope.getChangeClass = function (change){
			if(change.indexOf('+') > -1){
				return 'change-positive';
			}else if(change.indexOf('-') > -1){
				return 'change-negative';
			}
		}

		
		$scope.expandedValueArray = expandedValueArray;
		$scope.allData = allData;
		$scope.moreDetail = function(){
			$location.path("/stockdetail");


		}



});