let user = document.querySelector("#user")
add = document.querySelector("#add")
// let taskBoard = document.querySelector("#taskBoard")
// let task = document.querySelector(".task")

let taskList = []; //입력한 내용을 담을 수 있는 배열

add.addEventListener("click", addTask);

function addTask(){
    // let taskContent = user.value;

    // taskList.push(taskContent);
    // console.log(taskList);

    let task = {
        id:randomId(), //고유번호
        taskContent : user.value,
        isComplete : false,

    }
    taskList.push(task);
    // console.log(taskList)
    user.value = "";
    render();

}
    
    


function render(){
    // console.log("render")

    let result = "";

    for (let i = 0; i < taskList.length; i++) {
        
        if(taskList[i].isComplete == true) {
            result += `
                <div class="task">
                    <div class="task-done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="complete(${taskList[i].id})">check</button>
                        <button  onclick="deleteTask(${taskList[i].id})">delete</button>
                    </div>
                </div>
            `;
        } else {
            result += `
                <div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="complete(${taskList[i].id})">check</button>
                        <button  onclick="deleteTask(${taskList[i].id})">delete</button>
                    </div>
                </div>
            `;
        }
    }
    document.querySelector("#taskBoard").innerHTML = result;
}






function complete(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete
        }
        
    }
    render();
}

randomId()
function randomId() {
    console.log(Date.now())
    return Date.now()
}

function deleteTask (id) {
    for(let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
        }
    }
    render();

}