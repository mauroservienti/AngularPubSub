/* global angular */
(function () {

    'use strict';
  
    angular.module('app.controllers')
        .controller('newChatsController', ['$log', 'messageBroker', '$interval', function($log, messageBroker, $interval){
           
            var vm = this;
            
            messageBroker.subscribe('chatCreated', function (sender, args) { 
                vm.message = 'Chat created successfully';
                vm.messageSeverity = 'success';
                
                $interval(function(){ 
                    vm.message = '';
                    vm.messageSeverity = 'default';
                }, 2000);
            });
            
            messageBroker.subscribe('chatCreationFailed', function (sender, args) { 
                vm.message = args.error;
                vm.messageSeverity = 'danger';
                $interval(function(){ 
                    vm.message = '';
                    vm.messageSeverity = 'default';
                }, 2000);
            });
            
            var createNew = function () {
                messageBroker.broadcast('chatCreationRequested', vm, { 
                    name: vm.newChatName
                });
                
                vm.newChatName = '';
            };
            
            vm.createNew = createNew;
            vm.newChatName = '';
            vm.message = '';
            vm.messageSeverity = 'default';
        }]);
        
}())