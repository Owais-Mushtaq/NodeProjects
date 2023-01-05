import inquirer from "inquirer";
import chalk from 'chalk';
import chalkAnim from 'chalk-animation';

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnim.neon(
    'Welcome to Task Creator ..... \n'
  );
   await sleep();
    rainbowTitle.stop();
}
 
interface Tasks {
    
    // [key:string]: string|boolean;  //index signature
    todo: string;
    // id?: number;
    addMore: boolean;
    
 }

    

 let userTasks: string[] = [];
 let addTask:boolean = true;
 
 let getUserOperation = async()=>{
     const userOps = await inquirer.prompt([
         {
         name:'ops',
         type:'list',
         message:'What operations you want to do ?',
         choices: ['1. Query', '2. Add', '3. Modify', '4. Delete', '5. Exit']
            }
        ]);
        // return userOps.ops
        
        switch(userOps.ops){
            
            case '1. Query': {
                if(userTasks.length>0){
                    console.log(`Your tasks are: ${userTasks}`)
                } else {console.log('=====Your list is empty, please add tasks======')}
            
                await getUserOperation();
                }
                break;
             
            case '2. Add': {
                while(addTask){
                                     
                    const answers:Tasks = await inquirer.prompt([
                        
                        // {
                        //     name:'id',
                        //     type: 'number',
                        //     message:'input task ID:',
                        //     validate: async (ans:number)=>{
                        //     if(isNaN(ans)){
                        //         return 'Enter a valid number';
                        //     }
                        //      else {return true};
                        //     }
                        // },
                      
                        {
                          type: 'string',
                          name: 'todo',
                          message: 'Enter your task description :'  
                        },
                        { 
                            type: 'confirm',
                            name: 'addMore',
                            message: 'You want to add More tasks ?',
                            default: false,
                            when(alpha){
                                return alpha;
                            }
                        }
                            
                    ]);   
                    
                    let {todo, addMore} = answers;  //de-structring of Tasks
                    // addTask = answers.addMore;
                    addTask = addMore;
                    

                    console.log('================================')              
                    
                    if(todo){
                        userTasks.push(todo)
                        
                        }else console.log('Enter your tasks')
                    
                    }

                    if(userTasks.length >0){
            
                        console.log(`Your todo list:`)
                                   
                        userTasks.forEach((item,index)=> console.log(`id:${index}`, `task: ${item}`))
                        
            
                    } else {
                        console.log('No toDo in the list')
                    }
                
                     
                    await getUserOperation();

             }
                     break;
                
                     case '3. Modify': {
                        if(userTasks.length >0){
                            console.log('====Your current tasks are:====')
                            userTasks.forEach((item,index)=> console.log(`id:${index}`, `task: ${item}`))
                            const ans = await inquirer.prompt([
                               {     
                                name:'mod',
                                type:'input',
                                message: 'Enter Task ID to Modify: '
                               
                                },
                                
                                {
                                    name:'des',
                                    type:'input',
                                    message:'Enter your new details of the task.'
                                }
                            ]);
                                
                            // const objIndex = userTasks.findIndex((a)=> ans.mod == a.id) //findIndex vs indexOf
                            
                            //Method-1 to find index...
                            // for(let i in userTasks){
                            //     if(userTasks[i].id == ans.mod){
                            //         userTasks[i].todo = ans.des
                            //     }

                            // }

                            console.log('Task:', userTasks.splice(ans.mod, 1, ans.des),'modified to:')
                            userTasks.forEach((item,index)=> console.log(`id:${index}`, `task: ${item}`))

                            // const objIndex1 = userTasks.indexOf((a as number)=> ans.mod == a.id as number)
                            // userTasks[objIndex].todo = ans.des
                            console.log('Modified List is:',userTasks)
                        
                        } else {console.log('==========Your list is empty, please add tasks========')}
                    
                        await getUserOperation();
                    }
                    
                    // await getUserOperation();
                 
                    break;

 
                    case '4. Delete': {
                        if(userTasks.length > 0){
                            console.log('=====Your tasks are:===') 
                            userTasks.forEach((item,index)=> console.log(`id:${index}`, `task: ${item}`))
                            const deleted = await inquirer.prompt([
                               {     
                                name:'del',
                                type:'input',
                                message: 'Enter task ID to Delete: '
                               
                                },
                            ]);

                            // console.log(deleted.del)    
                            
                            console.log('Task:', userTasks.splice(deleted.del,1),'deleted and remaining task list is:') 
                            userTasks.forEach((item,index)=> console.log(`id:${index}`, `task: ${item}`))
                            
                            // const objIndex = userTasks.findIndex((a)=> a == deleted.del)
                            // userTasks.splice(objIndex,1)
                            // console.log('Modified List is:',userTasks)
                
                        } else {console.log('======Your list is empty, please add tasks======')}

                        await getUserOperation();
                    }
                    
                    break;

                    case '5. Exit': process.exit(0)

                }
              
                

}

await welcome();
await getUserOperation();


    
//        while(true){
//         const addTasks:Tasks = await inquirer.prompt([

//         {
//             name:'id',
//             type: 'number',
//             message:'input task ID:',
//             validate: async (ans:number)=>{
//             if(isNaN(ans)){
//                 return 'Enter a valid number';
//             }
//              else {return true};
//         }
//     },
//         {
//             name:'discription',
//             type: 'string',
//             message:'Write Task Name:',
//             validate: async (ans:string)=>{
//             if(typeof ans !== 'string'){
//                 return 'Name must be a string';
//                }
//                 else {return true};
//         } 
      
//     },


//      {
//         name:'status',
//         type: 'list',
//         message:'Choose Task Status:',
//         choices: ['Done', 'In progress', 'Not Started']

//         },

//     ]);


// }


// await welcome();
// await getUserOperation();
// // console.log(await getUserOperation())