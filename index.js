let els = {
    'circle_count': document.querySelector('#circle-count'),
    'sliders': {
        'circle_scalar': document.querySelector('#circle-scalar'),
        'speed': document.querySelector('#speed'),
    }
};
let tracks = [];
let radius;

function setup(){
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    radius = min(windowWidth, windowHeight) * 0.4;
    generate_tracks();
    els.circle_count.addEventListener('input', generate_tracks);
}

function draw(){
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
    let speed = parseFloat(els.sliders.speed.value);
    for(let track of tracks){
        track.update(speed);
        track.draw_line();
    }
    let scalar = parseFloat(els.sliders.circle_scalar.value);
    for(let track of tracks)
        track.draw_circle(scalar);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    radius = min(windowWidth, windowHeight) * 0.4;
    for(let track of tracks)
        track.radius = radius;
}

function generate_tracks(){
    tracks = Track.generate(
        parseInt(els.circle_count.value),
        radius
    );
}
