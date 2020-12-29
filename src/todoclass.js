function CreateToDoItem(titleIn) {
    let title = titleIn;
    let description = '';
    let dueDate = '';
    let priority = '';
    let notes = '';
    let checklist = [];
    //add checklist


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

    function setDueDate (dueDateIn){
        dueDate = dueDateIn;
    }
    function getDueDate (){
        return dueDate;
    }

    function setPriority (priorityIn){
        priority = priorityIn
    }
    function getPriority (){
        return priority;
    }

    function setNotes (notesIn){
        notes = notesIn;
    }
    function getNotes (){
        return notes;
    }

    function addToChecklist(checklistIn){
        checklist.push(checklistIn);
    }

    function removeFromChecklist(index){
        checklist.splice(index,1); //should remove 1 element at index position
    }

    return {
        getTitle, setTitle,
        setDescription, getDescription,
        setDueDate, getDueDate,
        setPriority, getPriority,
        setNotes, getNotes,
        addToChecklist, removeFromChecklist,
    }
}

export {CreateToDoItem as default};