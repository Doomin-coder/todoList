let user = document.querySelector("#user")
add = document.querySelector("#add")
let tabs = document.querySelectorAll(".tabs li")

let mode = "all";
let filterList = [];

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
    
    

//화면에 보여줌
function render(){
    // console.log("render")
    let result = "";

    let list = [];
    if(mode == "all") {
        list = taskList;
    } else {
        list = filterList;
    }

    for (let i = 0; i < list.length; i++) {
        
        if(list[i].isComplete == true) {
            result += `
                <div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="complete(${list[i].id})">check</button>
                        <button  onclick="deleteTask(${list[i].id})">delete</button>
                    </div>
                </div>
            `;
        } else {
            result += `
                <div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="complete(${list[i].id})">check</button>
                        <button  onclick="deleteTask(${list[i].id})">delete</button>
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
    filter();
}


//tabs변경
tabs.forEach((tab, index) => {
    tab.addEventListener("click", (event) => {
      
      tabs.forEach((tab) => {
        tab.classList.remove("on")
      })
      tabs[index].classList.add("on")
      filter(event);
    })
})

function filter(event) {
    // console.log("필터")
    // console.log(event.target.id);

    if(event) {
        mode = event.target.id;
    }

    filterList = [];

    if (mode == "all") {
        // console.log("all")
        render();
    } else if (mode == "going") {
        // console.log("going")
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
            console.log("진행중", filterList)
        }
        render();
    } else {
        // console.log("done")
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
            console.log("끝남", filterList)
        }
        render();
    }    



}