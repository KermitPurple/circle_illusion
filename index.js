let els = {
    'circle_count': document.querySelector('#circle-count'),
    'circle_border': document.querySelector('#border'),
    'circle_fill': document.querySelector('#fill'),
    'color-type': document.querySelector('#color-type'),
    'circle_fill_color': document.querySelector('#fill-color'),
    'draw_lines': document.querySelector('#draw-lines'),
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
    els.circle_count.addEventListener('input', ()=>{
        if(parseInt(els.circle_count.value) > parseInt(els.circle_count.max))
            els.circle_count.value = els.circle_count.max;
        generate_tracks();
    });
}

function draw(){
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
    let speed = parseFloat(els.sliders.speed.value);
    if(els.draw_lines.checked)
        for(let track of tracks)
            track.draw_line();
    let scalar = parseFloat(els.sliders.circle_scalar.value);
    for(let track of tracks){
        track.draw_circle(
            scalar,
            els.circle_border.checked,
            els.circle_fill.checked,
        );
        track.update(speed);
    }
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

function set_fill_static_color(){
    for(let track of tracks)
        track.colors.fill_fn = () => color(els.circle_fill_color.value);
}
