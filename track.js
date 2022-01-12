class Track{
    constructor(
        theta,
        offset,
        radius,
        color_fn = null,
        center = null
    ){
        this.theta = theta;
        this.offset = offset;
        this.radius = radius;
        this.color_fn = color_fn ?? degrees => {
            push();
            colorMode(HSL)
            let c = color(degrees, 100 50);
            pop();
            return c;
        }
        this.center = center ?? createVector(0, 0);
    }

    draw_line(){
        let start = rotate(
            this.offset,
            createVector(
                Math.floor(this.center.x + this.radius),
                this.center.y
            ),
            this.center
        );
        let end = rotate(
            this.offset,
            createVector(
                Math.floor(this.center.x - this.radius),
                this.center.y
            ),
            this.center
        );
        line(start, end);
    }

    draw_circle(){
    }

    draw(){
    }
}

function rotate(angle, point, center = null){
    return createVector(
        Math.floor(center.x + Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y)),
        Math.floor(center.y + Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y)),
    );
}
