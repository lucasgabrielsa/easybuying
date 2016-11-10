angular.module("easybuying")
	.controller("ProdutosCtrl", function($scope, $http, RestSrv, ngNotify) {

		$scope.titulo = 'Produtos';
		$scope.products = [];
		$scope.categories = [];
		$scope.mostrarForm = false;

		var url = 'http://localhost:8080/softbox-easybuying-factory/api/product';
		var categorieUrl = 'http://localhost:8080/softbox-easybuying-factory/api/category';		

		// GET PEGANDO A LISTA DE CATEGOGIAS 
	    RestSrv.find(categorieUrl, function(data) {
	      $scope.categories = data;
	      ngNotify.set('Loaded categories with success.', 'success');
	    });
		

		// GET PEGANDO A LISTA DE CATEGOGIAS 
	    RestSrv.find(url, function(data) {
	      $scope.products = data;
	      ngNotify.set('Loaded products with success.', 'success');
	    });

		$scope.mostrarFormulario = function() {
			delete $scope.product;
			$scope.mostrarForm = true;			
		};

		$scope.cancelarAlteracao = function() {
			$scope.mostrarForm = false;
		}

		$scope.excluirProduto = function(product) {
			RestSrv.delete(url, product, function() {
        		$scope.products.splice($scope.products.indexOf(product), 1);
        		ngNotify.set('Product \'' + product.name + '\' deleted.', 'success');
        		delete $scope.product;
      		});
		};

		$scope.editarProduto = function(product) {
      		$scope.product = angular.copy(product);
      		$scope.mostrarForm = true;      		
    	};


		$scope.salvarProduto = function(product) {
			console.log(product);
			if (product.id) {
				console.log('edit');
	        	RestSrv.edit(url, product, function() {
	          	for (var i = 0; i < $scope.products.length; i++) {
	            	if ($scope.products[i].id === product.id) {
	              		$scope.products[i] = product;
	           	}
	         }
	          $scope.mostrarForm = false;
	          ngNotify.set('Product \'' + product.name + '\' updated.', 'success');
	        });
	      } else {
	      	  console.log('insert');	      	  	      	  
	            RestSrv.add(url, product, function(product) {	       
	          	$scope.products.push(angular.copy(product));
	          	//$scope.hide();
	          	ngNotify.set('Product \'' + product.name + '\' added.', 'success');
				$scope.mostrarForm = false;
				delete $scope.product;
				$scope.formProduto.$setPristine();		        
	          });
	      }
		};
		
	});