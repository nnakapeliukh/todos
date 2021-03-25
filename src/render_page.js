import { parseISO, toDate, formatDistanceToNow } from "date-fns";
// add check toggle
// probably have to be separated into at leas 2 files: 1 for projects 1 for todos
// color pallete https://www.color-hex.com/color-palette/389
// move somhere else
const colorScheme = {
  lowPriorityBackground: "#b16562",
  medPriorityBackground: "#a75553",
  highPriorityBackground: "#854442",
  prioritySelect: "#679b9d",
};

const RenderPage = (() => {
  const mainDiv = document.createElement("div");
  const projectsDiv = document.createElement("div");
  const todosDiv = document.createElement("div");

  let ctrlAddProject = () => {};
  let ctrlSelectProject = () => {};
  let ctrlDeleteProject = () => {};
  let ctrlAddToDo = () => {};
  let ctrlModifyProj = () => {};
  let ctrlDeleteTodo = () => {};
  let ctrlModifyTodo = () => {};
  let ctrlAddCheckItem = () => {};

  function init(
    addProjectFuncIn,
    selectProjectIn,
    deleteProjectIn,
    addTodoIn,
    modifyProjectIn,
    deleteTodoIn,
    modifyTodo,
    addCheckItem
  ) {
    ctrlAddProject = addProjectFuncIn;
    ctrlSelectProject = selectProjectIn;
    ctrlDeleteProject = deleteProjectIn;
    ctrlAddToDo = addTodoIn;
    ctrlModifyProj = modifyProjectIn;
    ctrlDeleteTodo = deleteTodoIn;
    ctrlModifyTodo = modifyTodo;
    ctrlAddCheckItem = addCheckItem;

    document.getElementById("content").appendChild(mainDiv);
    document.body.style.background = "#111";
    mainDiv.appendChild(projectsDiv);
    mainDiv.appendChild(todosDiv);

    // screen will be devided into 2 parts: top for projects, bottom for todos. Ratio: ~3:7.
    // projects pane will have add project as first element
    // if project is open, first element of todos will be add a todo

    // projects pane
    // add auto resizing of the height depending on how many aditional overlays
    projectsDiv.id = "projects-div";
    // todos pane
    todosDiv.className = "todos-div";
  }

  // render all projects
  function renderProjectsFromList(listOfProjects) {
    // destroy old projects before drawing;
    document.querySelectorAll(".project-class").forEach((e) => e.remove());

    // add create project div/button
    if (!document.getElementById("add-project-button-id")) {
      const addProjectDiv = document.createElement("div");
      projectsDiv.appendChild(addProjectDiv);
      addProjectDiv.classList.add("add-button-proj");
      addProjectDiv.classList.add("add-button-img");
      addProjectDiv.id = "add-project-button-id";
      addProjectDiv.addEventListener("click", () => createProjectForm(null));
      const addIcon = document.createElement("img");
      addIcon.src = "../src/Img/Add-icon.png";
      addIcon.className = "add-image";
      addProjectDiv.appendChild(addIcon);
    }

    // draw new projects
    for (let indexNew = 0; indexNew < listOfProjects.length; indexNew++) {
      const projectItem = listOfProjects[indexNew];

      // create div for each project in the project div(top)
      const singleProjectDiv = document.createElement("div");
      projectsDiv.appendChild(singleProjectDiv);

      singleProjectDiv.classList = "project-class";
      singleProjectDiv.addEventListener("click", () => {
        ctrlSelectProject(projectItem);
      });

      const titleText = document.createElement("h2");
      singleProjectDiv.appendChild(titleText);
      titleText.innerHTML = projectItem.getTitle();
      titleText.className = "text-page";

      const descriptText = document.createElement("p");
      singleProjectDiv.appendChild(descriptText);
      descriptText.innerHTML = projectItem.getDescription();
      descriptText.className = "text-page";

      // icons on hover
      addIconsHover(
        singleProjectDiv,
        createProjectForm,
        ctrlDeleteProject,
        projectItem
      );
    }
  }

  function addIconsHover(
    divToAppentTo,
    editFunction,
    deleteFunction,
    itemToManipulate
  ) {
    const modifyIcon = document.createElement("img");
    modifyIcon.src = "../src/Img/Edit_icon.png";
    divToAppentTo.appendChild(modifyIcon);
    modifyIcon.style.cssText = `width: 20px;
                                        position: absolute;
                                        top: 5px;
                                        right:8px;
                                        display: none;`;
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "../src/Img/Delete_icon.png";
    divToAppentTo.appendChild(deleteIcon);
    deleteIcon.style.cssText = `width: 20px;
                                        position: absolute;
                                        top: 5px;
                                        right:33px;
                                        display: none;`;

    divToAppentTo.addEventListener("mouseover", () => {
      modifyIcon.style.display = "block";
      deleteIcon.style.display = "block";
    });
    divToAppentTo.addEventListener("mouseout", () => {
      modifyIcon.style.display = "none";
      deleteIcon.style.display = "none";
    });
    // modifyIcon.addEventListener('click', editFunction);
    modifyIcon.addEventListener("click", () => {
      window.event.stopPropagation();
      editFunction(itemToManipulate);
    });

    deleteIcon.addEventListener("click", () => {
      window.event.stopPropagation();
      deleteFunction(itemToManipulate);
    });
  }

  // displays todos of the selected project
  function displaySelectedProject(projectItem) {
    document.querySelectorAll("#temp-todo").forEach((e) => e.remove());

    const tempTodoDiv = document.createElement("div"); // create new div that can be safely destroyed
    tempTodoDiv.id = "temp-todo"; // will be destryed by id
    todosDiv.appendChild(tempTodoDiv);
    tempTodoDiv.style.cssText = todosDiv.style.cssText;

    const todoColumn1 = document.createElement("div");
    tempTodoDiv.appendChild(todoColumn1);
    todoColumn1.className = "todo-column";
    todoColumn1.id = "hover-column";

    const todoColumn2 = document.createElement("div");
    tempTodoDiv.appendChild(todoColumn2);
    todoColumn2.className = "todo-column";

    const todoColumn3 = document.createElement("div");
    tempTodoDiv.appendChild(todoColumn3);
    todoColumn3.className = "todo-column";

    const todoColumn4 = document.createElement("div");
    tempTodoDiv.appendChild(todoColumn4);
    todoColumn4.className = "todo-column";

    // add create todo div. always first
    const addTodoDiv = document.createElement("div");
    todoColumn1.appendChild(addTodoDiv);
    addTodoDiv.classList.add("todo-class");
    addTodoDiv.classList.add("add-button-img");
    addTodoDiv.id = "add-todo-div";
    // addTodoDiv.innerHTML = `Add todo`;
    addTodoDiv.addEventListener("click", () => createTodoForm(null));
    const addIcon = document.createElement("img");
    addIcon.src = "../src/Img/Add-icon.png";
    addIcon.className = "add-image";
    addTodoDiv.appendChild(addIcon);

    if (projectItem) {
      const todoList = projectItem.getTodoItems();
      for (let k = 1; k <= todoList.length; k++) {
        const todoItem = todoList[k - 1];
        switch (k % 4) {
          case 1:
            drawTodoItem(todoItem, todoColumn1, projectItem);
            break;
          case 2:
            drawTodoItem(todoItem, todoColumn2, projectItem);
            break;
          case 3:
            drawTodoItem(todoItem, todoColumn3, projectItem);
            break;
          case 0:
            drawTodoItem(todoItem, todoColumn4, projectItem);
            break;
        }
      }
    }
  }

  function drawTodoItem(todoItem, tempTodoDiv, projectItem) {
    // draws todo items of a selected project

    // for each todo item there should be a new div generated in the todo pane
    const singleTodoDiv = document.createElement("div");
    tempTodoDiv.appendChild(singleTodoDiv);
    singleTodoDiv.classList.add("todo-class");

    // change color on priority:
    switch (todoItem.getPriority()) {
      case 1:
        singleTodoDiv.classList.add("low-todo-class");
        break;
      case 2:
        singleTodoDiv.classList.add("med-todo-class");
        break;
      case 3:
        singleTodoDiv.classList.add("high-todo-class");
        break;
    }

    const todoTitle = document.createElement("h4");
    singleTodoDiv.appendChild(todoTitle);
    todoTitle.classList = "todo-title";
    todoTitle.innerHTML = todoItem.getTitle();

    const todoDescr = document.createElement("p");
    singleTodoDiv.appendChild(todoDescr);
    todoDescr.classList = "todo-text";
    todoDescr.innerHTML = todoItem.getDescription();

    const todoDueDate = document.createElement("p");
    singleTodoDiv.appendChild(todoDueDate);
    todoDueDate.classList = "todo-text";
    if (todoItem.getDueDate()) {
      const tempDueDate = parseISO(todoItem.getDueDate());
      todoDueDate.innerHTML = `Due ${formatDistanceToNow(tempDueDate, {
        addSuffix: true,
      })}`;
    }

    // display checklist
    const todoCheckList = todoItem.getChecklist();
    for (let i = 0; i < todoCheckList.length; i++) {
      const checkDiv = document.createElement("div");
      checkDiv.classList = "todo-check";
      singleTodoDiv.appendChild(checkDiv);

      const tempTask = document.createElement("input");
      tempTask.type = "checkbox";
      checkDiv.appendChild(tempTask);
      tempTask.id = todoCheckList[i];

      const labelTask = document.createElement("label");
      checkDiv.appendChild(labelTask);
      labelTask.innerHTML = todoCheckList[i];
      labelTask.htmlFor = todoCheckList[i];
    }

    addIconsHover(singleTodoDiv, createTodoForm, ctrlDeleteTodo, todoItem);

    // add new check point button
    const addCheckDiv = document.createElement("div");
    singleTodoDiv.appendChild(addCheckDiv);
    addCheckDiv.classList.add("add-check-div");
    addCheckDiv.addEventListener("click", () => {
      const submitCheckDiv = document.createElement("div");
      submitCheckDiv.style.position = "relative";
      singleTodoDiv.appendChild(submitCheckDiv);
      const checkEdit = document.createElement("input");
      submitCheckDiv.appendChild(checkEdit);
      checkEdit.type = "text";
      checkEdit.className = "check-edit";
      addCheckDiv.style.display = "none";

      const SubmitCheckIcon = document.createElement("img");
      SubmitCheckIcon.src = "../src/Img/Add-icon.png";
      SubmitCheckIcon.className = "submit-check-image";
      submitCheckDiv.appendChild(SubmitCheckIcon);

      SubmitCheckIcon.addEventListener("click", () => {
        ctrlAddCheckItem(todoItem, checkEdit.value);
      });
    });
    const addCheckIcon = document.createElement("img");
    addCheckIcon.src = "../src/Img/Add-icon.png";
    addCheckIcon.className = "add-check-image";
    addCheckDiv.appendChild(addCheckIcon);
  }

  // form to create a project
  // addProject comes from control module
  function createProjectForm(projectIn) {
    // if projectIn is not empty - modify
    const projectForm = document.createElement("div"); // overlay for project form
    mainDiv.appendChild(projectForm);
    projectForm.className = "create-element-form";

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "x";
    closeBtn.classList.add("closebtn");
    closeBtn.title = "Close";
    projectForm.appendChild(closeBtn);
    closeBtn.addEventListener("click", DestroyProjectForm(projectForm));
    closeBtn.className = "close-button";

    const overlayContent = document.createElement("div");
    projectForm.appendChild(overlayContent);
    overlayContent.className = "create-project-overlay";

    const overlayTitle = document.createElement("h1");
    overlayContent.appendChild(overlayTitle);
    overlayTitle.innerHTML = "Create new project";
    overlayTitle.classList.add("text-form");

    const getTitleLbl = document.createElement("label");
    overlayContent.appendChild(getTitleLbl);

    const getTitleDesc = document.createElement("p");
    getTitleLbl.appendChild(getTitleDesc);
    getTitleDesc.innerHTML = "Title";
    getTitleDesc.classList = "text-form";

    const getTitleInput = document.createElement("input");
    getTitleLbl.appendChild(getTitleInput);
    getTitleInput.type = "text";
    getTitleInput.name = "projectTitle";
    getTitleInput.placeholder = "Title";
    getTitleInput.classList = "input-form";
    getTitleInput.maxLength = "37";

    const getDescriptLbl = document.createElement("label");
    overlayContent.appendChild(getDescriptLbl);
    getDescriptLbl.style.display = "block";

    const getDescriptText = document.createElement("p");
    getDescriptLbl.appendChild(getDescriptText);
    getDescriptText.innerHTML = "Description";
    getDescriptText.classList = "text-form";

    const getDescriptInput = document.createElement("textarea");
    getDescriptLbl.appendChild(getDescriptInput);
    getDescriptInput.rows = "3";
    getDescriptInput.cols = "40";
    getDescriptInput.maxLength = "100";
    getDescriptInput.style.resize = "none";
    getDescriptInput.style.lineHeight = "3em";
    getDescriptInput.classList = "input-form";
    getDescriptInput.placeholder = "Notes...\nMore notes...";

    const submitCreateBtn = document.createElement("button");
    overlayContent.appendChild(submitCreateBtn);
    submitCreateBtn.className = "button-form";
    submitCreateBtn.innerHTML = "Create";
    submitCreateBtn.addEventListener("click", () => {
      if (!projectIn) {
        if (ctrlAddProject(getTitleInput.value, getDescriptInput.value)) {
          DestroyProjectForm(projectForm)();
        } else return;
      } else if (projectIn) {
        if (
          ctrlModifyProj(projectIn, getTitleInput.value, getDescriptInput.value)
        ) {
          DestroyProjectForm(projectForm)();
        } else return;
      }
    });

    if (projectIn) {
      getTitleInput.value = projectIn.getTitle();
      getDescriptInput.value = projectIn.getDescription();
      overlayTitle.innerHTML = getTitleInput.value;
      submitCreateBtn.innerHTML = "Modify";
    }
  }

  function DestroyProjectForm(projectForm) {
    return () => projectForm.remove();
  }

  // form to create a todo item
  function createTodoForm(todoItem) {
    const todoForm = document.createElement("div"); // overlay for project form
    mainDiv.appendChild(todoForm);
    todoForm.className = "create-element-form";

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "x";
    closeBtn.classList.add("closebtn");
    closeBtn.title = "Close";
    todoForm.appendChild(closeBtn);
    closeBtn.addEventListener("click", destroyTodoForm(todoForm));
    closeBtn.className = "close-button";

    const overlayContent = document.createElement("div");
    todoForm.appendChild(overlayContent);
    overlayContent.id = "create-todo-overlay";

    const overlayTitle = document.createElement("h1");
    overlayContent.appendChild(overlayTitle);
    overlayTitle.innerHTML = "Add a new todo item";
    overlayTitle.classList.add("text-form");

    const getTitleLbl = document.createElement("label");
    overlayContent.appendChild(getTitleLbl);

    const getTitleDesc = document.createElement("p");
    getTitleLbl.appendChild(getTitleDesc);
    getTitleDesc.innerHTML = "Title";
    getTitleDesc.classList = "text-form";

    const getTitleInput = document.createElement("input");
    getTitleLbl.appendChild(getTitleInput);
    getTitleInput.type = "text";
    getTitleInput.name = "projectTitle";
    getTitleInput.placeholder = "Title";
    getTitleInput.classList = "input-form";

    const getDescriptLbl = document.createElement("label");
    overlayContent.appendChild(getDescriptLbl);
    getDescriptLbl.style.display = "block";

    const getDescriptText = document.createElement("p");
    getDescriptLbl.appendChild(getDescriptText);
    getDescriptText.innerHTML = "Description";
    getDescriptText.classList = "text-form";

    const getDescriptInput = document.createElement("textarea");
    getDescriptLbl.appendChild(getDescriptInput);
    getDescriptInput.rows = "2";
    getDescriptInput.cols = "40";
    getDescriptInput.style.resize = "none";
    getDescriptInput.style.lineHeight = "3em";
    getDescriptInput.classList = "input-form";
    getDescriptInput.placeholder = "Notes...\nMore notes...";

    const getDueDateLbl = document.createElement("label");
    overlayContent.appendChild(getDueDateLbl);
    getDueDateLbl.style.display = "block";

    const getDueDateText = document.createElement("p");
    getDueDateLbl.appendChild(getDueDateText);
    getDueDateText.innerHTML = "Due Date";
    getDueDateText.classList = "text-form";

    const getDueDateInput = document.createElement("input");
    getDueDateLbl.appendChild(getDueDateInput);
    getDueDateInput.type = "date";
    getDueDateInput.classList = "input-form";

    const getPriorityLbl = document.createElement("label");
    overlayContent.appendChild(getPriorityLbl);
    getDueDateLbl.style.display = "block";

    const getPriorityText = document.createElement("p");
    getPriorityLbl.appendChild(getPriorityText);
    getPriorityText.innerHTML = "Priority";
    getPriorityText.classList = "text-form";

    const getLowPriorityInput = document.createElement("div");
    getPriorityLbl.appendChild(getLowPriorityInput);
    getLowPriorityInput.classList = "proirity-select";
    getLowPriorityInput.id = "low-pty";
    getLowPriorityInput.priorityNum = 1;
    getLowPriorityInput.style.backgroundColor = `${colorScheme.lowPriorityBackground}`;
    getLowPriorityInput.addEventListener("click", () => {
      changePriorityColor(getLowPriorityInput);
    });

    const getMedPriorityInput = document.createElement("div");
    getPriorityLbl.appendChild(getMedPriorityInput);
    getMedPriorityInput.classList = "proirity-select";
    getMedPriorityInput.id = "med-pty";
    getMedPriorityInput.priorityNum = 2;
    getMedPriorityInput.style.backgroundColor = `${colorScheme.medPriorityBackground}`;
    getMedPriorityInput.style.border = `3px solid ${colorScheme.prioritySelect}`;
    getMedPriorityInput.addEventListener("click", () => {
      changePriorityColor(getMedPriorityInput);
    });

    const getHighPriorityInput = document.createElement("div");
    getPriorityLbl.appendChild(getHighPriorityInput);
    getHighPriorityInput.classList = "proirity-select";
    getHighPriorityInput.id = "high-pty";
    getHighPriorityInput.priorityNum = 3;
    getHighPriorityInput.style.backgroundColor = `${colorScheme.highPriorityBackground}`;
    getHighPriorityInput.addEventListener("click", () => {
      changePriorityColor(getHighPriorityInput);
    });

    // default priority
    let selectedProirity = 2;

    function changePriorityColor(priorityButton) {
      const priorityItems = document.getElementsByClassName("proirity-select");
      for (let i = 0; i < priorityItems.length; i++) {
        priorityItems[i].style.cssText += `
                                                border: none;
                                                `;
      }

      priorityButton.style.border = `3px solid ${colorScheme.prioritySelect}`;
      selectedProirity = priorityButton.priorityNum;
    }

    const submitCreateBtn = document.createElement("button");
    overlayContent.appendChild(submitCreateBtn);
    submitCreateBtn.classList = "button-form";
    submitCreateBtn.innerHTML = "Create";
    submitCreateBtn.addEventListener("click", () => {
      if (!todoItem) {
        if (
          ctrlAddToDo(
            getTitleInput.value,
            getDescriptInput.value,
            getDueDateInput.value,
            selectedProirity
          )
        ) {
          destroyTodoForm(todoForm)();
        } else return;
      } else if (todoItem) {
        if (
          ctrlModifyTodo(
            getTitleInput.value,
            getDescriptInput.value,
            getDueDateInput.value,
            selectedProirity,
            todoItem
          )
        ) {
          destroyTodoForm(todoForm)();
        }
      }
    });

    if (todoItem) {
      submitCreateBtn.innerHTML = "Modify";
      overlayTitle.innerHTML = todoItem.getTitle();
      getTitleInput.value = todoItem.getTitle();
      getDescriptInput.value = todoItem.getDescription();
      getDueDateInput.value = todoItem.getDueDate();

      switch (todoItem.getPriority()) {
        case 1:
          changePriorityColor(getLowPriorityInput);
          break;
        case 2:
          changePriorityColor(getMedPriorityInput);
          break;
        case 3:
          changePriorityColor(getHighPriorityInput);
          break;
      }
    }
  }

  function destroyTodoForm(todoForm) {
    return () => todoForm.remove();
  }
  return {
    init,
    renderProjectsFromList,
    displaySelectedProject,
  };
})();

export { RenderPage as default };
