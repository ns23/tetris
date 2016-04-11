"use strict";

/*Global Variables*/
var gridArray;
var myArray;
var f;

var delay = 500;
var dropDelay = 100;
var oldDelay = delay;

var colors = ["transparent", "red", "blue", "orange", "yellow", "magenta", "cyan", "lime"];
var colorValue;

var imax = 21;
var jmax = 10;
var score = 0;
var level = 1;
var count = 0;
var rowsClear = 0;

var timeout;
var end = false;
var shapeId = generateRandomInt(1, 7);
var isPaused;

function timer(t) {
    //oldDelay =  delay;
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;
    document.getElementById("time").innerHTML = minutes + ":" + seconds;

    //t = t+1;

    //console.log(t);
    if (t % 30 == 0) {
        //delay -= delay-50;
        if (delay == dropDelay) {
            delay = oldDelay;
        }
        delay -= 50;
        oldDelay = delay;
        //dropDelay = dropDelay-5;
        dropDelay -= 5;
        level++;
        //document.getElementById("level").innerHTML = "<h3>Level :"+level+"</h3>";
        document.getElementById("levelNo").innerHTML = level;
    }
    t++;
    timeout = setTimeout(function() {
        timer(t);
    }, 1000);
}


function createGrid() {


    gridArray = new Array();

    for (var i = 0; i <= imax; i++) {
        gridArray[i] = new Array();

        for (var j = 0; j < jmax; j++) {

            if (i < 21) {
                gridArray[i][j] = 0;
                var index = i + " " + j;
                var div = document.createElement('div');

                if (i != 0) {
                    div.setAttribute('class', 'gridCells');
                    //div.innerHTML=index;
                }

                div.setAttribute('id', index);
                document.getElementById('grid').appendChild(div);
            } else {
                gridArray[i][j] = 1;

            }

        }
    }




}


function checkKeyPressed(e) {
    if (e.keyCode == "37") {
        //alert("The 'left' key is pressed.");
        moveLR(-1, f);

    } else if (e.keyCode == "38") {
        // down arrow
        rotate(2, f);
    } else if (e.keyCode == "39") {
        //alert("The 'right' key is pressed.");
        moveLR(1, f);
    } else if (e.keyCode == "40") {
        // right arrow

        changeDelay(dropDelay);
    }
    /*else if(e.keyCode == "32")
        {
        	//space
        	pause();
        }*/
}

function checkKeyReleased(e) {

    if (e.keyCode == "40") {
        changeDelay(oldDelay);
        //oldDelay = delay;
        delay = oldDelay;
    } else if (e.keyCode == "32") //spacebar to pause the game
    {
        pause();
    } else if (e.keyCode == "18") //alt to stop the game
    {
        gameOver();
    } else if (e.keyCode == "17") //ctrl to stop the game
    {
        if (isPaused != true) {
            reload();
        }

    } else if (e.keyCode == "13") //ctrl to stop the game
    {
        if (isPaused != true) {
            generateShape();
            timer(1);
            initValue();
        }
    }

}

function changeDelay(x) {
    delay = x;
}

function reload() {
    document.getElementById("start").disabled = false;
    window.location.reload();
    return;
}

function initValue() {


    document.getElementById("levelNo").innerHTML = level;
    //document.getElementById("time").innerHTML = "00:00" ;
    document.getElementById("rowsClearNo").innerHTML = "Rows Cleared: " + rowsClear;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("start").disabled = true;
    document.getElementById("reload").disabled = true;
    isPaused = true;


}


window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyReleased, false);

