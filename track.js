class Track{
    constructor(
        offset,
        radius,
        center = null
    ){
        this.theta = offset;
        this.offset = offset;
        this.radius = radius;
        this.center = center ?? createVector(0, 0);
        this.colors = {
            'fill_fn': Track.default_color_fn,
            'border': color('white'),
            'line': color('grey'),
        };
    }

    draw_line(){
        let start = createVector(
            this.center.x + this.radius,
            this.center.y
        );
        let end = createVector(
            this.center.x - this.radius,
            this.center.y
        );
        push();
        stroke(this.colors.line);
        fill(this.colors.line);
        rotate(this.offset);
        line(
            start.x,
            start.y,
            end.x,
            end.y,
        );
        let d = 3;
        circle(start.x, start.y, d);
        circle(end.x, end.y, d);
        pop();
    }

    draw_circle(radius_scalar = 0.1, draw_border, draw_fill){
        let pos = createVector(
            this.radius * cos(this.theta) + this.center.x,
            this.center.y
        );
        push()
        rotate(this.offset);
        if(draw_border)
            stroke(this.colors.border);
        else
            noStroke();
        if(draw_fill){
            let c = null;
            try{
                c = this.colors.fill_fn(this.theta, this.offset);
            }catch(e){}
            fill(c ?? 'red');
        }else
            noFill();
        circle(pos.x, pos.y, this.radius * radius_scalar);
        pop();
    }

    update(speed){
        this.theta += speed;
        this.theta %= 360;
    }

    static generate(count, radius){
        let tracks = [];
        for(let i = 0; i < count; i++){
            let angle = i / count * 180
            tracks.push(new Track(
                angle,
                radius
            ));
        }
        return tracks;
    }

    static default_color_fn(degrees, _offset) {
        push();
        colorMode(HSL)
        let c = color(degrees, 100, 50);
        pop();
        return c;
    }
}
