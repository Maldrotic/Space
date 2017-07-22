let socket = io();

$messageList = $('#messages');
$textInput = $('#text-input');


socket.on('connected', (id) => {
    addMessageToList(id);
});

$textInput.keyup((e) => {
    if (e.keyCode === 13 && $textInput.val() !== '') {
        console.log('sending message');
        sendMessage($textInput.val());
        $textInput.val('');
    }
});




function sendMessage(message) {
    socket.emit('message', message);
    addMessageToList(message);
}

function addMessageToList(message) {
    console.log('adding "'+message+'" to list');
    $div = $messageList.append('<div class="message">'+message+'</div>');
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}


