"use strict";

const squares = [
"a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", 
"b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", 
"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", 
"d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", 
"e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", 
"f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", 
"g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", 
"h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"];

var square_rects = [];
var started = false;
var show_coords = false;

var time;
var curr_square;
var score = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(37,42,52);
    draw_board();
}

function draw_board() {
    noFill();
    let cnt = 0;
    let srt = window.innerWidth / 2 - 400;
    rect(str, 50, 800, 800);
    for (let i = 0; i < 8; i ++) {
        for (let j = 7; j >= 0; j --) {
            if (cnt % 2 == 0) {
                fill(0, 0, 0);
            }
            else {
                fill(230, 230, 230);
            }
            rect(srt + (i * 100), 50 + (j * 100), 100, 100);
            square_rects.push([srt + (i * 100), 50 + (j * 100), 100, 100]);
            cnt ++;
        }
        cnt ++;
    }
}

function draw() {
    background(37,42,52);
    draw_board();
    textSize(20);
    fill(234,234,234);
    text(mouseX + ", " + mouseY, 10, 30);
    text("Score: " + score, 400, 30);
    if (started) {
        time --;
        text("Time: " + (time / 60).toFixed(2), 250, 30);
        text("Current Square: " + squares[curr_square], 550, 30);
    }
    if (time == 0) {
        started = false;
        document.getElementById("start").innerHTML = "Start";
    }
}

function mousePressed() {
    if (started) {
        if (pointInRect([mouseX, mouseY], square_rects[curr_square])) {
            curr_square = generateRandomSquare();
            score ++;
        }
    }
    else {
        // if the button with id "start" is clicked using the onclick event
        document.getElementById("start").onclick = function() {
            if (!started) {
                started = true;
                document.getElementById("start").innerHTML = "Stop";
                time = 60 * 30;
                curr_square = generateRandomSquare();
                score = 0;
            }
            else {
                started = false;
                document.getElementById("start").innerHTML = "Start";
            }
        }
    }
}

function show_coordinates() {

}

function hide_coordinates() {
    background(255, 255, 255);
    noFill();
    rect(50, 50, 800, 800);
    let cnt = 0;
    for (let i = 0; i < 8; i ++) {
        for (let j = 0; j < 8; j ++) {
            if (cnt % 2 == 0) {
                fill(0, 0, 0);
                rect(50 + (i * 100), 50 + (j * 100), 100, 100);
            }
            cnt ++;
        }
        cnt ++;
    }
}

function generateRandomSquare() {
    let rand = Math.floor(Math.random() * squares.length);
    return rand;
}

// Function that takes in an array of size 2 as a point and an array of size 4 as a rect and checks if the point is inside the rect
function pointInRect(point, rect) {
    return (point[0] >= rect[0] && point[0] <= rect[0] + rect[2] && point[1] >= rect[1] && point[1] <= rect[1] + rect[3])
}
