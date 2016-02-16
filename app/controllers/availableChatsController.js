/* global angular */
(function () {

    'use strict';

    function AvailableChat($log, messageBroker, name) {
        var _log = $log;
        var _messageBroker = messageBroker;
        this.name = name;
        this.isConnected = false;
        
        var _self = this;
        
        var connect = function(){
            _messageBroker.broadcast('chatConnectionRequested', _self, { name: _self.name });
            _self.newMessage = '';
        };
        
        this.connect = connect;
    }
    
    angular.module('app.controllers')
        .controller('availableChatsController', ['$log', 'messageBroker', function($log, messageBroker){
           
            var vm = this;
            
            var getChatReferenceByName = function(name){
                for (var i = 0; i < vm.chats.length; i++) {
                    var chat = vm.chats[i];
                    if(chat.name === name){
                        return { chat: chat, index: i };
                   }
                }
            };
            
            messageBroker.subscribe('chatCreated', function (sender, args) { 
                vm.chats.push( new AvailableChat($log, messageBroker, args.name) );
            });
            
            messageBroker.subscribe('chatClosed', function (sender, args) { 
                var chatItem =  getChatReferenceByName(args.name);
                vm.chats.splice(chatItem.index,1);
            });
            
            messageBroker.subscribe('chatConnected', function (sender, args) { 
                var chatItem =  getChatReferenceByName(args.name);
                chatItem.chat.isConnected = true;
            });
            
            vm.chats = [];
        }]);
        
}())