const form = document.querySelector('#taskform');

const task = document.querySelector('#task');
const list = document.querySelector('#list');

let IDs = 0;


const storedTasksObj = JSON.parse(localStorage.getItem('storedTasks')) || [];//storedTasks need to be a string b/c the key was made a string down below
IDs = storedTasksObj.length ? storedTasksObj[storedTasksObj.length - 1].id : 0;

for(let storedlist of storedTasksObj){
    
    const newLi = document.createElement('li');
    newLi.textContent = storedlist.task;
    newLi.setAttribute('id', storedlist.id);
    

    const doneButton = document.createElement('button');
    doneButton.innerText = 'Done';
    doneButton.setAttribute('class', 'done');
    newLi.append(doneButton);

    if(storedlist.done === true){
        newLi.classList.add('crossout')
    }
    
    
    const delButton = document.createElement('button');
    delButton.innerText = 'Delete';
    delButton.setAttribute('class', 'delete');
    newLi.append(delButton);

    list.append(newLi);
}

form.addEventListener('submit',e => {

    e.preventDefault();
    taskVal = document.querySelector('#task').value;
    
    const newLi = document.createElement('li');
    newLi.textContent = task.value;
    newLi.setAttribute('id', IDs);
    

    const doneButton = document.createElement('button');
    doneButton.innerText = 'Done';
    doneButton.setAttribute('class', 'done');
    newLi.append(doneButton);
    
    const delButton = document.createElement('button');
    delButton.innerText = 'Delete';
    delButton.setAttribute('class', 'delete');
    newLi.append(delButton);

    list.append(newLi);

    //store tasks
    storedTasksObj.push({ 'task': taskVal, 'done': false, 'id': IDs });
    localStorage.setItem('storedTasks', JSON.stringify(storedTasksObj));

    IDs++;
   
});

list.addEventListener('click', e => {
    const currID = e.target.parentElement.id;
    console.log(currID)


    if(e.target.textContent === 'Delete'){ //somethihng's wrong w/ delete
        e.target.parentElement.remove();

        // for(item of storedTasksObj){ //broken code; leave in for reference
            
        //     if( item.id === parseInt(currID) ){
        //         console.log('before ', item.id, storedTasksObj, storedTasksObj.length)
        //         storedTasksObj.splice(item.id, 1); //this code won't work once array 
                                                    // is shifted around in localstorage
                                                    //ids won't match with where you wanna splice
        //         console.log('after ', item.id, storedTasksObj, storedTasksObj.length)
                
        //     }
        // }

        for(let i = 0; i < storedTasksObj.length; i++){
            if( storedTasksObj[i].id === parseInt(currID) ){
                storedTasksObj.splice(i, 1);             
            }
        }

        localStorage.setItem('storedTasks', JSON.stringify(storedTasksObj));
    }



    if(e.target.textContent === 'Done'){//then cross out everything
      
        e.target.parentElement.classList.toggle('crossout');


        //manipulate localstorage to change value to done: true.
        for(item of storedTasksObj){
           // console.log(item.id, currID);
            if( item.id === parseInt(currID) ){
                item['done'] = !item['done'];
            }
        }

        localStorage.setItem('storedTasks', JSON.stringify(storedTasksObj));

    }


});




