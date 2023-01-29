class Cannonball {
    constructor(x, y) {

        var options = {
            isStatic: true
        }
        this.r = 30
        this.body = Bodies.circle(x, y, this.r, options)
        this.image = loadImage("assets/cannonball.png")
        this.trajectory = []
        World.add(world, this.body)
    }
    remove(index) {
        setTimeout(() => {
            World.remove(world,balls[index].body);
            balls.splice(index)
        }, 2000)
    }

    shoot() {

        var newAngle = cannon.angle - 28
        newAngle = newAngle * (3.14 / 180)
        var velocity = p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body, {
            x: velocity.x * (180 / 3.14),
            y: velocity.y * (180 / 3.14)
        })



    }
    display() {
        var pos = this.body.position
        push()
        imageMode(CENTER)
        image(this.image, pos.x, pos.y, this.r, this.r)
        pop()
        if (this.body.position.x > 230 && this.body.velocity.x > 3) {
            var positions = [pos.x, pos.y]
            this.trajectory.push(positions)
        }
        for (var d = 0; d < this.trajectory.length; d++) {
            image(this.image, this.trajectory[d][0], this.trajectory[d][1], 5, 5)
        }
    }


}