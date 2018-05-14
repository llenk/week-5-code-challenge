app.controller('MessageController', ['$http', function ($http) {
    console.log('MessageController has been loaded');
    const self = this;

    self.messages = {all: []};
    self.newMessage = {
        name: '',
        message: ''
    }

    self.getMessages = function() {
        $http({
            method: 'GET',
            url: '/message'
        }).then(function(response) {
            self.messages.all = response.data;
        }).catch(function(error) {
            console.log(error);
        });
    };

    self.postMessage = function() {
        $http({
            method: 'POST',
            url: '/message',
            data: self.newMessage
        }).then(function(response) {
            self.getMessages();
        }).catch(function(error) {
            console.log(error);
        });
    }
    self.getMessages();
}]);