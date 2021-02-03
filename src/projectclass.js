import CreateTodoItem from './todoclass';

function CreateProjectItem(titleIn) {
    let title = titleIn;
    let description = '';
    let todoList = [];
    let id = 0;

    function toJson (){
        let todoListJson = [];
        for (let i = 0; i < todoList.length; i++){
            todoListJson.push(todoList[i].toJson());
        }

        return JSON.stringify({
            titleJ:title,
            descriptionJ: description,
            todoListJsonJ: todoListJson,
        })
    }

    function buildFromJson(jsonString){
        let JsonObj = JSON.parse(jsonString);
        title = JsonObj.titleJ;
        description = JsonObj.descriptionJ;

        for (let i = 0; i < JsonObj.todoListJsonJ.length; i++){
            let tempTodo = CreateTodoItem('itle');
            tempTodo.buildFromJson(JsonObj.todoListJsonJ[i]);
            todoList.push(tempTodo);
        }
    }

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
        addTodoItem, removeTodoItem, getTodoItems,
        toJson, buildFromJson,
    }
}
export {CreateProjectItem as default};