let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const inventoryItems = document.querySelector("#inventoryItems");
const game = document.querySelector("#game");
const controls = document.querySelector("#controls");
const monster1image= document.querySelector("#monster1");
const monster2image= document.querySelector("#monster2");
const monster3image= document.querySelector("#monster3");

monster1image.classList.add('invisible');
monster2image.classList.add('invisible');
monster3image.classList.add('invisible');
//enable keys for clicks

document.addEventListener('keydown', function(e) {
    if(e.keyCode === 49) {
    console.log("document: up pressed");
    button1.click();
    }
    else if (e.keyCode === 50){
        button2.click();
    }
    else if (e.keyCode===51){
        button3.click();
    }
});
//end


const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    backdrop: "#00FF00",
    textColor: "black",
    image: monster2image
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    backdrop: "#ff00ff",
    textColor: "black",
    image: monster3image
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    backdrop: "#FFFF00",
    textColor: "black",
    image: monster1image
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];
inventoryItems.innerText = inventory;
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = saveGame;
button5.onclick = loadGame;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  inventoryItems.innerText = inventory;
  monster1image.classList.add('invisible');
  monster2image.classList.add('invisible');
  monster3image.classList.add('invisible');
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
  inventoryItems.innerText = inventory;
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
  inventoryItems.innerText = inventory;
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
  inventoryItems.innerText = inventory;
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterStats.style.backgroundColor = monsters[fighting].backdrop;
  monsterStats.style.color = monsters[fighting].textColor;
monsters[fighting].image.classList.toggle('invisible');
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;

}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    inventoryItems.innerText = inventory;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
//constantly checks character for dead.
setInterval(checkDeath, 50);

function checkDeath(){
if(health <= 0){
    lose();
}
}

function lose() {
    game.style.backgroundColor = "red";
    update(locations[5]);
}

function winGame() {
  update(locations[6]);
  game.style.backgroundColor = "yellow";
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
  game.style.backgroundColor="#FFFFFF";

}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
//adds chance to lose weapon during easteregg
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
        inventoryItems.innerText = inventory;
      }


}
//adds save functionality

function saveGame(){
    let playerSave = {
        health: health,
        xp: xp,
        gold: gold
    }
    console.log(playerSave.health + " " + playerSave.gold +" "+ playerSave.xp);
let playerSave_serialized = JSON.stringify(playerSave);
    localStorage.setItem("savedGame",playerSave_serialized);
    console.log(localStorage.savedGame);
    console.log(playerSave_serialized);
let playerSave_decoded = JSON.parse(localStorage.getItem("savedGame"));
text.innerText += "XP, Gold, and Health successfully saved.";
console.log(playerSave_decoded);
}


//adds load functionality
function loadGame(){
    restart();
    let playerSave_decoded = JSON.parse(localStorage.getItem("savedGame"));
    xp = playerSave_decoded.xp;
    gold = playerSave_decoded.gold;
    health = playerSave_decoded.health;
    console.log(health);
    healthText.innerText = health;
    xpText.innerText = xp;
    goldText.innerText = gold;
    text.innerText += `\n\nGame successfully loaded. You have ${health} health, ${xp} xp, & ${gold} gold.`;
}





//Things added:
//increased game size
//added possibility of weapon break during easteregg game
//changed background on death
//Made inventory constantly visible
//Changed monster stats background depending on monster.
//updated visuals.
//select option by button press instead of click.
//constantly checks for player death.
//save function added
//load function added
//add photos of beasts we're fighting.

//To come:
//Replace inventory text with images of weapons.