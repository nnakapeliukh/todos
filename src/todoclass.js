function CreateToDoItem(titleIn) {
    let title = titleIn;
    let description = '';
    let dueDate = '';
    let priority = '';
    let notes = '';
    let checklist = [];
    let checklistToggle = [];
    //add checklist

    function toJson (){

        return JSON.stringify({
            titleJ:title,
            descriptionJ: description,
            dueDateJ: dueDate,
            priorityJ:priority,
            notesJ: notes,
            checklistJ: checklist,
        })
    }

    function buildFromJson(jsonString){
        const jsonObj = JSON.parse(jsonString);
        title = jsonObj.titleJ;
        description = jsonObj.descriptionJ
        dueDate = jsonObj.dueDate
        priority = jsonObj.priorityJ
        notes = jsonObj.notesJ

        checklist = jsonObj.checklistJ;
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
        checklistToggle.push(0);
    }

    function removeFromChecklist(index){
        checklist.splice(index,1); //should remove 1 element at index position
    }

    function toggleCheckItem(checkItem){
        for (let i = 0; i < checklist.length; i++){
            if (checkItem === checkItem[i]){
                checklistToggle[i] = checklistToggle[i] ^ 1;
            }
        }
    }

    function getCheckToggle(checkItem){
        for (let i = 0; i < checklist.length; i++){
            if (checkItem === checkItem[i]){
                return checklistToggle[i];
            }
        }
    }

    function getChecklist(){
        return checklist;
    }
    return {
        getTitle, setTitle,
        setDescription, getDescription,
        setDueDate, getDueDate,
        setPriority, getPriority,
        setNotes, getNotes,
        addToChecklist, removeFromChecklist, getChecklist,
        toggleCheckItem, getCheckToggle,
        toJson, buildFromJson,
    }
}

export {CreateToDoItem as default};