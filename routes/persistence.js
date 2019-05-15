var fs = require("fs");

function readAll()
{
    var data = fs.readFileSync("event.list",{
        "encoding" : "utf8"
    });
    console.info("read data from file",data);
    if(data == "")
        return [];
    else
        return JSON.parse(data);
}

function writeAll(data)
{
    console.info("writing to file",JSON.stringify(data));
    fs.writeFileSync("event.list",JSON.stringify(data));
}


function truncate()
{
    fs.writeFileSync("event.list.backup",JSON.stringify(readAll()));
    writeAll([]);
}

function getId()
{
    return parseInt(fs.readFileSync(".id","utf8"));
}

function writeId(id)
{
    fs.writeFileSync(".id",""+id);
}

module.exports = {
    readAllRecords : readAll,
    writeAllRecords : writeAll,
    truncate : truncate,
    getId : getId,
    writeId : writeId
};
