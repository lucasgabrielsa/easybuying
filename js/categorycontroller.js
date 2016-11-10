angular.module("easybuying")
	.controller("CategoriasCtrl", function($scope, $http, RestSrv, ngNotify) {

		var categorieUrl = 'http://localhost:8080/softbox-easybuying-factory/api/category';

		$scope.titulo = 'Categorias';
		$scope.categories = [];
		$scope.mostrarForm = false;

		// GET PEGANDO A LISTA DE CATEGOGIAS 
	    RestSrv.find(categorieUrl, function(data) {
	      $scope.categories = data;
	      ngNotify.set('Loaded categories with success.', 'success');
	    });

		$scope.mostrarFormulario = function() {
			delete $scope.categorie;
			$scope.mostrarForm = true;			
		};

		$scope.cancelarAlteracao = function() {
			$scope.mostrarForm = false;
		}

		$scope.excluirCategoria = function(categorie) {
			RestSrv.delete(categorieUrl, categorie, function() {
        		$scope.categories.splice($scope.categories.indexOf(categorie), 1);
        		ngNotify.set('Categorie \'' + categorie.name + '\' deleted.', 'success');
        		delete $scope.categorie;
      		});
		};

		$scope.editarCategoria = function(categorie) {
      		$scope.categorie = angular.copy(categorie);
      		$scope.mostrarForm = true;      		
    	};


		$scope.salvarCategoria = function(categorie) {
			console.log(categorie);
			if (categorie.id) {
				console.log('edit');
	        	RestSrv.edit(categorieUrl, categorie, function() {
	          	for (var i = 0; i < $scope.categories.length; i++) {
	            	if ($scope.categories[i].id === categorie.id) {
	              		$scope.categories[i] = categorie;
	           	}
	         }
	          $scope.mostrarForm = false;
	          ngNotify.set('Categorie \'' + categorie.name + '\' updated.', 'success');
	        });
	      } else {
	      	  console.log('insert');	      	  	      	  
	            RestSrv.add(categorieUrl, categorie, function(categorie) {	       
	          	$scope.categories.push(angular.copy(categorie));
	          	//$scope.hide();
	          	ngNotify.set('Categorie \'' + categorie.name + '\' added.', 'success');
				$scope.mostrarForm = false;
				delete $scope.categorie;
				$scope.formCategoria.$setPristine();		        
	          });
	      }
		};
		
	});