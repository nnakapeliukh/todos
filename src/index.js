import CreateToDoItem from "./todoclass";
import CreateProjectItem from "./projectclass";
import ControlModule from "./control_module";

const projectsList = [];

const ControlEntity = ControlModule(projectsList);
const t = CreateToDoItem("Default to do item N1");
t.setPriority(1);
t.setDueDate("2021-09-15");
t.addToChecklist("We need more excercise");

const tt = CreateToDoItem("Default to do item N2");
tt.setPriority(2);
tt.setDueDate("2021-09-15");
tt.addToChecklist("Clean garage");
tt.addToChecklist("Do pull ups");
tt.addToChecklist("Build a new website");

const project1 = CreateProjectItem("Default project");
project1.setDescription(
  "This is a default project that should be removed. \n Feel free to create a new one."
);

project1.addTodoItem(t);
project1.addTodoItem(tt);
projectsList.push(project1);

ControlEntity.start(projectsList);
