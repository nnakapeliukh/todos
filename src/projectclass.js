function CreateProjectItem(titleIn) {
    let title = titleIn;
    let description = '';
    let todoList = [];
    let id = 0;

    function setId (idIn){
        id = idIn;
    }
    function getId (){
        return id;
    }

    function setTitle (titleIn){
        title = titleIn;
    }
    function getTitle (){
        return title;
    }

    function setDescription (descr){
        description = descr;
    }
    function getDescription (){
        return description;
    }

    function addTodoItem(todoItem){
        todoList.push(todoItem);
    }
    function removeTodoItem(index){
        todoList.splice(index,1);
    }
    function getTodoItems(){
        return todoList;
    }
    return {
        setId, getId,
        setTitle, getTitle,
        setDescription, getDescription,
        addTodoItem, removeTodoItem, getTodoItems
    }
}
export {CreateProjectItem as default};