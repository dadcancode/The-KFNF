///////////////////////////////////////
 //The Knight's Frightful Night Flight//
 ///////////////////////////////////////
 let knight, monsters, opponent;

 const start = () => {
     knight = {
         inventory: [{name: 'bare hands', attack: 1}],
         health: 12,
         position: 0,
         attack: 0
     };
     monsters = {
         monster1: {
             name: 'goblin',
             inventory: [{name: 'garlic spray', attack: 5}],
             health: 10,
             attack: 3,
             position: 2
         },
         monster2: {
             name: 'vampire',
             inventory: [{name: 'silver dagger', attack: 6}],
             health: 12,
             attack: 3,
             position: 5
         },
         monster3: {
             name: 'werewolf',
             inventory: [{name: 'castle key'}],
             health: 14,
             attack: 4,
             position: 7
         }
        };
     checkMonPos();
 }
 const checkMonPos = () => {
     if((monsters.monster1.position < monsters.monster2.position) && (monsters.monster2.position < monsters.monster3.position)) {
         helloWorld();
     } else {
         start();
     }
 }
 const helloWorld = () => {
     alert('You wake up surrounded by trees.  Your head hurts and you cannot remember how you got there.  The sun is setting soon.  You look around and see your castle not far in the distance.  As you get up to leave, you notice howls and shrieks coming from the forest ahead');
     let choice = prompt('The noises are getting closer and the sun is sining fast, what will you do? (type number next to choice)', '1 Get going! / 2 Hang back and look around.');
             if(choice === '1') {
                 moveFor();
             } else if (choice === '2') {
                 alert('You found a sword! This item was added to your inventory.');
                 addItem({name:'sword', attack: 4});
             }
     nowWhat();
 }
 const randomPos = () => {
     return Math.floor(Math.random() * Math.floor(10));
 }
 const statusUpdate = () => {
     alert(`You are ${100 - (knight.position * 10)} yards from the castle and you have ${knight.health} health.`)
    }
const positionCheck = () => {
     for(let x in monsters) {
        if(monsters[x].position === knight.position) {
            battleStart(monsters[x]);
        } else if(knight.position === 10) {
            endGame();
        } else {
            nowWhat();
        }
        console.log(x);
}
    // if(knight.position === 10) {
    //     endGame();
    // } else if(knight.position === monsters.monster1.position) {
    //     battleStart(monsters.monster1);
    // } else if(knight.position === monsters.monster2.position) {
    //     battleStart(monsters.monster2);
    // } else if(knight.position === monsters.monster3.position) {
    //     battleStart(monsters.monster3);
    // } else {
    //     nowWhat();
    // }
 }
 const moveFor = () => {
     knight.position +=1;
     positionCheck();
 }
 const goBac = () => {
     knight.position -=1;
     positionCheck();
 }
 const addItem = (item) => {
     knight.inventory.push(item);
 }
 const nowWhat = () => {
     statusUpdate();
     let choice = prompt('Now what?(select number)', '1 Move forward / 2 Go back / 3 Restart');
         if(choice === '1') {
             moveFor();
         } else if(choice === '2') {
             goBac();
         } else if(choice === '3') {
             start();
         }
     }
 const battleStart = (monster) => {
     setOpponent(monster);
     alert(`Look out! A ${monster.name}! Prepare for a fight! The ${monster.name} has ${monster.health} health and ${monster.attack} attack.`);
     weaponSelect();
     battlePrompt();
 }
 const setOpponent = (monster) => {
     opponent = monster;
 }
 const weaponSelect = () => {
     let yourWeapons = [];
     for(let x of knight.inventory) {
         yourWeapons.push(x.name);
     }
     let choice = prompt('Which weapon will you choose? (Select by number beginning with 0)', `${yourWeapons}`);
     let intChoice = Number(choice);
     if(intChoice < yourWeapons.length) {
         equipWeapon(knight.inventory[intChoice]);
         battlePrompt();
     } else {
         alert('That spot is empty');
         weaponSelect();
     }
 }
 const equipWeapon = (weapon) => {
     knight.attack = weapon.attack;
 }
 const battlePrompt = () => {
     alert(`You have ${knight.health} health and the ${opponent.name} has ${opponent.health} health.`)
     let choice = prompt('What will you do next?', '1 Attack / 2 Run away');
     if(choice === '1') {
         attack();
     } else if(choice === '2') {
         alert('You were hurt running away!');
         monsterAttack();
         goBac();
     }
 }
 const attack = () => {
     if(opponent.health > knight.attack) {
         opponent.health -= knight.attack;
         alert(`You attack the ${opponent.name} and deal ${knight.attack} damage. The ${opponent.name}'s health is down to ${opponent.health}.`);
         monsterAttack();
     } else if(opponent.health <= knight.attack) {
         monsterDefeated();
     }
 }
 const monsterDefeated = () => {

     alert(`You have defeated the ${opponent.name}! It dropped a ${opponent.inventory[0].name}. Added ${opponent.inventory[0].name} to your inventory`);
     addItem(opponent.inventory[0]);
     nowWhat();
 }
 const monsterAttack = () => {
     if(knight.health <= opponent.attack) {
         youDied();
     } else {
         knight.health -= opponent.attack;
         alert(`The ${opponent.name} attacked you! Your health has gone down by ${opponent.attack}.`)
         battlePrompt();
     }
 }
 const youDied = () => {
     alert(`Unfotunately you were killed by the ${opponent.name}. As you lay there all is going black....`);
     start();
 }
 const endGame = () => {
     alert('Congratulations! You made it home safe!');
     alert('Now to relax and get warm');
     alert('Whats that! A shape in the darkness! Before you can turn around *THUNK* you are hit from behind.  As you slide to the floor, all goes black...');
     start();
 }
 start();

 console.log(positionCheck())
