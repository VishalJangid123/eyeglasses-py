$( document ).ready(function() {

var HOST = '127.0.0.1'
var PORT = 4444
// var s = chrome.sockets.tcp;
    $('#mainClick').click(function() {
		event.preventDefault();

	    chrome.sockets.tcp.create({}, function(createInfo) {
	        socket=createInfo.socketId;
	        chrome.sockets.tcp.setPaused(socket, false );
	        chrome.sockets.tcp.connect(socket,HOST, PORT, callback);
	        chrome.sockets.tcp.onReceive.addListener(data_received);
	        chrome.sockets.tcp.onReceiveError.addListener(receive_error);
	    });
	});

	function callback(r){
		console.log(r);
	}

	function data_received(info) {
    console.log("the data has been received:");
    console.log(info);
}   
function receive_error(info) {
    console.log("receive error");
    console.log(info);
}

}); // end of ready