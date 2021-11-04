const inputAddTask = document.querySelector('.input-add-task');
const buttonAddTask = document.querySelector('.button-add-task');
const tasksList = document.querySelector('.tasks-list');

let todoListArr = [
    {
        todo: "I am task list item",
        checked: false,
        important: false
    },
    {
        todo: "I am important task list item",
        checked: false,
        important: true
    },
    {
        todo: "I am checked task list item",
        checked: true,
        important: false
    },
    {
        todo: "I am checked important task list item",
        checked: true,
        important: true
    }
];

const buttonAddTaskHandler = () => {
    let newTodo = {
        todo: inputAddTask.value,
        checked: false,
        important: false
    }
    if (!inputAddTask.value) {
        alert("Task cannot be empty!");
        return;
    }
    if (inputAddTask.value[0] === ' ') {
        alert("Task value must start with non-SPACE symbol!");
        inputAddTask.value = '';
        return;
    }
    todoListArr.push(newTodo);
    renderMessages();
    inputAddTask.value = '';
}

const renderMessages = () => {
    let renderMessage = '';
    todoListArr.forEach((item, i) => {
        renderMessage += `
            <li class=" ${item.checked ? ' checked' : ''}">
                <input 
                
                type="checkbox" 
                id="item_${++i}" 
                ${item.checked ? 'checked' : ''}
                >
                <label
                 class="tasks-list-item ${item.important ? ' important' : ''}"
                 for="item_${++i}"
                 
                 >${item.todo}</label>
            </li>
     `;
        tasksList.innerHTML = renderMessage;
    })
}

renderMessages();

buttonAddTask.addEventListener('click', buttonAddTaskHandler);