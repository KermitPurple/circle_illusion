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
        let start = rotate_around(
            this.offset,
            createVector(
                this.center.x + this.radius,
                this.center.y
            ),
            this.center
        );
        let end = rotate_around(
            this.offset,
            createVector(
                this.center.x - this.radius,
                this.center.y
            ),
            this.center
        );
        let [s, f] = this.line_color_fn(this.tehta);
        stroke(s);
        fill(f);
        line(
            start.x,
            start.y,
            end.x,
            end.y,
        );
        let d = 3;
        circle(start.x, start.y, d);
        circle(end.x, end.y, d);
    }

    draw_circle(){
        let pos = rotate_around(
            this.offset,
            createVector(
                this.radius * cos(this.theta) + this.center.x,
                this.center.y
            ),
            this.center
        );
        let [s, f] = this.color_fn(this.theta);
        stroke(s);
        fill(f);
        circle(pos.x, pos.y, 20);
    }

    update(){
        this.theta += 1;
        this.theta %= 360;
    }

    static generate(count, radius){
        console.log(count);
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

function rotate_around(angle, point, center = null){
    return createVector(
        center.x + cos(angle) * (point.x - center.x) - sin(angle) * (point.y - center.y),
        center.y + sin(angle) * (point.x - center.x) + cos(angle) * (point.y - center.y),
    );
}
