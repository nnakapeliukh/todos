//figure out why todo items style is messed up

//probably have to be separated into at leas 2 files: 1 for projects 1 for todos
//color pallete https://www.color-hex.com/color-palette/389
//move somhere else 
let colorScheme = {
    // topPaneBackground : '#3c2f2f',
    // botPaneBackground : '#be9b7b',
    // topItemBackground : '#854442',
    // botItemBackground : '#4b3832',
    // formTextColor: '#FFF4E6',
    // inputFormBackground: '#be9b7b',
    // buttonFormBackground: '#854442',
    lowPriorityBackground: '#b16562',
    medPriorityBackground: '#a75553',
    highPriorityBackground: '#854442',
    prioritySelect: '#679b9d',
}



const RenderPage = (() => {
    let mainDiv = document.createElement('div');
    let projectsDiv = document.createElement('div');
    let todosDiv = document.createElement('div');
    
    let ctrlAddProject =  ()=>{};
    let ctrlSelectProject =  ()=>{};
    let ctrlDeleteProject =  ()=>{};
    let ctrlAddToDo = ()=>{};
    let ctrlModifyProj = () =>{};
    let ctrlDeleteTodo = () => {};
    let ctrlModifyTodo = () => {};

    function init (addProjectFuncIn, selectProjectIn, deleteProjectIn, addTodoIn, modifyProjectIn, deleteTodoIn, modifyTodo){
        ctrlAddProject = addProjectFuncIn;
        ctrlSelectProject = selectProjectIn;
        ctrlDeleteProject = deleteProjectIn;
        ctrlAddToDo = addTodoIn;
        ctrlModifyProj = modifyProjectIn;
        ctrlDeleteTodo = deleteTodoIn;
        ctrlModifyTodo = modifyTodo;

        document.getElementById('content').appendChild(mainDiv);
        document.body.style.background = '#111';
        mainDiv.appendChild(projectsDiv);
        mainDiv.appendChild(todosDiv);
        
        //screen will be devided into 2 parts: top for projects, bottom for todos. Ratio: ~3:7.
        //projects pane will have add project as first element
        //if project is open, first element of todos will be add a todo


        //projects pane        
        //add auto resizing of the height depending on how many aditional overlays
        projectsDiv.className = 'proects-div';
        //todos pane 
        todosDiv.className = 'todos-div';
    }

    //render all projects
    function renderProjectsFromList(listOfProjects){

        //destroy old projects before drawing;
        document.querySelectorAll('.project-class').forEach(e => e.remove());
        
        //add create project div/button
        if (!document.getElementById('add-project-button-id')){
            let addProjectDiv = document.createElement('div');
            projectsDiv.appendChild(addProjectDiv);
            addProjectDiv.classList.add('add-button-class');
            addProjectDiv.id = 'add-project-button-id';
            addProjectDiv.innerHTML = 'add project';
            addProjectDiv.addEventListener('click', (()=>_createProjectForm(null)));
        }
        

        //draw new projects
        for (let indexNew = 0; indexNew < listOfProjects.length; indexNew++){
            let projectItem = listOfProjects[indexNew];

            //create div for each project in the project div(top)
            const singleProjectDiv = document.createElement('div');
            projectsDiv.appendChild(singleProjectDiv);
            
            singleProjectDiv.classList = 'project-class'; 
            singleProjectDiv.addEventListener('click', (() => {
                ctrlSelectProject(projectItem);                    
            }))

            let titleText = document.createElement('h2');
            singleProjectDiv.appendChild(titleText);
            titleText.innerHTML = projectItem.getTitle();
            titleText.className = 'text-page';

            let descriptText = document.createElement('p');
            singleProjectDiv.appendChild(descriptText);
            descriptText.innerHTML = projectItem.getDescription();
            descriptText.className = 'text-page';
            
            //icons on hover
            _addIconsHover(singleProjectDiv, _createProjectForm, ctrlDeleteProject, projectItem);

        }

    }



    function _addIconsHover(divToAppentTo, editFunction, deleteFunction, itemToManipulate){
        let modifyIcon = document.createElement('img');
            modifyIcon.src = '../src/Img/Edit_icon.png';
            divToAppentTo.appendChild(modifyIcon);
            modifyIcon.style.cssText = `width: 20px;
                                        position: absolute;
                                        top: 5px;
                                        right:3px;
                                        display: none;`
            let deleteIcon = document.createElement('img');
            deleteIcon.src = '../src/Img/Delete_icon.png';
            divToAppentTo.appendChild(deleteIcon);
            deleteIcon.style.cssText = `width: 20px;
                                        position: absolute;
                                        top: 5px;
                                        right:28px;
                                        display: none;`;

            divToAppentTo.addEventListener('mouseover', (()=>{
                modifyIcon.style.display = 'block';
                deleteIcon.style.display = 'block';
            }))
            divToAppentTo.addEventListener('mouseout', (()=>{
                modifyIcon.style.display = 'none';
                deleteIcon.style.display = 'none';
            }))
            // modifyIcon.addEventListener('click', editFunction);
            modifyIcon.addEventListener('click', (() => {
                window.event.stopPropagation();
                editFunction(itemToManipulate)
            }));
            
            deleteIcon.addEventListener('click', (() => {
                window.event.stopPropagation();
                deleteFunction(itemToManipulate)}));
    }




    //displays todos of the selected project
    function displaySelectedProject (projectItem){
        document.querySelectorAll('#temp-todo').forEach(e => e.remove());

        let tempTodoDiv = document.createElement('div'); //create new div that can be safely destroyed
        tempTodoDiv.id = 'temp-todo'; //will be destryed by id
        todosDiv.appendChild(tempTodoDiv);
        tempTodoDiv.style.cssText = todosDiv.style.cssText

        //add create todo div. always first
        let addTodoDiv = document.createElement('div');
        tempTodoDiv.appendChild(addTodoDiv);
        addTodoDiv.classList.add('add-button-class');
        addTodoDiv.innerHTML = `Add todo`;
        addTodoDiv.addEventListener('click', (()=> _createTodoForm(null)));

        if (projectItem){
            const todoList = projectItem.getTodoItems();
            for (let k = 0; k < todoList.length; k++){
                const todoItem = todoList[k];
                _drawTodoItem(todoItem, tempTodoDiv, projectItem);           
            }
        }

        
    }
        


    function _drawTodoItem(todoItem, tempTodoDiv, projectItem){
        //draws todo items of a selected project

        //for each todo item there should be a new div generated in the todo pane
        let singleTodoDiv = document.createElement('div');
        tempTodoDiv.appendChild(singleTodoDiv);
        singleTodoDiv.classList.add('todo-class');

        //change color on priority:
        switch(todoItem.getPriority()){
            case 1:
                singleTodoDiv.classList.add('low-todo-class');
                break;
            case 2:
                singleTodoDiv.classList.add('med-todo-class');
                break;
            case 3:
                singleTodoDiv.classList.add('high-todo-class');
                break;
        }        
        
        let todoTitle = document.createElement('h4');
        singleTodoDiv.appendChild(todoTitle);
        todoTitle.classList = "todo-title";
        todoTitle.innerHTML = todoItem.getTitle();

        let todoDescr = document.createElement('p');
        singleTodoDiv.appendChild(todoDescr);
        todoDescr.classList = 'todo-text';
        todoDescr.innerHTML = todoItem.getDescription();
        //add show/hide toggle for long comments

        _addIconsHover(singleTodoDiv, _createTodoForm, ctrlDeleteTodo, todoItem);
    }


    //form to create a project
    //addProject comes from control module
    function _createProjectForm (projectIn){
        //if projectIn is not empty - modify
        let _projectForm = document.createElement('div'); //overlay for project form
        mainDiv.appendChild(_projectForm);
        _projectForm.className = 'create-element-form';
        
        let closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'x';
        closeBtn.classList.add('closebtn');
        closeBtn.title = 'Close';
        _projectForm.appendChild(closeBtn);
        closeBtn.addEventListener('click', _DestroyProjectForm(_projectForm));
        closeBtn.className = 'close-button';


        let overlayContent = document.createElement('div');
        _projectForm.appendChild(overlayContent);
        overlayContent.className = 'create-project-overlay'

        let overlayTitle = document.createElement('h1');
        overlayContent.appendChild(overlayTitle);
        overlayTitle.innerHTML = 'Create new project';
        overlayTitle.classList.add('text-form');

        let getTitleLbl = document.createElement('label');
        overlayContent.appendChild(getTitleLbl);

        let getTitleDesc = document.createElement('p');
        getTitleLbl.appendChild(getTitleDesc);
        getTitleDesc.innerHTML = 'Title';
        getTitleDesc.classList = 'text-form';
        
        let getTitleInput = document.createElement('input');
        getTitleLbl.appendChild(getTitleInput);
        getTitleInput.type = 'text';
        getTitleInput.name ='projectTitle';
        getTitleInput.placeholder = 'Title';
        getTitleInput.classList = 'input-form';
        getTitleInput.maxLength = '37';

        let getDescriptLbl = document.createElement('label');
        overlayContent.appendChild(getDescriptLbl);
        getDescriptLbl.style.display = 'block';

        let getDescriptText= document.createElement('p');
        getDescriptLbl.appendChild(getDescriptText);
        getDescriptText.innerHTML = 'Description';
        getDescriptText.classList = 'text-form';

        let getDescriptInput = document.createElement('textarea');
        getDescriptLbl.appendChild(getDescriptInput);
        getDescriptInput.rows = '3';
        getDescriptInput.cols = '40';
        getDescriptInput.maxLength = '100';
        getDescriptInput.style.resize = 'none';
        getDescriptInput.style.lineHeight = '3em';
        getDescriptInput.classList = 'input-form';
        getDescriptInput.placeholder = 'Notes...\nMore notes...';

        let submitCreateBtn = document.createElement('button');
        overlayContent.appendChild(submitCreateBtn);
        submitCreateBtn.className = 'button-form';
        submitCreateBtn.innerHTML = 'Create';
        submitCreateBtn.addEventListener('click', (()=> {
            if (!projectIn){
                if(ctrlAddProject(getTitleInput.value, getDescriptInput.value))
                {                
                    (_DestroyProjectForm(_projectForm))();
                }
                else return;
            }
            else if (projectIn){
                if(ctrlModifyProj(projectIn, getTitleInput.value, getDescriptInput.value))
                {                
                    (_DestroyProjectForm(_projectForm))();
                }
                else return;
            }
        }))

        if (projectIn){
            getTitleInput.value = projectIn.getTitle();
            getDescriptInput.value = projectIn.getDescription();
            overlayTitle.innerHTML = getTitleInput.value;
            submitCreateBtn.innerHTML = 'Modify';
        }

    }

    function _DestroyProjectForm(_projectForm){
        return (() =>_projectForm.remove());
    }

    //form to create a todo item
    function _createTodoForm(todoItem){

        let _todoForm = document.createElement('div'); //overlay for project form
        mainDiv.appendChild(_todoForm);
        _todoForm.className = 'create-element-form';
        
        let closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'x';
        closeBtn.classList.add('closebtn');
        closeBtn.title = 'Close';
        _todoForm.appendChild(closeBtn);
        closeBtn.addEventListener('click', _destroyTodoForm(_todoForm));
        closeBtn.className = 'close-button';

        let overlayContent = document.createElement('div');
        _todoForm.appendChild(overlayContent);
        overlayContent.id = 'create-todo-overlay'

        let overlayTitle = document.createElement('h1');
        overlayContent.appendChild(overlayTitle);
        overlayTitle.innerHTML = 'Add a new todo item';
        overlayTitle.classList.add('text-form');


        let getTitleLbl = document.createElement('label');
        overlayContent.appendChild(getTitleLbl);

        let getTitleDesc = document.createElement('p');
        getTitleLbl.appendChild(getTitleDesc);
        getTitleDesc.innerHTML = 'Title';
        getTitleDesc.classList = 'text-form';
        
        let getTitleInput = document.createElement('input');
        getTitleLbl.appendChild(getTitleInput);
        getTitleInput.type = 'text';
        getTitleInput.name ='projectTitle';
        getTitleInput.placeholder = 'Title';
        getTitleInput.classList = 'input-form';

        let getDescriptLbl = document.createElement('label');
        overlayContent.appendChild(getDescriptLbl);
        getDescriptLbl.style.display = 'block';

        let getDescriptText= document.createElement('p');
        getDescriptLbl.appendChild(getDescriptText);
        getDescriptText.innerHTML = 'Description';
        getDescriptText.classList = 'text-form';

        let getDescriptInput = document.createElement('textarea');
        getDescriptLbl.appendChild(getDescriptInput);
        getDescriptInput.rows = '2';
        getDescriptInput.cols = '40';
        getDescriptInput.style.resize = 'none';
        getDescriptInput.style.lineHeight = '3em';
        getDescriptInput.classList = 'input-form';
        getDescriptInput.placeholder = 'Notes...\nMore notes...';

        let getDueDateLbl = document.createElement('label');
        overlayContent.appendChild(getDueDateLbl);
        getDueDateLbl.style.display = 'block';

        let getDueDateText= document.createElement('p');
        getDueDateLbl.appendChild(getDueDateText);
        getDueDateText.innerHTML = 'Due Date';
        getDueDateText.classList = 'text-form';

        let getDueDateInput = document.createElement('input');
        getDueDateLbl.appendChild(getDueDateInput);
        getDueDateInput.type = 'date';
        getDueDateInput.classList = 'input-form';

        let getPriorityLbl = document.createElement('label');
        overlayContent.appendChild(getPriorityLbl);
        getDueDateLbl.style.display = 'block';

        let getPriorityText= document.createElement('p');
        getPriorityLbl.appendChild(getPriorityText);
        getPriorityText.innerHTML = 'Priority';
        getPriorityText.classList = 'text-form';

        let getLowPriorityInput = document.createElement('div');
        getPriorityLbl.appendChild(getLowPriorityInput);
        getLowPriorityInput.classList = 'proirity-select';
        getLowPriorityInput.id = 'low-pty';
        getLowPriorityInput.priorityNum = 1;
        getLowPriorityInput.style.backgroundColor = `${colorScheme.lowPriorityBackground}`
        getLowPriorityInput.addEventListener('click', ()=>{_changePriorityColor(getLowPriorityInput)});

        let getMedPriorityInput = document.createElement('div');
        getPriorityLbl.appendChild(getMedPriorityInput);
        getMedPriorityInput.classList = 'proirity-select';
        getMedPriorityInput.id = 'med-pty';
        getMedPriorityInput.priorityNum = 2;
        getMedPriorityInput.style.backgroundColor = `${colorScheme.medPriorityBackground}`
        getMedPriorityInput.style.border =`3px solid ${colorScheme.prioritySelect}`;
        getMedPriorityInput.addEventListener('click', ()=>{_changePriorityColor(getMedPriorityInput)});
        
        
        let getHighPriorityInput = document.createElement('div');
        getPriorityLbl.appendChild(getHighPriorityInput);
        getHighPriorityInput.classList = 'proirity-select';
        getHighPriorityInput.id = 'high-pty';
        getHighPriorityInput.priorityNum = 3;
        getHighPriorityInput.style.backgroundColor = `${colorScheme.highPriorityBackground}`
        getHighPriorityInput.addEventListener('click', ()=>{_changePriorityColor(getHighPriorityInput)});

        let selectedProirity = 2;

        function _changePriorityColor(priorityButton){
            
            let priorityItems = document.getElementsByClassName('proirity-select');
            for (let i = 0; i<priorityItems.length; i++){
                priorityItems[i].style.cssText += `
                                                border: none;
                                                `
            }
        
            priorityButton.style.border =`3px solid ${colorScheme.prioritySelect}`;
            selectedProirity = priorityButton.priorityNum;
        }

        
        let submitCreateBtn = document.createElement('button');
        overlayContent.appendChild(submitCreateBtn);
        submitCreateBtn.classList = 'button-form';
        submitCreateBtn.innerHTML = 'Create';
        submitCreateBtn.addEventListener('click', (()=> {
            if (!todoItem){
                if(ctrlAddToDo(getTitleInput.value, getDescriptInput.value, getDueDateInput.value, selectedProirity)){
                    (_destroyTodoForm(_todoForm)());
                }
                else return;
            }
            else if (todoItem){
                if (ctrlModifyTodo(getTitleInput.value, getDescriptInput.value, getDueDateInput.value, selectedProirity, todoItem)){
                    (_destroyTodoForm(_todoForm)());
                }
            }
        }))

        if (todoItem){

            submitCreateBtn.innerHTML = 'Modify';
            overlayTitle.innerHTML = todoItem.getTitle();
            getTitleInput.value = todoItem.getTitle();
            getDescriptInput.value = todoItem.getDescription();
            getDueDateInput.value = todoItem.getDueDate();
            switch (todoItem.getPriority){
                case 1:
                    _changePriorityColor(getLowPriorityInput);
                    break;     
                case 2:
                    _changePriorityColor(getMedPriorityInput);
                    break;
                case 3:
                    _changePriorityColor(getHighPriorityInput);
                    break;               
            }
        }
    }

    function _destroyTodoForm(_todoForm){
        return (() => _todoForm.remove());
    }
    return {
        init,
        renderProjectsFromList,
        displaySelectedProject,
    }
})();

export {RenderPage as default};