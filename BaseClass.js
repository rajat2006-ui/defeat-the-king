class BaseClass{
    constructor(x, y, width, height, angle) {
      var staticOption
      var staticNum=Math.round(random(1,2))

      if(staticNum===1 && oneCount<4){
        staticOption=true
        oneCount+=1
      }
      else if(staticNum===2 && twoCount<4){
        staticOption=false
        twoCount+=1
      }

      else{
        staticOption=false
      }

        var options = {
            
            'friction':1.0,
            'density':0.2,
            'isStatic':staticOption
        }
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;
        this.image = loadImage("base.png");
        World.add(world, this.body);
      }
      display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
      }
}
