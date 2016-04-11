"use strict";


function generateShapeCheck(x, y) {
    if (gridArray[x][y] == 0) {
        //console.log("free");
        return 0
    } else {
        //console.log("occupied");
        return 1;
    }
}

//modify grid array to occupied
function changeGridValue(theArray) {
    for (var i = 0; i < 4; i++) {
        var res = splitString(theArray[i]);
        var a = res[0];
        var b = res[1];
        gridArray[a][b] = colorValue;
    }
}

function colorDivs(j, theArray) {
    //var colors = ["white","red","blue","orange","yellow","magenta","cyan","lime"];
    //colors is global ary//j stores the current value of color
    var color = colors[j];
    for (var i = 0; i < 4; i++) {
        document.getElementById(theArray[i]).style.backgroundColor = color;
    }

}


function splitString(text) {
    return text.split(" ");
}


function Shape(shapeAry) {
    //svar f = new Array(4);
    f = new Array(4);
    var flag = 0;
    for (var i = 0; i < 4; i++) {
        var res = splitString(shapeAry[i]);
        var a = res[0];
        var b = res[1];


        if (generateShapeCheck(a, b) != 0) {
            flag = 1;
            //f[i] = a+" "+b;
            //f = shapeAry;
            break;
        } else {
            //a++;
            f[i] = a + " " + b;
        }
    }
    if (flag == 0) {
        colorDivs(colorValue, f);
        return f;
    } else {
        gameOver();
        return;
    }
}




function jShapeDrop(theArray) {
    //debugger;
    if (end == true) {
        return;
    }
    f = new Array(4);
    var flag = 0;
    //f = [];
    //var i =0;
    for (var i = 0; i < 4; i++) {
        //var res = theArray[i].split(" ");
        var res = splitString(theArray[i]);
        var a = res[0];
        var b = res[1];
        a++;

        if (generateShapeCheck(a, b) != 0) {
            flag = 1;
            //f[i] = a+" "+b;
            f = theArray;
            break;
        } else {
            //a++;
            f[i] = a + " " + b;
        }


    }

    f.sort(function (a, b) {
        return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
    });
    //stackoverflow
    if (flag == 0) {

        colorDivs(0, theArray);
        colorDivs(colorValue, f);
        //disapper1();

        if (a < imax) {
            //moveLR(1,f);

            setTimeout(function () {
                jShapeDrop(f);
            }, delay);


        } else {
            changeGridValue(f);
            // debugger;
            disapper1();
            disapper1();
            computeScore();
            // oldDelay = delay;
            generateShape();

        }
    } else {
        changeGridValue(theArray);
        //debugger;
        disapper1();
        disapper1();
        computeScore();
        //oldDelay = delay;
        generateShape();
    }


}




function moveLR(j, theArray) {
    //console.log(f);
    //debugger;
    f = new Array(4);
    var flag = 0;
    for (var i = 0; i < 4; i++) {
        //var res = theArray[i].split(" ");
        var res = splitString(theArray[i]);
        var a = res[0];
        var b = res[1];
        var b = parseInt(b);
        b = b + (1 * j);



        if (generateShapeCheck(a, b) != 0) {
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

    } else {
        //alert("cannot move");
        //gameOver()
    }

}


function disapper1() {
    //var imax = 20;
    //var jmax = 10;
    var flag = true;
    //count = 0;

    /*
		Goes through entire gridarray and check if any all the divs in row have value equal to zero
		zero implies that row is not fully occupied.
    */
    for (var i = imax - 1; i >= 0; i--) {

        for (var j = 0; j < jmax; j++) {
            if (gridArray[i][j] == 0) {
                flag = false;
                break;
            }

            if (j == jmax - 1) {
                count++;
            }


        }

        /*
        	It means that there is a row where all the divs are occupied
        */

        if (flag == true) {

            disapper2(i);

        }
        flag = true;
    }
}

/*
	where population occurs 
*/


function disapper2(row) {

    // debugger;
    var flag = true;
    for (var j = 0; j < jmax; j++) {
        document.getElementById(row + " " + j).style.backgroundColor = colors[0];
    }

    //code to get every block down
    for (var i = row - 1; i >= 0; i--) {
        for (j = 0; j < jmax; j++) {
            var k = i + 1;
            document.getElementById(i + " " + j).style.backgroundColor = colors[0];
            document.getElementById(k + " " + j).style.backgroundColor = colors[gridArray[i][j]];
            gridArray[k][j] = gridArray[i][j];
            gridArray[i][j] = 0;

        }
    }

}

function computeScore() {

    if (count > 0) {
        score = score + (10 * level * count);
        rowsClear = rowsClear + count;
        document.getElementById("rowsClearNo").innerHTML = "Rows Cleared: " + rowsClear;
        document.getElementById("score").innerHTML = "Score: " + score;
        count = 0;
    }


}