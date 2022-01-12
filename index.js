let els = {
    'circle_count': document.querySelector('#circle-count'),
    'circle_border': document.querySelector('#border'),
    'circle_fill': document.querySelector('#fill-box'),
    'color_type': document.querySelector('#color-type'),
    'circle_fill_color': document.querySelector('#fill-color'),
    'circle_fill_fn': document.querySelector('#fill-fn'),
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
    els.color_type.addEventListener('input', ()=>{
        switch(els.color_type.value){
            case 'rainbow':
                set_rainbow_fill_color();
                els.circle_fill_color.classList.add('hidden');
                els.circle_fill_fn.classList.add('hidden');
                break;
            case 'static':
                set_static_fill_color();
                els.circle_fill_color.classList.remove('hidden');
                els.circle_fill_fn.classList.add('hidden');
                break;
            case 'function':
                set_fn_fill_color();
                els.circle_fill_color.classList.add('hidden');
                els.circle_fill_fn.classList.remove('hidden');
        }
    });
    els.circle_fill_fn.addEventListener('input', set_fn_fill_color);
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

function set_rainbow_fill_color(){
    set_fill_color(Track.default_color_fn);
}

function set_static_fill_color(){
    set_fill_color(()=>color(els.circle_fill_color.value));
}

function set_fn_fill_color(){
    let f = null;
    try{
        f = new Function('degrees', 'offset', els.circle_fill_fn.value)
    }catch(e){}
    set_fill_color(f);
}

function set_fill_color(func){
    for(let track of tracks)
        track.colors.fill_fn = func;
}
