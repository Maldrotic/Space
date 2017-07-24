let socket = io();

$universeContent = $('#universe-content');

$messageList = $('#messages');
$textInput = $('#text-input');

$currentHP = $('#current-hp');
$maxHP = $('#max-hp');
$currentFuel = $('#current-fuel');
$maxFuel = $('#max-fuel');
$currentInventory = $('#current-inventory');
$maxInventory = $('#max-inventory');


let user = null;
let universe = null;

socket.on('connected', (userObj, universeObj) => {
    user = userObj;
    universe = universeObj;
    
    console.log('user', user);
    console.log('universe ', universe);

    updateUserUI();
    updateUniverseUI();

    addMessageToList('Entered Space as ' + user.id, 'text-muted');
    addMessageToList('To go to a star, type: goto <star-id>');
});

socket.on('user-entered', (userId, starId) => {
    console.log('user-entered');
    if (userId === user.id) {
        //Its you
        enterStar(starId);
    } else {
        addMessageToList(userId+' entered this star!');
    }
});

socket.on('user-left', (userId, starId) => {
    if (userId === user.id) {
        leaveStar(starId);
    } else {
        addMessageToList(userId+' left this star!');
    }
});

socket.on('command-error', (message) => {
    console.log('command-error', message);
});




// Send message on enter keypress
$textInput.keyup((e) => {
    if (e.keyCode === 13 && $textInput.val() !== '') {
        console.log('sending message');
        sendMessage($textInput.val());
        $textInput.val('');
    }
});

function sendMessage(message) {
    let {command, params} = parseMessage(message);
    socket.emit('command', user.id, command, params);
    addMessageToList(message);
}

function addMessageToList(message, textClass) {
    $div = $messageList.append('<div class="message '+textClass+'">'+message+'</div>');
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
}

function updateUserUI() {
    // User side
    $currentHP.text(user.ship.currentHP);
    $maxHP.text(user.ship.maxHP);
    $currentFuel.text(user.ship.currentFuel);
    $maxFuel.text(user.ship.maxFuel);
    $currentInventory.text(user.ship.currentInventory);
    $maxInventory.text(user.ship.maxInventory);
}

function updateUniverseUI(currentStar) {
    $universeContent.empty();
    let galaxies = Object.values(universe.galaxies);
    for (let i = 0; i < galaxies.length; i++) {
        let galaxy = universe.galaxies[i];
        $galaxyDiv = $universeContent.append('<p class="galaxy-text text-primary">Galaxy '+galaxy.id+'\'s Stars:</p>');
        let stars = Object.values(galaxy.stars);
        for (let j = 0; j < stars.length; j++) {
            let star = stars[j];
            $universeContent.append('<p class="star-text text-warning" id="'+star.id+'">'+star.id+'</p>');
        }
    }
}

function parseMessage(message) {
    let parts = message.split(' ');
    let command = parts[0];
    let params = {};
    if (parts[0].toLowerCase() === 'goto-star') {
        params['star-id'] = parts[1];
        params['last-star-id'] = user.currentStar;
    }
    return {command, params};
}

function enterStar(starId) {
    user.currentStar = starId;
    $('#'+starId).wrapInner('<strong>');
    user.currentFuel--;
    updateUserUI();
}

function leaveStar(starId) {
    user.currentStar = null;
    $('#'+starId).unwrap('<strong>');
}


