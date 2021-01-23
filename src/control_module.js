import CreateProjectItem from './projectclass';
import CreateTodoItem from './todoclass';
import RenderPage from './render_page';

function controlModule (projectsListIn){
    const projectsList = projectsListIn;
    let currentProject = '';
    let id = 0;

    function start() {
        RenderPage.init(addProject, selectProject, removeProject, addTodo, modifyProject, removeTodo, modifyTodo);
        currentProject = projectsList[0];
        _refreshPage();
    }


    function _refreshPage(){
        RenderPage.renderProjectsFromList(projectsList);
        RenderPage.displaySelectedProject(currentProject);
    }

    function selectProject(projectItem){
        currentProject = projectItem;
        _refreshPage();
    }

    function addProject (title, descriptionIn){
        id++;

        if (title){
            let newProject = CreateProjectItem (title);
            newProject.setDescription(descriptionIn)
            newProject.setId(id);
            projectsList.push(newProject);
            _refreshPage();
            return true; //add check 
        }
        else return false;
    }
    function removeProject(projectItem){
        //look for the project to delete
        for (let i =0; i < projectsList.length;i++){
            if (projectItem === projectsList[i]){
                //if deleting selected project select previous one
                if (currentProject === projectItem){
                    setSelectedProject(projectsList[i - 1]);
                }
                projectsList.splice(i, 1);
                _refreshPage();
                return;
            }
        }
        
    }
    function modifyProject(projectIn, titleIn, descriptionIn){
       if (titleIn){
            projectIn.setTitle(titleIn);
            projectIn.setDescription(descriptionIn);
            _refreshPage();
            return true;
       }
       else {
           return false;
       }
    }

    
    function addTodo (titleIn, descriptionIn, dueDateIn, priorityIn){
        if (titleIn){
            let newTodo = CreateTodoItem(titleIn);            
            newTodo.setDescription(descriptionIn);
            newTodo.setPriority(priorityIn);

            currentProject.addTodoItem(newTodo);

            _refreshPage();
            return true
        }
        else return false
    }

    function removeTodo(todoIn){
       //look for the todo to delete
       let todoList = currentProject.getTodoItems();
       for (let i =0; i < todoList.length;i++){
            if (todoIn === todoList[i]){            
                currentProject.removeTodoItem(i);
                _refreshPage();
                return;
            }
        }
    }

    function modifyTodo (titleIn, descriptionIn, dueDateIn, priorityIn, todoItem){
        todoItem.setTitle(titleIn);
        todoItem.setDescription(descriptionIn);
        todoItem.setPriority(priorityIn);
        return true;
    }
    
    
    function setSelectedProject(project){
        currentProject = project;
    }

    function getSelectedProject(){
        return currentProject
    }
    return {
        start,
        addProject, removeProject,
        addTodo, removeTodo, modifyTodo,
        setSelectedProject, getSelectedProject,
    }
}

export {
    controlModule as default
}