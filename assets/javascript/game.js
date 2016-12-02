//Logic of Game Interaction
//Batman Object
var batman = {
    name: 'Batman',
    image: '../images/thebat.jpg',
    healthPoints: 100,
    attackPower: 5,
    counterAttackPower: 5
};

//Joker Object
var joker = {
    name: 'Batman',
    image: '../images/joker.jpg',
    healthPoints: 150,
    attackPower: 15,
    counterAttackPower: 15
};

//Bane Object
var bane = {
    name: 'Batman',
    image: '../images/bane.jpg',
    healthPoints: 120,
    attackPower: 8,
    counterAttackPower: 8
};

//EvilSuperman Object
var superman = {
    name: 'Batman',
    image: '../images/evilsuperman.jpg',
    healthPoints: 180,
    attackPower: 25,
    counterAttackPower: 25
};

//Global Variables
var playerSelected = false;
var defenderSelected = false;
var player;
var enemy;
var playerHealth;
var enemyHealth;
var playerAttack;
var enemyAttack;
var playerBaseAttack;
var enemiesDefeated = 0;

//Object Logic
//Each attack by selected character  increases by base attack power. 
//Decrease player/enemy health.
function playerIncreaseAttackPower() {
    playerAttack = playerAttack + playerBaseAttack;
}

function decreasePlayerHealth() {
    playerHealth -= enemyAttack;
}

function decreaseEnemyHealth() {
    enemyHealth -= playerAttack;
}

//Loads global variables of player with its attributes
function definePlayerVariables(figure) {
    if ($(figure).attr('id') === 'batman-figure') {
        player = batman;
        playerHealth = batman.healthPoints;
        playerAttack = batman.attackPower;
        playerBaseAttack = batman.attackPower;
    } else if ($(figure).attr('id') === 'joker-figure') {
        player = joker;
        playerHealth = joker.healthPoints;
        playerAttack = joker.attackPower;
        playerBaseAttack = joker.attackPower;
    } else if ($(figure).attr('id') === 'bane-figure') {
        player = bane;
        playerHealth = bane.healthPoints;
        playerAttack = bane.attackPower;
        playerBaseAttack = bane.attackPower;
    } else if ($(figure).attr('id') === 'superman-figure') {
        player = superman;
        playerHealth = superman.healthPoints;
        playerAttack = superman.attackPower;
        playerBaseAttack = superman.attackPower;
    }
}

//Loads global variables of enemy with its attributes
function defineEnemyVariables(figure) {
    if ($(figure).attr('id') === 'batman-figure') {
        enemy = batman;
        enemyHealth = batman.healthPoints;
        enemyAttack = batman.counterAttackPower;
    } else if ($(figure).attr('id') === 'joker-figure') {
        enemy = joker;
        enemyHealth = joker.healthPoints;
        enemyAttack = joker.counterAttackPower;
    } else if ($(figure).attr('id') === 'bane-figure') {
        enemy = bane;
        enemyHealth = bane.healthPoints;
        enemyAttack = bane.counterAttackPower;
    } else if ($(figure).attr('id') === 'superman-figure') {
        enemy = superman;
        enemyHealth = superman.healthPoints;
        enemyAttack = superman.counterAttackPower;
    }
}

//Updates the Player fig caption dynamically
function changePlayerFigureCaption() {
    if (player === batman) {
        $('#batman-caption').html('Batman ' + playerHealth + ' HP');
    } else if (player === joker) {
        $('#joker-caption').html('Joker ' + playerHealth + ' HP');
    } else if (player === bane) {
        $('#bane-caption').html('Bane ' + playerHealth + ' HP');
    } else if (player === superman) {
        $('#superman-caption').html('Superman ' + playerHealth + ' HP');
    }
}

//Updates the enemy fig caption dynamically
function changeEnemyFigureCaption() {
    if (enemy === batman) {
        $('#batman-caption').html('Batman ' + enemyHealth + ' HP');
    } else if (enemy === joker) {
        $('#joker-caption').html('Joker ' + enemyHealth + ' HP');
    } else if (enemy === bane) {
        $('#bane-caption').html('Bane ' + enemyHealth + ' HP');
    } else if (enemy === superman) {
        $('#superman-caption').html('Superman ' + enemyHealth + ' HP');
    }
}

//When the page loads, render the DOM, sets the character chosen by user.
//Selects enemies chosen and sets up attack button function.
$(document).ready(function() {
    $('#players').on('click', '.figure', function() {
        // Handle choosing their character
        $(this).css("border", "lime 3px solid");
        //html of select-character changes to "Your Character"
        $('#select-character').html('Your Character');
        //unclicked figures are inserted after the attack-header.
        $('.figure').not(this).insertAfter('#attack-header');
        $('.figure').not(this).css("border", "red 3px solid");
        playerSelected = true;
        definePlayerVariables(this);
    });
    //Potential enemies
    $('#potential-enemies').on('click', '.figure', function() {
        // Handle choosing the currentEnemy
        if (defenderSelected) {
            return;
        } else {
            $(this).insertAfter('#defender');
            defenderSelected = true;
            defineEnemyVariables(this);
        }


    });
    //Attack button
    $('#attack-button').on('click', function() {
        decreaseEnemyHealth();
        decreasePlayerHealth();
        playerIncreaseAttackPower();
        changePlayerFigureCaption();
        changeEnemyFigureCaption();
        gameOver();
        playerWins();
        newGame();
    });
});

//Game Over
function gameOver() {
    if (playerHealth <= 0) {
        $('#message').html('Game over, You lost all your HP.');
        restart();
        clickRestart();
    }
}

//Restart
function restart() {
    var resetButton = '<button type="button" class="btn btn-danger" id="reset-button">Restart Game</button>';

    $('#reset').html(resetButton);
}

function clickRestart() {
    $('#reset-button').on('click', function() {
        $('#select-character').html('Choose a player');
        $('.figure').insertAfter('#select-character');
        $('.figure').css('border', '2px solid yellow');
        $('#message').html('');
        $('#reset').html('');
        playerHealth = 0;
        enemyHealth = 0;
        playerAttack = 0;
        enemyAttack = 0;
        playerBaseAttack = 0;
        defenderSelected = false;
        enemiesDefeated = 0;
    });
}
//Player Wins
function playerWins() {
    if (enemyHealth <= 0) {
        $('#message').html('You defeated this enemy. Please select another enemy.');
        defenderSelected = false;
        enemiesDefeated++;
    }
}


//Game Reset
function newGame() {
    if (enemiesDefeated === 3) {
        $('#message').html('Congrats hero! You defeated all the enemies. Click restart to play again.');
        restart();
        clickRestart();
    }
}



renderCharacter('superman-figure');

function renderCharacter(id, imgsrc) {

    var figureRender = $('<figure>').addClass('figure');
    figureRender.attr('id', id);
    var img = $('<img>');
    img.attr('src', imgsrc);
}
