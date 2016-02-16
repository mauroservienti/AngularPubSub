function Chat($log, messageBroker, name) {
    var _log = $log;
    var _messageBroker = messageBroker;
    this.name = name;
    this.messages = [];
    this.newMessage = '';
    
    var _self = this;
    
    var newMessageCreatedSubscription = null;
    var chatClosedSubscription = null;
    
    chatClosedSubscription = messageBroker.subscribe('chatClosed', function(sender, args){
        chatClosedSubscription.unsubscribe();
        newMessageCreatedSubscription.unsubscribe();
    });
    
    newMessageCreatedSubscription = messageBroker.subscribe('newMessageCreated', function(sender, args){
        
        if(sender.name !== _self.name){
            //message not in this chat
            return;
        }
        
        _self.messages.push({
            text: args.message,
            direction: (sender === _self)
                ? 'out'
                : 'in'
        });
    });
    
    var sendMessage = function(){
        _messageBroker.broadcast('newMessageCreated', _self, { message: _self.newMessage });
        _self.newMessage = '';
    };
    
    var close = function(){
        _messageBroker.broadcast('closeChatRequested', _self, { name: _self.name });
    };
    
    this.close = close;
    this.sendMessage = sendMessage;
}