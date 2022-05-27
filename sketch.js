// import * as library from './src/index.js'

let c;
let x;
let y;
let mag = 50;
let d = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
    newColor()
    x = windowWidth / 2
    y = windowHeight / 2
}

function draw() {
    // background(0);
    x += mag * 2 * (noise(Date.now()) - 0.5)
    y += mag * 2 * (noise(Date.now() + 10000) - 0.5)

    // Keep within the bounds of the screen
    if (x <= -d / 2) {
        x = windowWidth + d / 2
        newColor()
    }
    if (x > windowWidth + d / 2) {
        x = -d / 2
        newColor()
    }

    if (y <= -d / 2) {
        y = windowHeight + d / 2
        newColor()
    }
    if (y > windowHeight + d / 2) {
        y = -d / 2
        newColor()
    }

    noStroke();
    fill(c);
    ellipse(x, y, d);
}

function newColor() {
    c = color(255 * Math.random(), 255 * Math.random(), 255 * Math.random())
}