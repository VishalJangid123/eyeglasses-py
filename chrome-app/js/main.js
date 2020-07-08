$( document ).ready(function() {

startIntialize();
var HOST = '127.0.0.1'
var PORT = 4444
// var s = chrome.sockets.tcp;
    $('#mainClick').click(function() {
		event.preventDefault();
		addlog('trying to connect to ' + HOST + ':' + PORT + '....');
		try{
			    chrome.sockets.tcp.create({}, function(createInfo) {
			        socket=createInfo.socketId;
			        chrome.sockets.tcp.setPaused(socket, false );
			        chrome.sockets.tcp.connect(socket,HOST, PORT, callback);
			        chrome.sockets.tcp.onReceive.addListener(data_received);
			        chrome.sockets.tcp.onReceiveError.addListener(receive_error);
			    });

		}
		catch(e){
			addlog(e, 'error');
		}
	});

	function callback(response){
		console.log(response);

		if(response < 0){
			// $('.error').show();
			// $('.error').val('Python Script is not running');
			addlog(chrome.runtime.lastError.message, 'error');
		}

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

function startIntialize(){
	$('.error').hide();
	$('.success').hide();
	// $('.log-container').hide();
}

function addlog(message, type){
	var type_class = 'log-normal';
	if(type == 'error')
		type_class = 'log-error';
	else if(type == 'success')
		type_class = 'log-success';

	$('#log_list').append('<li class="log ' + type_class +'">'+ message +'</li>')

	updateScrollLog();
}

function updateScrollLog(){
	var element = document.getElementById("log_list");
	element.scrollTop = element.scrollHeight
}