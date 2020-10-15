function Vehicle(x, y, start_x=random(width), start_y=random(height)){
  this.pos = createVector(start_x, start_y)
  this.vel = p5.Vector.random2D()
  this.acc = createVector()
  this.target = createVector(x, y)
  this.radius = 4
  this.maxspeed = 7
  this.maxforce = 0.5
}
Vehicle.prototype.behaviors = function(){
  arrive = this.arrive(this.target)
  this.applyForce(arrive)
}

Vehicle.prototype.applyForce = function(f){
  this.acc.add(f)
}

Vehicle.prototype.update = function(){
  this.pos.add(this.vel)
  this.vel.add(this.acc)
  this.acc.mult(0)
}

Vehicle.prototype.show = function(){
  stroke(255, 255, 255)
  strokeWeight(this.radius)
  point(this.pos.x, this.pos.y)
}

Vehicle.prototype.arrive = function(target){
  desired = p5.Vector.sub(target, this.pos)
  distance = desired.mag()
  speed = this.maxspeed
  if (distance < 100){
    speed = map(distance, 0, 100, 0, this.maxspeed)
  }
  desired.setMag(speed)
  steer = p5.Vector.sub(desired, this.vel)
  steer.limit(this.maxforce)
  return steer

}

Vehicle.prototype.seek = function(target){
  desired = p5.Vector.sub(target, this.pos)
  desired.setMag(this.maxspeed)
  steer = p5.Vector.sub(desired, this.vel)
  steer.limit(this.maxforce)
  return steer

}
