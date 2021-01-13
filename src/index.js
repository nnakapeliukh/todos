import CreateToDoItem from './todoclass.js';
import CreateProjectItem from './projectclass.js';
import RenderPage from './render_page';
import ControlModule from './control_module';


let projectsList = [];
const ControlEntity = ControlModule(projectsList);
const t = CreateToDoItem('new todo title 1');
t.setPriority(1);

const tt = CreateToDoItem('new todo title 2');
tt.setPriority(2);


const ttt = CreateToDoItem('new todo title 2');
ttt.setPriority(3);


const project1 = CreateProjectItem('Default project ');
project1.setDescription("This is a default project that should be removed. \n Feel free to create a new one.");
const project2 = CreateProjectItem('New default project 2');



project1.addTodoItem(t);
project1.addTodoItem(tt);
project1.addTodoItem(ttt);

projectsList.push(project1);
// projectsList.push(project2);

let mainDiv = document.getElementById('content');



ControlEntity.start(ControlEntity);