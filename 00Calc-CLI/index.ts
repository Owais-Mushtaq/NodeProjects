import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation'

console.log(chalk.redBright('Two number calculator with four basic operations'))
// chalkAnimation.rainbow('TWO DIGIT BASIC CALCULATOR \n');
 
let num1; 
let num2;

const userInput = [
    {
        name: 'number1',
        type: 'number',
        message: 'Enter your first number:',
        default(){
            return num1;},  
    },
            
        {
        name: 'number2',
        type: 'number',
        message: 'Enter your second number:', 
        default(){
            return num2;} 
    },
       {
        name: 'operator',
        type: 'list',
        message: 'Chose what operation do you want ?',
        choices: ['Multiply','Addition','Subtract','Divide'], 
        default(){
            return;}
    },
   
]; 
async function output() {
    try{
       const answers = await inquirer.prompt(userInput)
      console.log(answers.number1, answers.operator)
      if (answers.operator === 'Multiply') {
        console.log(chalk.blue('Result is:', answers.number1 * answers.number2));
    } else if (answers.operator === 'Addition') {
        console.log(chalk.green('Result is:', answers.number1 + answers.number2));
    } else if (answers.operator === 'Subtract') {
        console.log(chalk.red('Result is:', answers.number1 - answers.number2));
    } else if (answers.operator === 'Divide') {
        console.log(chalk.yellow('Result is:', answers.number1 / answers.number2));
    }
}  
catch(error){console.log(error)} 
}

    //repeat function
            
            const userInput2 = [{
            name:'doagain',
            type:'input',
            message:'Want to re-Do ? (y/n)',
            choices: ['Yes', 'No']
            }];

             async function repeat() {
            try{
                const answer= await inquirer.prompt(userInput2);
                                
                if(answer.doagain === "y"|| answer.doagain ==='yes'){
            
                console.log('Starting over...')
                console.clear();      
                await output();
                await repeat();     

            } else if (answer.doagain === "n"|| answer.doagain === "no")
                {console.log('Exiting...')
                process.exit()
            } 
              
        }
          catch(error){console.log(error)}    
    }   
                                   

await output();
// console.clear();
await repeat();

