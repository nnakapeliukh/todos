import CreateProjectItem from './projectclass'


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


    let projectsList = [];

    function init (projectsListIn, divToRenderIn){
        projectsList = projectsListIn;
        mainDiv = divToRenderIn;
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
                                display: block;                                
                                height: 35vh;
                                min-height: 290px;
                                width: 100%;
                                background-color: ${colorScheme.topPaneBackground};`   


        //todos pane 
        todosDiv.style.cssText = `
                                display: block;
                                
                                min-height: 65vh;
                                width: 100%;
                                background-color: ${colorScheme.botPaneBackground};`   

        //add create project div. placeholder for now
        let addProjectDiv = document.createElement('div');
        projectsDiv.appendChild(addProjectDiv);
        addProjectDiv.classList.add('project-class');
        addProjectDiv.innerHTML = 'add project';
        addProjectDiv.addEventListener('click', _createProjectForm);


        _renderProjectsFromList();
        _displaySelectedProject(projectsList[0]);
    }

    //render all projects
    function _renderProjectsFromList(){

        for (let i = 0; i < projectsList.length; i++){
            let projectItem = projectsList[i];

            //create div for each project in the project div(top)
            const singleProjectDiv = document.createElement('div');
            projectsDiv.appendChild(singleProjectDiv);
            
            singleProjectDiv.classList.add('project-class'); //project class name
            singleProjectDiv.innerHTML = projectItem.getTitle();

            singleProjectDiv.addEventListener('click', (() => {
                document.getElementById('temp-todo').remove();
                _displaySelectedProject(projectItem)
            }));
        }


        //apply styles for projects
        let selElements = document.getElementsByClassName('project-class');
        for (let i = 0; i < selElements.length; i++){
            selElements[i].style.display = 'inline-block';
            selElements[i].style.height = '200px';
            selElements[i].style.width = '200px';
            
            selElements[i].style.margin = '20px';
            selElements[i].style.padding = '20px';
            
            selElements[i].style.textAlign = 'center';
            selElements[i].style.backgroundColor = colorScheme.topItemBackground;
        }

    }

    //displays todos of the selected project
    function _displaySelectedProject (projectItem){

        let tempTodoDiv = document.createElement('div'); //create new div that can be safely destroyed
        tempTodoDiv.id = 'temp-todo'; //will be destryed by id
        todosDiv.appendChild(tempTodoDiv);

        //add create todo div. always first
        let addTodoDiv = document.createElement('div');
        tempTodoDiv.appendChild(addTodoDiv);
        addTodoDiv.classList.add('todo-class');
        addTodoDiv.innerHTML = 'add todo';


        const todoList = projectItem.getTodoItems();
        for (let k = 0; k < todoList.length; k++){

            const todoItem = todoList[k];

            //for each todo item there should be a new div generated in the todo pane
            let singleTodoDiv = document.createElement('div');
            tempTodoDiv.appendChild(singleTodoDiv);
            singleTodoDiv.classList.add('todo-class');
            singleTodoDiv.innerHTML = todoItem.getTitle();

        }


        //apply styles for todos
        let selElements = document.getElementsByClassName('todo-class');
        for (let i = 0; i < selElements.length; i++){
            selElements[i].style.display = 'inline-block';

            selElements[i].style.height = '200px';
            selElements[i].style.width = '200px';
            
            selElements[i].style.margin = '20px';
            selElements[i].style.padding = '20px';
            
            selElements[i].style.textAlign = 'center';
            selElements[i].style.backgroundColor = colorScheme.botItemBackground;
        }
        
    }

    //form to create a project
    function _createProjectForm (){
        
        let _projectForm = document.createElement('div'); //overlay for project form
        mainDiv.appendChild(_projectForm);
        
        let closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'x';
        closeBtn.classList = 'closebtn';
        closeBtn.title = 'Close';
        _projectForm.appendChild(closeBtn);
        closeBtn.addEventListener('click', _DestroyProjectForm(_projectForm));


        let overlayContent = document.createElement('div');
        _projectForm.appendChild(overlayContent);

        let overlayTitle = document.createElement('h1');
        overlayContent.appendChild(overlayTitle);
        overlayTitle.innerHTML = 'Create new project';
        overlayTitle.classList = 'text-form';

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
        getTitleInput.cols = '40'

        let getNotesLbl = document.createElement('label');
        overlayContent.appendChild(getNotesLbl);
        getNotesLbl.style.display = 'block';

        let getNotesDesc= document.createElement('p');
        getNotesLbl.appendChild(getNotesDesc);
        getNotesDesc.innerHTML = 'Notes';
        getNotesDesc.classList = 'text-form';

        let getNotesInput = document.createElement('textarea');
        getNotesLbl.appendChild(getNotesInput);
        getNotesInput.rows = '4';
        getNotesInput.cols = '40';
        getNotesInput.style.resize = 'none';
        getNotesInput.style.lineHeight = '3em';
        getNotesInput.classList = 'input-form';
        getNotesInput.placeholder = 'Notes...\nMore notes...';

        let submitCreateBtn = document.createElement('button');
        overlayContent.appendChild(submitCreateBtn);
        submitCreateBtn.className = 'button-form';
        submitCreateBtn.innerHTML = 'Create'
        // submitCreateBtn.addEventListener('click', _addProjectToList)


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

    //add project to the project list
    //this should be part of some observer or such
    function _addProjectToList(projectToAdd){
        // projectsList.push(projectToAdd)
        // //add redraw
        // _renderProjectsFromList();
    }

    function _DestroyProjectForm(_projectForm){
        return (() =>_projectForm.remove());
    }

    return {
        init,
    }
})();

export {renderPage as default};