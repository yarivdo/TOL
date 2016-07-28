//  Slot0
//  Slot1   Slot3
//  slot2   slot4   Slot5




// Some globals and color keys
var red = "rgb(255, 0, 0)";
var blue = "rgb(0, 0, 255)";
var green = "rgb(173, 255, 47)";
var grey = "rgb(242, 242, 242)";
var counter = 0;
var numberOfMoves;
var discChosen = false;
var chosenDisc;
var chosenDiscColor;
var iCanMove = false;
var iCanBeDropped = false;


$(document).ready(startHere);

function startHere() {
    $('TD').click(clickCell);
    setupPlate(counter);

}

function clickCell() {
    var cellClicked = $(this).attr('data-cell');
    $('#head').html(cellClicked);

    var myColor = $(this).css('backgroundColor');


    if (myColor == (grey) && discChosen == true) {
        
        // first check if ther destination is valid
        iCanBeDropped = checkDropRules(cellClicked);
        if (iCanBeDropped) {
            $(this).css({"background-color": chosenDiscColor}); // copy the color from the origin disc
            $(this).css({"border": "solid 5px white"}); // cancel the border so it cancels the choice--visual- indication
            $("td").each(function () { // run through the table and color in grey the origin disc
            var id = $(this).attr("data-cell");
            if (id == chosenDisc) {
                $(this).css({"background-color": grey });
                $(this).css({ "border": "solid 5px white"});
            }
        });
        discChosen = false; //reset
            
        }
    } else if (myColor != (grey) && discChosen == false) {
        // First see if the chosen disc can move
        var iCanMove = checkPickRules(cellClicked);
        if (iCanMove) {
            discChosen = true;
            chosenDisc = cellClicked;
            chosenDiscColor = myColor;
            $(this).css({
                "border": "solid 5px black"
            });

        } else {
            //let's guive some kind of effect to tell the user that this disc cannot move
            $(this).fadeOut(300);
            $(this).fadeIn(300);
        }


    } else {
        //do nothing really
    }
}

//This function makes sure the disc which was picked can be moved
function checkPickRules(discNumber) {
    if (discNumber == 2) {
        //need No 1 to be cleared
        if ($('#td1').css('backgroundColor') == grey) {
            return true;
        }
    } else if (discNumber == 1) {
        //need number 0 to be cleared 
        if ($('#td0').css('backgroundColor') == grey) {
            return true;
        }
    } else if (discNumber == 4) {
        // need number 3 to be cleared
        if ($('#td3').css('backgroundColor') == grey) {
            return true;
        }
    } else if (discNumber == 0 || discNumber == 3 || discNumber == 5) {
        return true;
    } else {
    return false;
    }
}

//This function checks whether or not the destination is valid
// For example: if destination id td0, then 
function checkDropRules(discNumber) {
    if(discNumber == 0 && chosenDisc == 1) {
        return false;
    } else if (discNumber == 0 && $('#td1').css('backgroundColor') == grey){
        return false;
        
    }else if (discNumber == 1 && chosenDisc == 2){
        return false;
    } else if (discNumber ==1 && $('#td2').css('backgroundColor') == grey) {
        return false;
        
    }else if (discNumber == 3 && chosenDisc == 4) {
        return false;
    } else if(discNumber == 3 && $('#td4').css('backgroundColor') == grey) {
        return false;
        
    }else {
        return true;
    }
    
    
}



function setupPlate(count) {
    if (count == 0) {
        //User's discs
        $('#td0').css({"background-color": grey });
        $('#td1').css({"background-color": red  });
        $('#td2').css({"background-color": green});
        $('#td3').css({"background-color": grey });
        $('#td4').css({"background-color": blue });
        $('#td5').css({"background-color": grey });


        //Target's discs
        NumberOfMoves = 3;
        /*
        

                Target0.Image = greyImage;
                Target1.Image = blueButton;
                Target2.Image = greenButton;
                Target3.Image = greyImage;
                Target4.Image = redButton;
                Target5.Image = greyImage;
*/
    }
}
