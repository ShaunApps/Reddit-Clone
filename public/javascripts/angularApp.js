var app = angular.module('flapperNews', ['ui.router']);


app.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);

o.getAll = function() {
  return $http.get('/posts').success(function(data){
    angular.copy(data, o.posts);
  });
};

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

    $urlRouterProvider.otherwise('home');
  }]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.test = 'Hello world!';
    $scope.posts = posts.posts[$stateParams.id];

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = ''l
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
  }]);

  app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts){
      $scope.addComment = function(){
        if($scope.body === '') { return; }
        $scope.post.comments.push({
          body: $scope.body,
          author: 'user',
          upvotes: 0
        });
        $scopes.body = '';
      };

    }]);
