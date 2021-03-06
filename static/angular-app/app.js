angular.module('bucketlist',['ngRoute']).config(config);

function config($routeProvider,$locationProvider){
	$routeProvider.
		when('/:usrid', {
			templateUrl: 'angular-app/dash/dash.html',
			controller: DashController,
			controllerAs: 'vm'
		}).
		when('/', {
			templateUrl: 'angular-app/login/login.html',
			controller: LoginController,
			controllerAs: 'vm'
		});

	$locationProvider.html5Mode(true);
}
