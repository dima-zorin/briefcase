var I, i;

angular.module('MyApp', ['ngMaterial'])
  .controller('MainController', ['$scope', function($scope) {
    $scope.rows = [];
    $scope.rowsPlus = [];
    $scope.rowsMinus = [];
    $scope.sum = [];
    $scope.summary = [];

    $scope.addRow = function() {
      for (i = 0; i < $scope.rows.length; i++) {
        if ($scope.name === $scope.rows[i]['name']) {
          var identity = true;
        }
      }

      if ($scope.myForm.$valid === false) {
        alert("заполните все поля и/или используйте правильный формат");
      } else {
        if (identity === true) {
          for (i = 0; i < $scope.rows.length; i++) {
            if ($scope.name === $scope.rows[i]['name']) {
              $scope.rows[i]['price'] = Math.round((($scope.rows[i]['price'] * $scope.rows[i]['quantity'] + $scope.price.replace(',', '.') * $scope.quantity) / ($scope.rows[i]['quantity'] + $scope.quantity)) * 100) / 100;
              $scope.rows[i]['quantity'] = $scope.rows[i]['quantity'] + $scope.quantity;
              if ($scope.rows[i]['priceActual'] !== null) {
                $scope.rows[i]['profit'] = $scope.rows[i]['priceActual'] * $scope.rows[i]['quantity'] - $scope.rows[i]['price'] * $scope.rows[i]['quantity'];
              }

              $scope.updatePlusMinus();
              $scope.sumM();
              $scope.summaryS();
              $scope.recet();
            }
          }
        } else {
          var newRow = {
            name: $scope.name,
            price: $scope.price.replace(',', '.'),
            quantity: $scope.quantity,
            priceActual: null,
            profit: null
          };
          $scope.rows.push(newRow);

          $scope.recet();
        }
      }
    };

    $scope.summaryS = function() {
      $scope.summary = [];
      for (i = 0; i < $scope.rows.length; i++) {
        if ($scope.rows[i]['profit'] === null) {
          continue;
        } else {
          var newRowS = {
            nameS: $scope.rows[i]['name'],
            priceActualS: Math.round(($scope.rows[i]['priceActual'] * $scope.rows[i]['quantity']) * 100) / 100,
            plusMinusS: $scope.rows[i]['profit'],
            percentS: Math.round(((($scope.rows[i]['priceActual'] * $scope.rows[i]['quantity']) / $scope.sum[1]) * 100) * 100) / 100
          }
          $scope.summary.push(newRowS);
        }
      }
    };

    $scope.sumM = function() {
      var summa = 0;
      var priceP = 0;
      $scope.sum = [];
      for (i = 0; i < $scope.rows.length; i++) {
        summa += $scope.rows[i]['profit'];
        priceP += ($scope.rows[i]['priceActual'] * $scope.rows[i]['quantity']);
      }
      $scope.sum.push(summa);
      $scope.sum.push((Math.round((priceP) * 100) / 100));
    };

    $scope.recet = function() {
      myForm.reset();
      $scope.price = null;
      $scope.quantity = null;
      $scope.myForm.$valid = false;
    };

    $scope.updatePlusMinus = function() {
      $scope.rowsPlus = [];
      $scope.rowsMinus = [];

      for (i = 0; i < $scope.rows.length; i++) {
        if ($scope.rows[i]['profit'] > 0) {
          $scope.rowsPlus.push($scope.rows[i]);
          document.getElementById("myTable").rows[i + 1].style.background = "#aaff80";
        } else if ($scope.rows[i]['profit'] < 0) {
          $scope.rowsMinus.push($scope.rows[i]);
          document.getElementById("myTable").rows[i + 1].style.background = "#ff1a1a";
        } else {
          continue;
        }
      }
    };

    $scope.setPrice = function() {
      document.getElementById("myTable").rows[I].cells[3].children[0].remove();
      document.getElementById("myTable").rows[I].cells[4].children[0].remove();
      document.getElementById("myTable").rows[I].cells[3].children[0].style.display = "initial";
    };

    $scope.showPriceActualInput = function() {
      document.getElementById("myTable").rows[I].cells[3].children[0].style.display = "initial";
      document.getElementById("myTable").rows[I].cells[3].children[1].style.display = "none";
    };
    
    $scope.hidePriceActualInput = function() {
      document.getElementById("myTable").rows[I].cells[3].children[0].style.display = "none";
      document.getElementById("myTable").rows[I].cells[3].children[1].style.display = "initial";
    };
  }])
  .controller('ChildController', ['$scope', function($scope) {
    $scope.updatePrice = function() {
      if ($scope.myFormHidden.$valid === false) {
        alert("заполните поле и/или используйте правильный формат");
      } else {
        $scope.rows[I - 1]['priceActual'] = $scope.priceActual.replace(',', '.');
        $scope.rows[I - 1]['profit'] = Math.round(($scope.rows[I - 1]['priceActual'] * $scope.rows[I - 1]['quantity'] - $scope.rows[I - 1]['price'] * $scope.rows[I - 1]['quantity']) * 100) / 100;

        $scope.hidePriceActualInput();
      }

      $scope.updatePlusMinus();
      $scope.sumM();
      $scope.summaryS();
    };
  }]);