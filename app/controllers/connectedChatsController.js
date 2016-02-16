/* global angular */
(function () {

    'use strict';
    
    angular.module('app.controllers')
        .controller('connectedChatsController', ['$log', 'messageBroker', function($log, messageBroker){
           
            var vm = this;
            
            var getChatReferenceByName = function(name){
                for (var i = 0; i < vm.chats.length; i++) {
                    var chat = vm.chats[i];
                    if(chat.name === name){
                        return { chat: chat, index: i };
                   }
                }
            };
            
            messageBroker.subscribe('chatClosed', function (sender, args) { 
                var chatItem =  getChatReferenceByName(args.name);
                vm.chats.splice(chatItem.index,1);
                messageBroker.broadcast('chatDisconnected', vm, { 
                    name: chatItem.chat.name
                });
            });
            
            messageBroker.subscribe('chatConnectionRequested', function (sender, args) { 
                var newChat = new Chat($log, messageBroker, args.name);
                vm.chats.push(newChat);
                
                messageBroker.broadcast('chatConnected', vm, { 
                    name: newChat.name
                });
            });
            
            vm.chats = [];
        }]);
        
}())