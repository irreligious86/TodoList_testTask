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

if (localStorage.getItem('todo')) {
    todoListArr = JSON.parse(localStorage.getItem('todo'))
} else {
    localStorage.setItem('todo', JSON.stringify(todoListArr));
}

const renderSingleTask = (task, index) => {
    const newItem = document.createElement('li');
    const newItemLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    const removeBtn = document.createElement('button');
    const removeBtnText = document.createTextNode('X');

    const renderNewItem = () => {
        newItem.classList.add('tasks-list-item');
        newItem.important = task.important;
        newItemLabel.innerHTML = task.todo;
        newItem.append(newItemLabel);
        newItem.appendChild(removeBtn);
        newItem.prepend(newCheckbox);

        if (newItem.important) {
            newItem.classList.add('important');
        }
    };

    const renderNewCheckbox = () => {
        newCheckbox.type = 'checkbox';
        newCheckbox.id = +index;
        newItemLabel.htmlFor = newCheckbox.id;
        newCheckbox.checked = task.checked;
        newCheckbox.classList.add('tasks-list-item');
        newCheckbox.onchange = (() => {
            if (newCheckbox.checked) {
                newCheckbox.classList.add('checked');
            } else {
                newCheckbox.classList.remove('checked');
            }
        })
    };

    const renderNewRemoveBtn = () => {
        removeBtn.type = 'button';
        removeBtn.classList.add('remove-btn', 'righted');
        removeBtn.append(removeBtnText);
    };

    tasksList.appendChild(newItem);
    renderNewItem();
    renderNewCheckbox();
    renderNewRemoveBtn();
};

const renderTasks = () => todoListArr.forEach((item, index) => renderSingleTask(item, index));

const reloadRender = () => {
    while (tasksList.hasChildNodes()) {
        tasksList.removeChild(tasksList.firstChild)
    }
    inputAddTask.value = '';
    renderTasks();
};

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
    localStorage.setItem('todo', JSON.stringify(todoListArr));
    reloadRender();
};


document.addEventListener("DOMContentLoaded", renderTasks);

buttonAddTask.addEventListener('click', buttonAddTaskHandler);

tasksList.addEventListener('change', event => {
    let idInput = event.target.getAttribute('id');
    let forLabel = tasksList.querySelector('[for="' + idInput + '"]');
    let valueLabel = forLabel.innerHTML;
    todoListArr.forEach((item) => {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoListArr));
        }
    })
});

tasksList.addEventListener('contextmenu', event => {
    event.preventDefault();
    todoListArr.forEach((item) => {
        if (item.todo === event.target.innerHTML) {
            item.important = !item.important;
            localStorage.setItem('todo', JSON.stringify(todoListArr));
        }
    });
    reloadRender();
});
