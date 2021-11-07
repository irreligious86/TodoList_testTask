const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const inputAddTask = document.querySelector('.input-add-task');
const buttonAddTask = document.querySelector('.button-add-task');
const tasksList = document.querySelector('.tasks-list');
const randomBtn = document.querySelector('.random-button');
const cleanBtn = document.querySelector('.clean-button');
let todoListArr = [];
let tasksArrFromServer = [];

const getTasks = async (url, array) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        tasksArrFromServer.push(...result);
        console.log(array);
    } catch (error) {
        console.error(error);
    }
};

const sendTasks = async (url, array) => {

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(array),
    })

}

const setLocalStorage = () => {
    localStorage.setItem('todo', JSON.stringify(todoListArr));
};

const initLocalStorage = () => {
    if (localStorage.getItem('todo')) {
        todoListArr = JSON.parse(localStorage.getItem('todo'))
    } else {
        setLocalStorage();
    }
};

const taskCreator = async () => {

    const newTodo = {
        userId: Math.floor(Math.random() * 1e8 + 1),
        id: Math.floor(Math.random() * 1e16 + 1),
        title: inputAddTask.value,
        completed: false,
    }

    todoListArr.push(newTodo);
    sendTasks(urlTodos, todoListArr);
    // setLocalStorage();

};

const taskDeleter = (id) => {
    todoListArr.forEach((item, index) => {
        if (item.id === id) {
            todoListArr.splice(index, 1)
        }
    })
};

const renderSingleTask = (item, index) => {
    const newItem = document.createElement('li');
    const newItemLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    const itemMenuBtn = document.createElement('button');
    const itemMenuBtnText = document.createTextNode('Menu');

    const renderNewItem = () => {
        newItem.classList.add('tasks-list-item');
        newItemLabel.innerHTML = item.title;
        newItem.append(newItemLabel);
        newItem.appendChild(itemMenuBtn);
        newItem.prepend(newCheckbox);
        newItem.userId = item.userId;

        if (newItem.important) {
            newItem.classList.add('important');
        }
    };

    const renderNewCheckbox = () => {
        newCheckbox.type = 'checkbox';
        newCheckbox.id = index;
        newItemLabel.htmlFor = newCheckbox.id;
        newCheckbox.checked = item.completed;
        newCheckbox.classList.add('tasks-list-item');
        newCheckbox.onchange = (() => {
            if (newCheckbox.checked) {
                newCheckbox.classList.add('checked');
            } else {
                newCheckbox.classList.remove('checked');
            }
        });
    };

    const renderItemMenuBtn = () => {
        itemMenuBtn.type = 'button';
        itemMenuBtn.classList.add('menu-btn');
        itemMenuBtn.append(itemMenuBtnText);
        itemMenuBtn.onclick = () => renderItemMenu(item.id);
    };

    tasksList.prepend(newItem);
    renderNewItem();
    renderNewCheckbox();
    renderItemMenuBtn();
};

const renderTasks = () => {
    todoListArr.forEach((item, index) => renderSingleTask(item, index))
};

const renderItemMenu = (id) => {

    const currentTask = todoListArr.find(t => t.id === id)

    const menuFrame = document.createElement('div');
    tasksList.append(menuFrame);
    menuFrame.classList.add('menu-frame');

    const menuFrameTitle = document.createElement('h1');
    menuFrameTitle.classList.add('menu-frame--title');
    menuFrame.append(menuFrameTitle);

    const menuFrameTitleText = document.createTextNode(currentTask.title);
    menuFrameTitle.append(menuFrameTitleText);

    const menuFrameMessage = document.createElement('div');
    const menuFrameMessageTextNode = document.createTextNode('Task description. It may be very loooooooooooooooooong message... if you want... But you never see it untill you return Item Menu');
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

    menuFrameBtnDel.onclick = () => {
        tasksList.removeChild(tasksList.lastChild);
        taskDeleter(id);
        reloadRender();
        localStorage.setItem('todo', JSON.stringify(todoListArr));
    };
};

const reloadRender = () => {
    while (tasksList.hasChildNodes()) {
        tasksList.removeChild(tasksList.firstChild)
    }
    inputAddTask.value = '';
    renderTasks();
};

const buttonAddTaskHandler = () => {

    taskCreator();

    if (!inputAddTask.value) {
        alert("Task cannot be empty!");
        return;
    }

    if (inputAddTask.value[0] === ' ') {
        alert("Task value must start with non-SPACE symbol!");
        inputAddTask.value = '';
        return;
    }

    localStorage.setItem('todo', JSON.stringify(todoListArr));
    reloadRender();
};

const addRandomTaskFromServer = () => {
    todoListArr.push(tasksArrFromServer[Math.floor(Math.random() * (tasksArrFromServer.length + 1))]);
    setLocalStorage();
};

document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();
    getTasks(urlTodos, todoListArr);
    renderTasks();
});

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

randomBtn.addEventListener('click', () => {
    addRandomTaskFromServer();
    initLocalStorage();
    renderTasks();
    reloadRender();
});

cleanBtn.addEventListener('click', () => {
    localStorage.setItem('todo', JSON.stringify([]));
    initLocalStorage();
    renderTasks();
    reloadRender()
});

// const getData = async (url) => {
//     const response = await fetch(url);
//     if ( !response.ok ) {
//         throw new Error(`Error on address ${url}, error status: ${response}`);
//     }
//     return await response.json();
// };

// const sendData = async (url, data) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(data)
//     })
//     if ( !response.ok ) {
//         throw new Error(`Error on address ${url}, error status: ${response}`);
//     }
//     return await response.json();
// }

// localStorage.setItem('todo', JSON.stringify([]));