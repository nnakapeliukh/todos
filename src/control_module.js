import CreateProjectItem from "./projectclass";
import CreateTodoItem from "./todoclass";
import RenderPage from "./render_page";

function controlModule(projectsListIn) {
  // localStorage.clear();
  const projectsListJson = JSON.parse(localStorage.getItem("project-list"));
  let projectsList = [];
  if (projectsListJson) {
    for (let i = 0; i < projectsListJson.length; i++) {
      const tempProj = CreateProjectItem("ti2le");
      tempProj.buildFromJson(projectsListJson[i]);
      projectsList.push(tempProj);
    }
  } else {
    projectsList = projectsListIn;
  }

  let currentProject = "";
  let id = 0;

  function start() {
    RenderPage.init(
      addProject,
      selectProject,
      removeProject,
      addTodo,
      modifyProject,
      removeTodo,
      modifyTodo,
      addCheckItem
    );
    currentProject = projectsList[0];
    _refreshPage();
  }

  function _refreshPage() {
    RenderPage.renderProjectsFromList(projectsList);
    RenderPage.displaySelectedProject(currentProject);
    _saveToStorage();
  }

  function selectProject(projectItem) {
    currentProject = projectItem;
    _refreshPage();
  }

  function addProject(title, descriptionIn) {
    id++;

    if (title) {
      const newProject = CreateProjectItem(title);
      newProject.setDescription(descriptionIn);
      newProject.setId(id);
      projectsList.push(newProject);
      _refreshPage();
      return true; // add check
    }
    return false;
  }
  function removeProject(projectItem) {
    // look for the project to delete
    for (let i = 0; i < projectsList.length; i++) {
      if (projectItem === projectsList[i]) {
        // if deleting selected project select previous one
        if (currentProject === projectItem) {
          setSelectedProject(projectsList[i - 1]);
        }
        projectsList.splice(i, 1);
        _refreshPage();
        return;
      }
    }
  }
  function modifyProject(projectIn, titleIn, descriptionIn) {
    if (titleIn) {
      projectIn.setTitle(titleIn);
      projectIn.setDescription(descriptionIn);
      _refreshPage();
      return true;
    }

    return false;
  }

  function addTodo(titleIn, descriptionIn, dueDateIn, priorityIn) {
    if (titleIn) {
      const newTodo = CreateTodoItem(titleIn);
      newTodo.setDescription(descriptionIn);
      newTodo.setPriority(priorityIn);
      newTodo.setDueDate(dueDateIn);
      currentProject.addTodoItem(newTodo);

      _refreshPage();
      return true;
    }
    return false;
  }

  function removeTodo(todoIn) {
    // look for the todo to delete
    const todoList = currentProject.getTodoItems();
    for (let i = 0; i < todoList.length; i++) {
      if (todoIn === todoList[i]) {
        currentProject.removeTodoItem(i);
        _refreshPage();
        return;
      }
    }
  }

  function modifyTodo(titleIn, descriptionIn, dueDateIn, priorityIn, todoItem) {
    todoItem.setTitle(titleIn);
    todoItem.setDescription(descriptionIn);
    todoItem.setPriority(priorityIn);
    todoItem.setDueDate(dueDateIn);
    _refreshPage();
    return true;
  }

  function addCheckItem(todoItem, checkItem) {
    todoItem.addToChecklist(checkItem);
    _refreshPage();
  }

  function setSelectedProject(project) {
    currentProject = project;
  }

  function getSelectedProject() {
    return currentProject;
  }

  function _saveToStorage() {
    const tempList = [];
    for (let i = 0; i < projectsList.length; i++) {
      tempList.push(projectsList[i].toJson());
    }

    const myStorage = window.localStorage;
    myStorage.removeItem("project-list");
    myStorage.setItem("project-list", JSON.stringify(tempList));
  }

  return {
    start,
    addProject,
    removeProject,
    addTodo,
    removeTodo,
    modifyTodo,
    addCheckItem,
    setSelectedProject,
    getSelectedProject,
  };
}

export { controlModule as default };
