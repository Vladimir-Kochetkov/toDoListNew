const todoControl = document.querySelector('.todo-control'); //вся форма ввода
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list'); //список не выполненных задач
const todoCompleted = document.querySelector('.todo-completed'); //список выполненных задач 
console.log(todoList);
let toDoData = JSON.parse(localStorage.getItem('toDoData')) || [];

const render = function () {    //функция отрисовки задач, будет перебирать массив с задачами
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';//очищаем оба списка чтобы не добавлялись старые задачи

    toDoData.forEach(function (item, index) {    //перебираем задачи в массиве
        toDoData = JSON.parse(localStorage.getItem('toDoData'));
        const li = document.createElement('li'); //создаем элемент li для каждой задачи

        li.classList.add('todo-item'); // добавляем класс к элементу li

        li.innerHTML = '<span class="text=todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);//добавляем задачу в выполненные
        } else {
            todoList.append(li);//добавляем задачу в невыполненные
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {//добавляем обработчик галочке с выполненными и невыполненными делами
            item.completed = !item.completed;
            if (toDoData[index].completed) {
                toDoData[index].completed = !toDoData[index].completed;
            } else {
                toDoData[index].completed = !toDoData[index].completed;
            }
            updateLocal();
            render();


        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1);
            updateLocal();
            render();
            console.log(index);

        });
    });
};
render();
todoControl.addEventListener('submit', function (event) {   //обработчик на форму ввода
    event.preventDefault();   //отмена стандартного поведения   
    if (headerInput.value.trim() === '') {
        return;
    }
    let item = headerInput.value;
    const newToDo = {
        text: item,
        completed: false,
    };

    toDoData.push(newToDo); //добавляем данные по задачи в массив toDoData
    updateLocal();
    render();
    headerInput.value = ''; //очистка поля ввода новой задачи

});

console.log(toDoData);
const updateLocal = () => {
    localStorage.setItem('toDoData', JSON.stringify(toDoData));
};




