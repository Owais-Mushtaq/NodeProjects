import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnim from 'chalk-animation';

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnim.neon(
    'Welcome to Bank PIAIC ATM ..... \n'
  );
   await sleep();
    rainbowTitle.stop();
}
    
await welcome();

///

let bankData = {
    name: 'Jawad Ahmed',
    ID: 35430,
    password: 111,
    availableBalance: 150400,
    newbalance:''
}
// console.log(verifyData.ID)

let askID = {
    
    name:'identity',
    type: 'input',
    message:'Enter your ATM Password:',
    validate: async (answers:number)=> {
        
        if(isNaN(answers)){    
        return 'Enter a valid number';
        } 
            else {return true;}

    },
}

let atmFunctions = {
    name: 'operation',
    type: 'list',
    message: 'Select your operation using arrow key and then Press Enter',
    choices: ['BalanceCheck', 'TransferMoney', 'WithdrawMoney'] 
            
}

//Withdraw Money Function

let withdrawMoney = async()=>{
               
        const answers = await inquirer.prompt({
    
                name: 'withdrawAmount',
                type:'input',
                message: 'Enter the amount to Withdraw',
                validate: async(i:number)=> {
                    if(isNaN(i))
                            {return 'Not a valid Number';} 
                            
                        else if (i >300000) 
                            {return 'Value exceeds maximum withdraw limit';}
                         
                        else if(i > bankData.availableBalance)
                                
                            {return 'Insufficient Funds';}
                      
                        else {return true;}      
                }    
        })
            let i = 0;
            do{
                console.log('Amount:', answers.withdrawAmount, 'Successfully Withdrawn')
                const newbalance = bankData.availableBalance - answers.withdrawAmount 

                bankData.availableBalance = newbalance 
                console.log('Your remaining balance now is:', newbalance)
                i++;
            } while(i == 1)
        
    }    

// Transfer Money Function

    let transferMoney = async()=>{
               
    const answers = await inquirer.prompt([
        {
        
            name: 'transfer',
            type:'input',
            message: 'Enter the Account Number of the Beneficiary',

            validate: async(ans:number)=>{
            
            if(isNaN(ans)){
                return 'Enter a valid number';
            }
              else return true;
            },
        },
         
            {   
                name: 'amountToTransfer',
                type: 'input',
                message: 'Enter the amount to transfer',

                validate: async(a)=>{

                    if(isNaN(a))
                            {return 'Enter a valid Number';} 
                            
                        else if (a > 250000) 
                            {return 'Value exceeds maximum transfer limit';}
                         
                        else if(a > bankData.availableBalance)
                                
                            {return 'Insufficient Funds';}
                      
                        else {return true;}      
                }

            }
        
        ])
             
           let i = 0;
            do{
                console.log('Amount:', answers.amountToTransfer, 'Successfully Transferred')
                const newbalance = bankData.availableBalance - answers.amountToTransfer  
                bankData.availableBalance = newbalance 
                console.log('Your remaining balance now is:', newbalance)
                i++;
            } while(i == 1)

    }       


    let userOperation = async()=>{

        const answers = await inquirer.prompt([atmFunctions])
        
        switch(answers.operation){
            
            case 'BalanceCheck': console.log('Your account balance is:', bankData.availableBalance, 'PKR')
            setTimeout(()=> userOperation(),1000)
            // await userOperation();
            break;
    
            case 'TransferMoney': await transferMoney();      
            break;
    
            case 'WithdrawMoney': await withdrawMoney();
            break;
            
        }
    }

    //Validation from user

let userValidation = async()=>{
    const answers = await inquirer.prompt([askID])

    if (answers.identity == bankData.password){
        
        console.log('Processing...')
        await userOperation();
               
    } else {
        console.log('Password did not match. Request cannot be processed...');
        process.exit()}
     
}
await userValidation();
    // await userOperation();
