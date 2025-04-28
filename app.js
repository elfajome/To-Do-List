// start coding js
// Start summoning items
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".deleteAll");
// console.log(input);
// console.log(submit);
// console.log(taskDiv);

// Empty Array To Store The Tasks
let arrayOfTasks = [] ;

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
};

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
    else {
        alert("Please, Enter the value");
    }
};

// click on Task Element
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove() ;
    };
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    };
});

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
};

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((element ) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task" ;
        // Check If Task is Done
        if (element.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", element.id);
        // Check If Task is Done
        div.appendChild(document.createTextNode(element.title));
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del" ;
        span.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        div.appendChild(span);
        // Add Task Div To Tasks Container
        tasksDiv.appendChild(div);
        console.log(tasksDiv.appendChild(div));
    });
};

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
};

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
};

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId );
    addDataToLocalStorageFrom(arrayOfTasks);
};

function toggleStatusTaskWith(taskId) {
    // Run a loop on the elements
    for(let i=0 ; i<arrayOfTasks.length; i++ ) {
        if ( arrayOfTasks[i].id != taskId ) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : (arrayOfTasks[i].completed = false );
        };
    };
    // to update localStorage
    addDataToLocalStorageFrom(arrayOfTasks);
};

// click on deleteAll 
deleteAll.addEventListener('click',() => {
    // Remove Element From Page
    arrayOfTasks = [] ;
    tasksDiv.innerHTML = "" ;
    window.localStorage.clear();
});