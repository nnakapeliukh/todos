import CreateProjectItem from './projectclass';
import CreateTodoItem from './todoclass';

function controlModule (projectsListIn){
    const projectsList = projectsListIn;
    let selectedProject = '';
    let id = 0;

    function addProject (title, descriptionIn){
        id++;

        if (title){
            let newProject = CreateProjectItem (title);
            newProject.setDescription(descriptionIn)
            newProject.setId(id);
            projectsList.push(newProject);
            return true; //add check 
        }
        else return false;
    }
    function removeProject(project){
        for (let i =0; i < projectsList.length;i++){
            if (project === projectsList[i]){
                projectsList.splice(i, 1);
                return;
            }
        }
    }
    function addTodo (titleIn, descriptionIn){
        if (titleIn){
            let newTodo = CreateTodoItem(titleIn);
            newTodo.setDescription(descriptionIn);
            selectedProject.addTodoItem(newTodo);
            return true
        }
        else return false
    }

    function setSelectedProject(project){
        selectedProject = project;
    }

    function getSelectedProject(){
        return selectedProject
    }
    return {
        addProject, removeProject,
        addTodo,
        setSelectedProject, getSelectedProject,
    }
}

export {
    controlModule as default
}