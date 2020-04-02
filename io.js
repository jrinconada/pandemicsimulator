// INPUT
// Add community
function mousePressed() {
  if (mouseY > height - 100) return; // Check input area
  communities[n] = createCommunity();
  n++;
}
// Start pandemic
function keyReleased() {
  if (keyCode == ENTER) {
    let community = int(random(n)); // Random community
    let patient = int(random(communities[community].length)); // Random person
    if (communities[community][patient].state != 1) {
      communities[community][patient].state = 1; // Patient 0
      infected++;
    }
  }
  return false;

}
// Parameter control
let probability_of_infection;
let days_of_infection;
let speed;
function controls() {
  var x = 20;
  var y = height - 60;
  let margin = 25;
  let w = 80;
  probability_of_infection = createSlider(0, 100, 50, 1);
  probability_of_infection.position(x, y);
  probability_of_infection.style('width', w + 'px');
  days_of_infection = createSlider(5, 20, 10, 1);
  days_of_infection.position(x, y += margin);
  days_of_infection.style('width', w + 'px');  
  speed = createSlider(25, 250, 100, 25);
  speed.position(x, y += margin);
  speed.style('width', w + 'px');
}
function labels() {
  textAlign(LEFT);
  textSize(12);  
  fill(COLORS[1]);
  text(probability_of_infection.value() + ' % probability of infection', probability_of_infection.x * 2 + probability_of_infection.width, probability_of_infection.y);
  fill(COLORS[3]);
  text(days_of_infection.value() + ' contagious days', days_of_infection.x * 2 + days_of_infection.width, days_of_infection.y);
  fill(COLORS[2]);
  text(' A day lasts ' + speed.value() * 0.01 + ' seconds', speed.x * 2 + speed.width, speed.y);
}

// OUTPUT
function info() {
  noStroke();  
  var x = width - 50;
  var y = height - 60;
  let margin = 15;
    
  textAlign(LEFT);
  textSize(11);  
  fill(COLORS[3]);
  text('days', x, y);
  fill(COLORS[0]);
  text('people', x, y += margin);
  fill(COLORS[1]);
  text('infected', x, y += margin);
  fill(COLORS[2]);
  text('cured', x, y += margin);
  
  x -= 5;
  y = height - 60;
  textAlign(RIGHT);
  textSize(11);
  fill(COLORS[3]);
  text(days, x, y);
  fill(COLORS[0]);
  text(people, x, y += margin);
  fill(COLORS[1]);
  text(infected, x, y += margin);
  fill(COLORS[2]);
  text(cured, x, y += margin);
}

function instructions() {
  if (infected > 0) return; // Pandemic started
  noStroke();  
  var x = width / 2;
  var y = 35;
    
  textAlign(CENTER);
  textSize(17);  
  if (n == 0) { // No communities created
    fill(COLORS[0]);
    text('Click to add people', x, y);
  } else { // Pandemic not started
    fill(COLORS[1]);
    text('Enter to start the pandemic', x, y);
  }
}

function attribution() {  
//   noStroke();  
//   textAlign(CENTER);
//   textSize(17);  
//   fill(COLORS[0] + 'CC');
//   text('Made by Juan Rinconada', width / 2, height - 30);
  let link = createA('https://jrinconada.github.io/','Made by Juan Rinconada');
  link.position(width / 2, height - 30);
}