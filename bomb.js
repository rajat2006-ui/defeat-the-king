class Bomb{
  constructor(x,y){
    var options={}
    this.body = Bodies.circle(x, y, 20,{density:0.4,'frictionAir':0.039});
    this.radius=20
    World.add(world, this.body);
  }

  display() {
    var angle = this.body.angle;
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(angle);
    ellipseMode(RADIUS);
    ellipse(0,0,this.radius,this.radius)
    pop();
  }
}
