$(document).ready(function() {
    renderDom();
});

function renderDom() {
    chooseCharacter();
}

function chooseCharacter() {
    //User clicks on a character and character border changes to green, is
    //moved into the choose-character section, and choose 
    $(".figure").on("click", function() {
        $(this).css("border", "lime 3px solid");
        $("#choose-player").html("Your Character");
        $(".figure").not(this).insertAfter('#attack-header');
    });
}

//When user clicks a chosen enemy to fight, the chosen enemy is moved to the defender section and highlighted in orange.
//Unchosen enemeies remain in the attackable section.
function chooseEnemy() {
    $(".attack-section").on("click", function() {
        $(this).css("border", "red 3px solid");
        $(".figure").not(this).on("click").insertAfter('.defender-section');
    });
}
