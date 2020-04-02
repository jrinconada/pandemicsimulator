// Simulation Speed
const FRAME_RATE = 30;
var seconds_per_day;
// Communities
const MIN_POPULATION = 10;
const MAX_POPULATION = 150;
const MIN_EXPANSION = 20;
const MAX_EXPANSION = 50;
// Virus
const RADIUS_OF_INFECTION = 2;
// Population
let communities = [];
var n = 0,
  people = 0,
  infected = 0,
  cured = 0,
  days = 0;

function setup() {
  createCanvas(1280, 720);
  background(30);
  frameRate(FRAME_RATE);
  controls();
  attribution();
}

function draw() {
  background(30);
  // One day of movement
  days_per_second = int(speed.value() * 0.01 * FRAME_RATE)  
  if (frameCount % days_per_second == 0) {        
    move(); // Moving and infecting loop
    travel(); // Travel between communities    
    if (infected > 0) days++; // One day passed
  }

  // Show dots
  paint();  
  // Show info
  info();
  instructions();
  labels();  
}

function createCommunity() {
  let population = int(random(MIN_POPULATION, MAX_POPULATION));
  let expansion = random(MIN_EXPANSION, MAX_EXPANSION);
  let community = [];
  let center = createVector(mouseX, mouseY);

  for (let i = 0; i < population; i++) {
    community[i] = new Person(center.copy(), expansion);
    // community[i].paint();
  }
  people += population;
  return community;
}

function move() {  
  for (let i = 0; i < communities.length; i++) {
    for (let j = 0; j < communities[i].length; j++) {
      communities[i][j].move();      
      infect(communities[i][j], communities[i]);
    }
  }
}

function infect(patient, community) {
  if (patient.state != 1) return; // If not sick  
  for (let i = 0; i < community.length; i++) {
    let person = community[i];
    // Person is not sick and it hasnt been sick
    // Person is within the radius of contagion    
    if (person.state == 0 &&
      patient.position.dist(person.position) <= RADIUS_OF_INFECTION) {
      // Probability of infection      
      if (random(100) < probability_of_infection.value()) {
        person.state = 1; // Infected !!!
        infected++;
      }
    }
  }
}

function travel() {
  for (let i = 0; i < communities.length; i++) {
    let traveler_origin = int(random(communities[i].length)); // Pick a random traveler
    let destination = int(random(communities.length)); // Pick a random destination
    let traveler_destination = int(random(communities[destination].length)); // Pick a traveler from destination to swap
    let traveler = communities[i][traveler_origin];
    let swap = communities[destination][traveler_destination];
    let copy = Object.assign({}, traveler);
    traveler.home = swap.home;
    traveler.expansion = swap.expansion;
    swap.home = copy.home;
    swap.expansion = copy.expansion;
    communities[destination][traveler_destination] = traveler;
    communities[i][traveler_origin] = swap;
  }
}


function paint() {
  for (let i = 0; i < communities.length; i++) {
    for (let j = 0; j < communities[i].length; j++) {      
      communities[i][j].paint();      
    }
  }
}