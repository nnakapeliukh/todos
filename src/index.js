import CreateToDoItem from './todoclass.js';
import CreateProjectItem from './projectclass.js';
import renderPage from './render_page';

const t = CreateToDoItem('new todo title 1');
const tt = CreateToDoItem('new todo title 2');

const project1 = CreateProjectItem('New default project');
const project2 = CreateProjectItem('New default project 2');



project1.addTodoItem(t);
project1.addTodoItem(tt);
project1.addTodoItem(tt);
project1.addTodoItem(tt);
project1.addTodoItem(tt);

console.log(project1.getTodoItems())

let projectsList = [];
projectsList.push(project1);
projectsList.push(project2);

let mainDiv = document.getElementById('content');


renderPage.init(projectsList, mainDiv);