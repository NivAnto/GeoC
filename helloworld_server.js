var html = require('fs').readFileSync(__dirname+'/helloworld.html');


var server = require('http').createServer(function(req, res){
  console.log('Running');
  res.end(html);
});
server.listen(8080);

var nowjs = require('now');
var everyone = nowjs.initialize(server);

//everyone.now.distributeMessage = function(message){
//  console.log(message);
//  everyone.now.receiveMessage(this.now.usr_name, this.now.serverRoom, message);
//};

// Send message to everyone in the users group
everyone.now.distributeMessage = function(message){
    console.log(message);
    var group = nowjs.getGroup(this.now.serverRoom);
    group.now.receiveMessage(this.now.usr_name+'@'+this.now.serverRoom, message);
};

everyone.now.changeRoom = function(newRoom){

    var oldRoom = this.now.serverRoom;

    //if old room is not null; then leave the old room
    if(oldRoom){
        var oldGroup = nowjs.getGroup(oldRoom);
        oldGroup.removeUser(this.user.clientId);
    }

    // join the new room
    var newGroup = nowjs.getGroup(newRoom);
    newGroup.addUser(this.user.clientId);

    // update the client's serverRoom variable
    this.now.serverRoom = newRoom;
    console.log(this.now.usr_name + " is changing from " + oldRoom + " to "+ newRoom);
    console.log(newGroup);
};


