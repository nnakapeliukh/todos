import CreateProjectItem from './projectclass'


//color pallete https://www.color-hex.com/color-palette/389
//move somhere else 
let colorScheme = {
    topPaneBackground : '#3c2f2f',
    botPaneBackground : '#be9b7b',
    topItemBackground : '#854442',
    botItemBackground : '#4b3832'
}



const renderPage = (() => {
    let mainDiv = document.createElement('div');
    let projectsDiv = document.createElement('div');
    let todosDiv = document.createElement('div');

    function init (projects_list, divToRenderIn){
        mainDiv = divToRenderIn;
        document.body.style.background = '#111'
        mainDiv.appendChild(projectsDiv);
        mainDiv.appendChild(todosDiv);
        
        //screen will be devided into 2 parts: top for projects, bottom for todos. Ratio: ~3:7.
        //projects pane will have add project as first element
        //if project is open, first element of todos will be add a todo


        //projects pane
        projectsDiv.style.backgroundColor = colorScheme.topPaneBackground;
        projectsDiv.style.height = '30%';
        projectsDiv.style.width = '100%';


        //todos pane 
        todosDiv.style.minHeight = '70vh';
        todosDiv.style.backgroundColor = colorScheme.botPaneBackground
       

        //add new project div. placeholder for now
        let addProjectDiv = document.createElement('div');
        projectsDiv.appendChild(addProjectDiv);
        addProjectDiv.classList.add('project-class');
        addProjectDiv.innerHTML = 'add project';
        addProjectDiv.addEventListener('click', _addProjectForm);
        //add new todo div . placeholder for now
        let addTodoDiv = document.createElement('div');
        todosDiv.appendChild(addTodoDiv);
        addTodoDiv.classList.add('todo-class');
        addTodoDiv.innerHTML = 'add project';







        //add all the rest of the projects
        

        //


        //this should be moved to some other fnc
        for (let i = 0; i < projects_list.length; i++){
            let projectItem = projects_list[i];

            //create div for each project in the project div(top)
            const singleProjectDiv = document.createElement('div');
            projectsDiv.appendChild(singleProjectDiv);
            
            singleProjectDiv.classList.add('project-class'); //project class name
            singleProjectDiv.innerHTML = projectItem.getTitle();

            //style
            

            const todoList = projectItem.getTodoItems();
            for (let k = 0; k < todoList.length; k++){

                const todoItem = todoList[k];

                //for each todo item there should be a new div generated in the todo item view pane(lower part of the screen)
                const singleTodoDiv = document.createElement('div');
                todosDiv.appendChild(singleTodoDiv);
                singleTodoDiv.classList.add('todo-class');
                singleTodoDiv.innerHTML = todoItem.getTitle();

            }

        }


        //apply styles:
        _applyStyle();

    }
    //form to create a project
    //change it so that its not created every time
    function _addProjectForm (){
        let projectFormDiv = document.createElement('div'); //overlay
        mainDiv.appendChild(projectFormDiv);
        
        let closeBtn = document.createElement('span');
        closeBtn.innerHTML = 'x';
        closeBtn.classList = 'closebtn';
        closeBtn.title = 'Close overlay';
        projectFormDiv.appendChild(closeBtn);
        closeBtn.addEventListener('click', (()=>{projectFormDiv.style.display='none'}));


        let overlayContent = document.createElement('div');
        projectFormDiv.appendChild(overlayContent);

        let titleInput = document.createElement('input');
        overlayContent.appendChild(titleInput);
        titleInput.type = 'text';
        titleInput.name ='projectTitle';
        titleInput.placeholder = 'Title';

        //overlay style:
        projectFormDiv.style.cssText = `height: 100%;
                                        width: 100%;
                                        position: fixed;
                                        z-index: 1;
                                        top: 0;
                                        left: 0;
                                        background-color: rgb(0,0,0);
                                        background-color: rgba(0,0,0, 0.7);`;

        overlayContent.style.cssText = `position: relative;
                                        top: 46%;
                                        width: 80%;
                                        text-align: center;
                                        margin-top: 30px;
                                        margin: auto;`;

        closeBtn.style.cssText = `position: absolute;
                                  top: 20px;
                                  right: 45px;
                                  font-size: 60px;
                                  cursor: pointer;
                                  color: white;`;
    }




    function _applyStyle(){
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

        selElements = document.getElementsByClassName('todo-class');
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



    return {
        init,
    }
})();

export {renderPage as default};