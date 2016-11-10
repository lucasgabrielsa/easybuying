angular.module('easybuying')
  .filter('formatCategoria', function() {
    return function(input) {
      switch (input) {
        case 'SERVICO':
          return 'Serviço';
        break;

        default:
          return 'Produto';
        break;
      };
    };
  });
