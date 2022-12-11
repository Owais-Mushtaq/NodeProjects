import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnim from 'chalk-animation';


const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnim.neon(
    'Number Guessing Game.....? \n'
  );


    await sleep();
    rainbowTitle.stop();
}
    
await welcome();



let score = 0;

let askName = async()=> {
const nameInput = await inquirer.prompt({
    name:'player_name',
    type: 'input',
    message: chalk.blue('What is your Name ?'),

})
    const playerName = nameInput.player_name;
    return playerName;
}

let getName = await askName();
console.log (chalk.blueBright('Welcome!', getName))

//Asking Game Level ?

    let askgameLevel = async(playerName:string)=> {
    const answers = await inquirer.prompt({
    name:'level',
    type: 'list',
    message: (`What level of game do you want to play, ${playerName} ?`),
    choices:['Beginner', 'Ameteur', 'Expert'],

    })
        let mode = answers.level;
        return mode;
}

let getGameLevel = await askgameLevel(getName);

console.log(chalk.bold.red('Entering into', getGameLevel, 'Mode...'))

//======Beginner Mode=====

let beginnerMode = async()=> {
   let numberLevel1 = Math.floor(Math.random()*3)
    const game = await inquirer.prompt({
    name:'rangeNum',
    type: 'input',
    message: chalk.blue('Input a number from 0 - 3'),
    default(){
        return 0;
    }
}) 
    if(game.rangeNum === numberLevel1){
        score+= 5;
        console.log('You guessed correct !', score)
        // console.log('play once more')
    } else {
        console.log('Better luck next time...')
    }
    
    }
    
    // ============Expert Mode=========
    
        let expertMode = async()=> {
        let numberLevel3 = Math.floor(Math.random()*9)
         const game = await inquirer.prompt({
         name:'rangeNum',
         type: 'input',
         message: chalk.red('Input a number from 0 - 9'),
         default(){
             return 0;
         }
     }) 
         if(game.rangeNum === numberLevel3){
             score+= 5;
             console.log('You guessed correct !', score)
             
         } else {
            console.log('Better luck next time....')
         }
         
         }

// ============Ametuer Mode=========
    
    let ameteruMode = async()=> {
    let numberLevel2 = Math.floor(Math.random()*6)
    const game = await inquirer.prompt({
     name:'rangeNum',
     type: 'input',
     message: 'Input a number from 0 - 6',
     default(){
         return 0;
     }
 }) 
     if(game.rangeNum === numberLevel2){
         score+= 5;
         console.log('You guessed correct !', score)
         
     } else {
        console.log('Betterluck next time...')
     }
     
     }

//===Execution of GameLevels===
    let i = 1;
    let j = 1;
    let k = 1;

    if (getGameLevel === 'Beginner'){

        do {
        console.log('trying:: Attempt #', i)
        i++;
        await beginnerMode();} while (i< 5)

    } else if(getGameLevel === 'Ameteur'){

        do {
            console.log('trying:: Attempt #', j)
            j++;
            await ameteruMode();} while (j<6)

        } else if(getGameLevel === 'Expert'){

            do {
                console.log('trying:: Attempt #', k)
                k++;
                await expertMode();} while (k<10)
        }

            
            