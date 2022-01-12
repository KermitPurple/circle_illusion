class Track{
    constructor(
        offset,
        radius,
        color_fn = null,
        line_color_fn = null,
        center = null
    ){
        this.theta = offset;
        this.offset = offset;
        this.radius = radius;
        this.color_fn = color_fn ?? function(degrees) {
            push();
            colorMode(HSL)
            let c = color(degrees, 100, 50);
            pop();
            return [color('white'), c];
        }
        this.line_color_fn = line_color_fn ?? function(_degrees){
            let c = color('grey');
            return [c, c];
        }
        this.center = center ?? createVector(0, 0);
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
        let [s, f] = this.line_color_fn(this.tehta);
        push();
        stroke(s);
        fill(f);
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
        let [s, f] = this.color_fn(this.theta);
        push()
        rotate(this.offset);
        stroke(s);
        fill(f);
        if(!draw_border)
            noStroke();
        if(!draw_fill)
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
}