function generateShape() {

    /* function to select which shape to generate  */
    //var x = generateRandomInt(1,7);
    if (end == true) {
        return;
    }
    var x = shapeId;
    colorValue = x;
    shapeId = generateRandomInt(1, 7);
    //console.log("next shape is "+shapeId)
    showNextShape(shapeId);

    //var x = 2;
    //console.log(x);

    /*window.addEventListener("keydown",checkKeyPressed,false);
    window.addEventListener("keyup",checkKeyReleased,false);*/


    switch (x) {
        case 1:
            //generate i

            var shapeArray = new Array(4);
            shapeArray = ['0 3', '0 4', '0 5', '0 6'];
            myArray = Shape(shapeArray); //return id of colored divs

            //iShapeDrop(myArray);
            jShapeDrop(myArray);

            break;

        case 2:
            //generate j
            var shapeArray = new Array(4);
            shapeArray = ['0 3', '0 4', '0 5', '1 5'];
            myArray = Shape(shapeArray);
            jShapeDrop(myArray);
            break;

        case 3:
            //generate l
            var shapeArray = new Array(4);
            shapeArray = ['0 4', '0 5', '0 3', '1 3'];
            myArray = Shape(shapeArray);
            jShapeDrop(myArray);
            break;

        case 4:
            //generate o
            var shapeArray = new Array(4);
            shapeArray = ['0 3', '0 4', '1 3', '1 4'];
            myArray = Shape(shapeArray);
            jShapeDrop(myArray);
            break;

        case 5:
            //generate s
            var shapeArray = new Array(4);
            shapeArray = ['1 3', '0 5', '0 4', '1 4'];
            myArray = Shape(shapeArray);
            jShapeDrop(myArray);
            break;

        case 6:
            //generate t
            var shapeArray = new Array(4);
            shapeArray = ['0 3', '0 5', '0 4', '1 4'];
            myArray = Shape(shapeArray);
            jShapeDrop(myArray);
            break;

        case 7:
            //generate z
            var shapeArray = new Array(4);
            shapeArray = ['0 3', '1 5', '0 4', '1 4'];
            myArray = Shape(shapeArray);
            jShapeDrop(myArray);
            break;

        default:
            alert("error value of x is " + x);
            break;
    }

}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    //http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
}

function rotate(axis, theArray) {
    //debugger;
    f = new Array(4);
    var flag = 0;

    var res = splitString(theArray[axis]);
    var x = parseInt(res[0]);
    var y = parseInt(res[1]);
    var c;

    for (var i = 0; i < 4; i++) {

        var res = splitString(theArray[i]);
        var a = parseInt(res[0]);
        var b = parseInt(res[1]);
        //var b = parseInt(b);
        a = x - a;
        b = y - b;

        c = a;
        a = b; //x
        b = c * (-1); //y

        a = a + x;
        b = b + y;

        if (a < 0) {
            flag = 1;
            //f[i] = a+" "+b;
            f = theArray;
            break;
        } else if (generateShapeCheck(a, b) != 0) {
            flag = 1;
            //f[i] = a+" "+b;
            f = theArray;
            break;
        } else {
            //a++;
            f[i] = a + " " + b;
        }


    }

    if (flag == 0) {

        colorDivs(0, theArray);
        colorDivs(colorValue, f);

    }
    /*else
    {
    	//alert("cannot move");
    	console.log("connot rotate");
    }*/

}


function showNextShape(id) {

    switch (id) {
        case 1:
            //i shape
            var nextShapeId = [4, 5, 6, 7];
            generateNextShape(id, nextShapeId);
            break;

        case 2:
            //jshape
            var nextShapeId = [4, 5, 6, 10];
            generateNextShape(id, nextShapeId);
            break;

        case 3:
            //lshape
            var nextShapeId = [4, 5, 6, 8];
            generateNextShape(id, nextShapeId);
            break;

        case 4:
            //oshape
            var nextShapeId = [5, 6, 9, 10];
            generateNextShape(id, nextShapeId);
            break;

        case 5:
            //s shape
            var nextShapeId = [10, 9, 6, 7];
            generateNextShape(id, nextShapeId);
            break;

        case 6:
            //t shape
            var nextShapeId = [10, 5, 6, 7];
            generateNextShape(id, nextShapeId);
            break;

        case 7:
            //zShape
            var nextShapeId = [4, 5, 9, 10];
            generateNextShape(id, nextShapeId);
            break;

        default:
            break;

    }

}

function generateNextShape(colorValue, theArray) {
    clearNextShape();
    var color = colors[colorValue];
    for (var i = 0; i < 4; i++) {
        document.getElementById(theArray[i]).style.backgroundColor = color;
    }

}

function clearNextShape() {
    var color = colors[0];
    for (var i = 1; i < 12; i++) {
        document.getElementById(i).style.backgroundColor = color;
    }
}

function pause() {
    if (isPaused == true) {
        alert("game is paused");
    } else {
        alert("Please start the game first");
    }

    //clearTimeout(t)
}

function gameOver() {
    if (isPaused == true) {
        clearTimeout(timeout);
        end = true;
        document.getElementById("reload").disabled = false;
        isPaused = false;
        document.cookie = "username=John Doe";
        alert("The game is over.Reload page to play again");
    } else {
        alert("Please start game first");
    }

}