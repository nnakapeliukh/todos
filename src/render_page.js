// continue: deleting project does not redraw todo items

//probably have to be separated into at leas 2 files: 1 for projects 1 for todos
//color pallete https://www.color-hex.com/color-palette/389
//move somhere else 
let colorScheme = {
    topPaneBackground : '#3c2f2f',
    botPaneBackground : '#be9b7b',
    topItemBackground : '#854442',
    botItemBackground : '#4b3832',
    formTextColor: '#FFF4E6',
    inputFormBackground: '#be9b7b',
    buttonFormBackground: '#854442'
}



const renderPage = (() => {
    let mainDiv = document.createElement('div');
    let projectsDiv = document.createElement('div');
    let todosDiv = document.createElement('div');
    let controlModule = '';

    let projectsList = [];

    function init (projectsListIn, divToRenderIn, controlModuleIn){
        projectsList = projectsListIn;
        mainDiv = divToRenderIn;
        controlModule = controlModuleIn;

        document.body.style.background = '#111';
        mainDiv.appendChild(projectsDiv);
        mainDiv.appendChild(todosDiv);
        
        //screen will be devided into 2 parts: top for projects, bottom for todos. Ratio: ~3:7.
        //projects pane will have add project as first element
        //if project is open, first element of todos will be add a todo


        //projects pane        
        //add auto resizing of the height depending on how many aditional overlays
        document.body.style.margin = '0';
        projectsDiv.style.cssText = `
                                display: flex;                                
                                min-height: 30vh;
                                min-height: 290px;
                                min-width: 100%;
                                background-color: ${colorScheme.topPaneBackground};
                                flex: 1 1 auto;
                                overflow-y: auto;
                                overflow-x: auto;`   
        // align-items: center;

        //todos pane 
        todosDiv.style.cssText = `
                                display: flex;
                                min-height: 60vh;
                                flex: 1 1 auto;
                                overflow-x: auto;
                                justify-content: space-evenly;
                                flex-wrap: wrap;
                                width: 100%;
                                background-color: ${colorScheme.botPaneBackground};`   

        //add create project div/button
        let addProjectDiv = document.createElement('div');
        projectsDiv.appendChild(addProjectDiv);
        addProjectDiv.classList.add('add-button-class');
        addProjectDiv.innerHTML = 'add project';
        addProjectDiv.addEventListener('click', _createProjectForm);


        _renderProjectsFromList();
        _displaySelectedProject(projectsList[0]);
    }

    //render all projects
    function _renderProjectsFromList(){

        //destroy old projects before drawing;
        document.querySelectorAll('.project-class').forEach(e => e.remove());
           
        //draw new projects
        for (let indexNew = 0; indexNew < projectsList.length; indexNew++){
            let projectItem = projectsList[indexNew];

            //create div for each project in the project div(top)
            const singleProjectDiv = document.createElement('div');
            projectsDiv.appendChild(singleProjectDiv);
            
            singleProjectDiv.classList = 'project-class'; 
            singleProjectDiv.addEventListener('click', (() => {
                    document.getElementById('temp-todo').remove(),
                    _displaySelectedProject(projectItem);
                    
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
            _addIconsHover(singleProjectDiv, _createProjectForm, _deleteProject, projectItem);

        }


        
        //apply styles for projects
        document.querySelectorAll('.project-class').forEach(e => e.style.cssText += `
                                            display: inline-block;
                                            position:relative;
                                            min-height: 200px;
                                            width: 200px;
                                            margin: 20px;
                                            padding-left: 10px;
                                            padding-right: 5px;
                                            word-wrap: break-word;  
                                            text-alight: center;
                                            background-color: ${colorScheme.topItemBackground};                                           
                                            overflow: hidden;
                                            text-overflow: ellipsis;                                                
                                            `);
        
        document.querySelectorAll('.add-button-class').forEach(e => e.style.cssText += `
                                            display: inline-block;
                                            height: 50px;
                                            width: 50px;
                                            margin: 20px;
                                            padding: 20px;
                                            text-alight: center;
                                            // background-color: ${colorScheme.topItemBackground}`);
        

        document.querySelectorAll('.text-page').forEach(e => e.style.cssText =`max-width: 500px;`);
    }

    function _deleteProject(projectIn){
        controlModule.removeProject(projectIn)
        _renderProjectsFromList();
    }

    function _addIconsHover(divToAppentTo, editFunction, deleteFunction, itemToManipulate){
        let modifyIcon = document.createElement('img');
            modifyIcon.src = '../src/Img/Edit_icon.png';
            divToAppentTo.appendChild(modifyIcon);
            modifyIcon.style.cssText = `width: 30px;
                                        position: absolute;
                                        top: 5px;
                                        right:3px;
                                        display: none;`
            let deleteIcon = document.createElement('img');
            deleteIcon.src = '../src/Img/Delete_icon.png';
            divToAppentTo.appendChild(deleteIcon);
            deleteIcon.style.cssText = `width: 30px;
                                        position: absolute;
                                        top: 5px;
                                        right:43px;
                                        display: none;`;

            divToAppentTo.addEventListener('mouseover', (()=>{
                modifyIcon.style.display = 'block';
                deleteIcon.style.display = 'block';
            }))
            divToAppentTo.addEventListener('mouseout', (()=>{
                modifyIcon.style.display = 'none';
                deleteIcon.style.display = 'none';
            }))
            modifyIcon.addEventListener('click', editFunction);
            deleteIcon.addEventListener('click', (() => {deleteFunction(itemToManipulate)}));
            alert(projectsList.length);
    }
    //displays todos of the selected project
    function _displaySelectedProject (projectItem){
        document.querySelectorAll('#temp-todo').forEach(e => e.remove());
        controlModule.setSelectedProject(projectItem);
        let tempTodoDiv = document.createElement('div'); //create new div that can be safely destroyed
        tempTodoDiv.id = 'temp-todo'; //will be destryed by id
        todosDiv.appendChild(tempTodoDiv);
        tempTodoDiv.style.cssText = todosDiv.style.cssText

        //add create todo div. always first
        let addTodoDiv = document.createElement('div');
        tempTodoDiv.appendChild(addTodoDiv);
        addTodoDiv.classList.add('add-button-class');
        addTodoDiv.innerHTML = `${projectItem.getTitle()}`;
        addTodoDiv.addEventListener('click', (()=> _createTodoForm(projectItem)));

        const todoList = projectItem.getTodoItems();
        for (let k = 0; k < todoList.length; k++){

            const todoItem = todoList[k];
            _drawTodoItem(todoItem, tempTodoDiv);            
    }

    
    //apply styles for todos
    document.querySelectorAll('.todo-class').forEach(e => e.style.cssText += `
                                        display: inline-block;
                                        min-height: 200px;
                                        min-width: 200px;
                                        margin: 20px auto;
                                        padding: 20px;
                                        word-wrap: break-word;  
                                        text-alight: center;
                                        background-color: ${colorScheme.botItemBackground};`);
                                        

    document.querySelectorAll('.add-button-class').forEach(e => e.style.cssText += `
                                        display: inline-block;
                                        height: 50px;
                                        width: 50px;
                                        margin: 20px;
                                        padding: 20px;
                                        text-alight: center;
                                        background-color: ${colorScheme.topItemBackground}`);

    document.querySelectorAll('.todo-text').forEach(e => e.style.cssText += `
                                        display: block;
                                        max-width: 220px;
                                        margin: 20px;
                                        word-wrap: break-word;
                                        padding: 20px;
                                        text-alight: center;`);
    }

    function _drawTodoItem(todoItem, tempTodoDiv){
        //for each todo item there should be a new div generated in the todo pane
        let singleTodoDiv = document.createElement('div');
        tempTodoDiv.appendChild(singleTodoDiv);
        singleTodoDiv.classList.add('todo-class');
        
        let todoTitle = document.createElement('h4');
        singleTodoDiv.appendChild(todoTitle);
        todoTitle.classList = "todo-title";
        todoTitle.innerHTML = todoItem.getTitle();

        let todoDescr = document.createElement('p');
        singleTodoDiv.appendChild(todoDescr);
        todoDescr.classList = 'todo-text';
        todoDescr.innerHTML = todoItem.getDescription();
        //add show/hide toggle for long comments


    }


    //form to create a project
    function _createProjectForm (){
        
        let _projectForm = document.createElement('div'); //overlay for project form
        mainDiv.appendChild(_projectForm);
        
        let closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'x';
        closeBtn.classList.add('closebtn');
        closeBtn.title = 'Close';
        _projectForm.appendChild(closeBtn);
        closeBtn.addEventListener('click', _DestroyProjectForm(_projectForm));


        let overlayContent = document.createElement('div');
        _projectForm.appendChild(overlayContent);

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
            if(controlModule.addProject(getTitleInput.value, getDescriptInput.value))
            {
                _renderProjectsFromList();
                (_DestroyProjectForm(_projectForm))();
            }
            else return;
        }))


        //overlay style:
        _projectForm.style.cssText = `height: 100%;
                                        width: 100%;
                                        position: fixed;
                                        z-index: 1;
                                        display: block;
                                        top: 0;
                                        left: 0;
                                        background-color: rgb(0,0,0);
                                        background-color: rgba(0,0,0, 0.7);`;

        overlayContent.style.cssText = `position: relative;
                                        top: 25%;
                                        width: 40%;
                                        text-align: center;
                                        background-color: ${colorScheme.topPaneBackground};
                                        margin-top: 30px;
                                        margin: auto;`;

        closeBtn.style.cssText = `position: absolute;
                                  top: 20px;
                                  right: 45px;
                                  font-size: 60px;
                                  cursor: pointer;
                                  color: white;`;

        //form elements styles                         
        let textToBeStyled = document.getElementsByClassName('text-form');
        for (let i = 0; i<textToBeStyled.length; i++){
            textToBeStyled[i].style.cssText += `
                                                color: ${colorScheme.formTextColor};
                                                margin: 10px;
                                                `
        }

        let inputsToBeStyled = document.getElementsByClassName('input-form');
        for (let i = 0; i<inputsToBeStyled.length; i++){
            inputsToBeStyled[i].style.cssText += `
                                                color: ${colorScheme.formTextColor};
                                                margin-bottom: 20px;
                                                background-color: ${colorScheme.inputFormBackground};
                                                border: none;
                                                padding: 5px;
                                                `
        }

        let buttonsToBeStyled = document.getElementsByClassName('button-form');
        for (let i = 0; i<buttonsToBeStyled.length; i++){
            buttonsToBeStyled[i].style.cssText += `
                                                color: ${colorScheme.formTextColor};
                                                margin: 20px;
                                                background-color: ${colorScheme.buttonFormBackground};
                                                border: none;
                                                padding: 10px;
                                                `
        }

    }

    function _DestroyProjectForm(_projectForm){
        return (() =>_projectForm.remove());
    }

    //form to create a todo item
    function _createTodoForm(projectItem){

        let _todoForm = document.createElement('div'); //overlay for project form
        mainDiv.appendChild(_todoForm);
        
        let closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'x';
        closeBtn.classList.add('closebtn');
        closeBtn.title = 'Close';
        _todoForm.appendChild(closeBtn);
        closeBtn.addEventListener('click', _destroyTodoForm(_todoForm));


        let overlayContent = document.createElement('div');
        _todoForm.appendChild(overlayContent);

        let overlayTitle = document.createElement('h1');
        overlayContent.appendChild(overlayTitle);
        overlayTitle.innerHTML = 'Add new todo item';
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

        let submitCreateBtn = document.createElement('button');
        overlayContent.appendChild(submitCreateBtn);
        submitCreateBtn.className = 'button-form';
        submitCreateBtn.innerHTML = 'Create';
        submitCreateBtn.addEventListener('click', (()=> {
            if(controlModule.addTodo(getTitleInput.value, getDescriptInput.value))
            {
                (_destroyTodoForm(_todoForm)());
                _displaySelectedProject(projectItem)
            }
            else return;
        }))


        //overlay style:
        _todoForm.style.cssText = `height: 100%;
                                        width: 100%;
                                        position: fixed;
                                        z-index: 1;
                                        display: block;
                                        top: 0;
                                        left: 0;
                                        background-color: rgb(0,0,0);
                                        background-color: rgba(0,0,0, 0.7);`;

        overlayContent.style.cssText = `position: relative;
                                        top: 15%;
                                        width: 40%;
                                        text-align: center;
                                        background-color: ${colorScheme.topPaneBackground};
                                        margin-top: 30px;
                                        margin: auto;`;

        closeBtn.style.cssText = `position: absolute;
                                  top: 20px;
                                  right: 45px;
                                  font-size: 60px;
                                  cursor: pointer;
                                  color: white;`;

        //form elements styles                         
        let textToBeStyled = document.getElementsByClassName('text-form');
        for (let i = 0; i<textToBeStyled.length; i++){
            textToBeStyled[i].style.cssText += `
                                                color: ${colorScheme.formTextColor};
                                                margin: 10px;
                                                `
        }

        let inputsToBeStyled = document.getElementsByClassName('input-form');
        for (let i = 0; i<inputsToBeStyled.length; i++){
            inputsToBeStyled[i].style.cssText += `
                                                color: ${colorScheme.formTextColor};
                                                margin-bottom: 20px;
                                                background-color: ${colorScheme.inputFormBackground};
                                                border: none;
                                                padding: 5px;
                                                `
        }

        let buttonsToBeStyled = document.getElementsByClassName('button-form');
        for (let i = 0; i<buttonsToBeStyled.length; i++){
            buttonsToBeStyled[i].style.cssText += `
                                                color: ${colorScheme.formTextColor};
                                                margin: 20px;
                                                background-color: ${colorScheme.buttonFormBackground};
                                                border: none;
                                                padding: 10px;
                                                `
        }
    }

    function _destroyTodoForm(_todoForm){
        return (() => _todoForm.remove());
    }
    return {
        init,
    }
})();

export {renderPage as default};