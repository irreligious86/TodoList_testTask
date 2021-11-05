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


const initLocalStorage  = () => {
    if (localStorage.getItem('todo')) {
        todoListArr = JSON.parse(localStorage.getItem('todo'))
    } else {
        localStorage.setItem('todo', JSON.stringify(todoListArr));
    }
};
initLocalStorage();

// const removeBtn = document.createElement('button');
// const removeBtnText = document.createTextNode('X');
// const renderNewRemoveBtn = () => {
//     removeBtn.type = 'button';
//     removeBtn.classList.add('remove-btn', 'righted');
//     removeBtn.append(removeBtnText);
// };

const renderSingleTask = (task, index) => {
    const newItem = document.createElement('li');
    const newItemLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    const itemMenuBtn = document.createElement('button');
    const itemMenuBtnText = document.createTextNode('Menu');

    const renderNewItem = () => {
        newItem.classList.add('tasks-list-item');
        newItem.important = task.important;
        newItemLabel.innerHTML = task.todo;
        newItem.append(newItemLabel);
        newItem.appendChild(itemMenuBtn);
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

    const renderItemMenuBtn = () => {
        itemMenuBtn.type = 'button';
        itemMenuBtn.classList.add('menu-btn');
        itemMenuBtn.append(itemMenuBtnText);
        itemMenuBtn.onclick = itemMenuRender;
};

    tasksList.appendChild(newItem);
    renderNewItem();
    renderNewCheckbox();
    renderItemMenuBtn();
};

const renderTasks = () => todoListArr.forEach((item, index) => renderSingleTask(item, index));

const itemMenuRender = () => {
    const menuFrame = document.createElement('div');
    tasksList.append(menuFrame);
    menuFrame.classList.add('menu-frame');

    const menuFrameTitle = document.createElement('h1');
    menuFrameTitle.classList.add('menu-frame--title');
    menuFrame.append(menuFrameTitle);

    const menuFrameTitleText = document.createTextNode('Task title');
    menuFrameTitle.append(menuFrameTitleText);

    const menuFrameMessage = document.createElement('div');
    const menuFrameMessageTextNode = document.createTextNode('Task message. It may be very loooooooooooooooooong message... if you want... ');
    menuFrameMessage.append(menuFrameMessageTextNode);
    menuFrameMessage.classList.add('menu-frame--message');
    menuFrame.append(menuFrameMessage);

    const menuFrameBtnOk = document.createElement('div');
    menuFrameBtnOk.classList.add('menu-frame--btn-ok');
    menuFrame.append(menuFrameBtnOk);

    const okBtnTextNode = document.createTextNode('Ok');
    menuFrameBtnOk.append(okBtnTextNode);

    const menuFrameBtnDel = document.createElement('div');
    menuFrameBtnDel.classList.add('menu-frame--btn-delete');
    menuFrame.append(menuFrameBtnDel);

    const delBtnTextNode = document.createTextNode('Delete');
    menuFrameBtnDel.append(delBtnTextNode);

    menuFrameBtnOk.onclick = () => tasksList.removeChild(tasksList.lastChild);

    menuFrameBtnDel.onclick = () => tasksList.removeChild(tasksList.lastChild);
};

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
