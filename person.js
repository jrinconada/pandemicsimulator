const SIZE = 3;
const COLORS = ['#c8c8c8', '#f65c78', '#8cba51', '#79bac1']; // White, Red, Green, Blue

class Person {
  constructor(home, expansion) {
    this.home = home;
    this.expansion = expansion;
    this.position = this.randomPlace();
    this.state = 0; // 0 - Sane, 1 - Infected, 2 - Inmune (recovered or death)
    this.days_infected = 0;
  }
  
  paint() {
    this.position.add(this.step); // Move
    stroke(COLORS[this.state]);      
    strokeWeight(SIZE);    
    point(this.position.x, this.position.y); // Paint
  }
  
  move() {    
    let destination = this.randomPlace();    
    this.step = p5.Vector.sub(destination, this.position).div(days_per_second);
    this.checkInfection();  
  }
  
  randomPlace() {
    let distance = random(this.expansion);
    let move = p5.Vector.random2D().mult(distance);
    return p5.Vector.add(this.home, move);
  }
  
  checkInfection() {
    if (this.state == 1) { 
      if (this.days_infected < days_of_infection.value()) {
        this.days_infected++; // One more day infected
      } else {
        this.state = 2 // Inmune
        cured++;
      }
    }
  }
}