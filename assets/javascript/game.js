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

var playerSelected = false;
var defenderSelected = false;
var player;
var enemy;
var playerHealth;
var enemyHealth;
var playerAttack;
var enemyAttack;
var playerBaseAttack;

//Object Logic
//Each attack by selected character  increases by base attack power
function playerIncreaseAttackPower() {
    playerAttack = playerAttack + playerBaseAttack;
}

function decreasePlayerHealth() {
    playerHealth -= enemyAttack;
}

function decreaseEnemyHealth() {
    enemyHealth -= playerAttack;
}

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

//When the page loads, render the DOM, set the character chosen variables and intialize chosen characterand enemies
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

    $('#attack-button').on('click', function() {
        decreaseEnemyHealth();
        decreasePlayerHealth();
        playerIncreaseAttackPower();
        changePlayerFigureCaption();
        changeEnemyFigureCaption();
    });
});
