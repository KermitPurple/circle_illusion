let els = {
    'circle_count': document.querySelector('#circle-count'),
};

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
