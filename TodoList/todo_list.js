// DEFINING VARIABLES TO ACCESS DATA

// Declare a variable named taskInput and initialize it:

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

// Declare an empty array:

let tasks = [];

// DEFINING VARIOUS FUNCTIONS TO ACCESS DATA

// Create the addTask function:

function addTask() {
    const taskText = taskInput.value.trim();    // retrieve the value entered into the taskInput HTML element by the user, trimming any trailing whitespace.
    if (taskText !== "") {  // check if the taskText is not an empty string; if not, it creates a new task object with the entered text.
        tasks.push({ text: taskText});  // Addition of this new task object using the push array method to the tasks array
        taskInput.value = "";   // Resetting the value of the taskInput field to an empty string after adding the task, clearing the input for the next task entry.
        displayTasks();
    }
}

// Create the displayTasks function:

function displayTasks() {
    taskList.innerHTML = "";    // to clear the existing content within the taskList element by setting its innerHTML to an empty string.
    tasks.forEach((task, index) => {    // iterates through the tasks array using forEach, creating a list item <li> for each task.
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
            <label for="task-${index}">${task.text}</label>`;  // It constructs HTML content for each task by assigning it to li.innerHTML, which includes a checkbox, a label displaying the task text, and corresponding IDs.
        li.querySelector("input").addEventListener("change", () => toggleTask(index)); // with the help of li.querySelector, it sets up an event listener for each checkbox within the task list <li> element. When the checkbox state changes, it triggers the toggleTask() function
        taskList.appendChild(li);  // Then appends the newly created list item containing the task details in the To-Do List interface using the appendChild method.
    });
}

// Create the toogleTask function:

function toggleTask(index) { // This toggleTask function toggles the completion status of a specific task in the tasks array based on the provided index.
    tasks[index].completed = !tasks[index].completed; // It helps by selecting the checkbox regardless. If selected, then it will mark that particular task as completed.
    displayTasks();
}

// Create the clearCompletedTasks function:

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed); // the filter method filters the task array, which has the list of tasks entered by users.
    // tasks.filter(task => !task.completed); code filters the tasks array to retrieve only the tasks that are not marked as completed (task.completed is false), returning a new array excluding completed tasks.
    displayTasks();
}

// Perform addEventListener for addTask and clearCompletedTasks buttons to listen for clicks after clicking the Add Task and Clear Completed buttons.

addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

// The function calls the displayTasks function to show the entered todo task after clicking the Add Task button.

displayTasks();