var persistence = require("./persistence.js");

/**
 * Object Format : {
 *
     "id" : <number>
     "eventTitle" : <string>
     "eventDescription" : <string>
     "eventStartTime" : <number>
     "eventEndTime": <number>
     "eventLatitude" : <float>
     "eventLongitude" : <float>
   }
 *
 */


function getEventsList()
{
    var list=persistence.readAllRecords();
    return list;
}


function addEvent(list, item)
{
    item.id = getId();
    list.push(item);
    persistence.writeAllRecords(list);
    return list;
}

function isExist(list, compare) {
    var index = list.findIndex(compare);
    if(index == -1) {
        return null;
    }
    return list[index];
}

function getId()
{
    var id=persistence.getId();
    id++;
    persistence.writeId(id);
    return id;
}

module.exports = {
    getEventsList : getEventsList,
    addEvent : addEvent,
    isExist : isExist,
    getNextId : getId
}
