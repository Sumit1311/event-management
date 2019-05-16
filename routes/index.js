var express = require('express');
var router = express.Router();
var event_management=require('./event_management.js');
const { check, validationResult } = require('express-validator/check');
/* GET home page. */
router.get('/', function(req, res) {
  var list=event_management.getEventsList();
  res.render('index', { title: 'Event Management',list : list});
});

router.get('/new', function(req, res) {
  res.render('new', { title: 'Event Management'});
});

router.get('/api/events', function(req, res) {
    var list=event_management.getEventsList();
    var f = req.query.from, t = req.query.to;
    f = f ? f : 0;
    t = t ? t : Number.MAX_SAFE_INTEGER;
    console.log("From ",f," To ", t);
    var listToSend = [];
    for(var i = 0; i < list.length; i++) {
        var l = list[i];
        if(parseInt(l.eventStartTime) >= f || parseInt(l.eventEndTime) <= t) {
        var o = {
          "id": l.id,
          "title": l.eventTitle,
          "class": "event-important",
          "start": parseInt(l.eventStartTime), // Milliseconds
          "end": parseInt(l.eventEndTime), // Milliseconds
          "url": "/event/"+l.id
              }
        listToSend.push(o);
        }
    }
    var response = {
        success : 1,
        result : listToSend
    }
    res.send(response);
    res.end();
});

router.get('/event/:id', function(req, res){
    var id = req.params.id;
    var list=event_management.getEventsList();
    var e = event_management.isExist(list, function(e){
        return e.id == id;
    });
    if(e != null) {
        res.render('event', { event : e});
    } else {
        res.render('error', { message: 'Event Doesnot Exist'});
    }
    
    
});

router.post('/new',[
    check("eventTitle").not().isEmpty(),
    check("eventDescription").not().isEmpty(),
    check("eventStartDate").not().isEmpty(),
    check("eventEndDate").not().isEmpty(),
    check("eventLatitude").not().isEmpty(),
    check("eventLongitude").not().isEmpty()

] ,function(req,res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    var body=req.body;
    var newObject = {
     "eventTitle" : body.eventTitle,
     "eventDescription" : body.eventDescription,
     "eventStartTime" : parseInt(body.eventStartDate),
     "eventEndTime": parseInt(body.eventEndDate),
     "eventLatitude": parseFloat(body.eventLatitude),
     "eventLongitude": parseFloat(body.eventLongitude)
    };
    if(isNaN(newObject.eventStartTime)
        || isNaN(newObject.eventEndTime)
        || isNaN(newObject.eventLatitude)
        || isNaN(newObject.eventLongitude)) {
        res.render('error', { message: 'Invalid input parameters'});
    }
    var list=event_management.getEventsList();
    var e = event_management.isExist(list, function(e){
        return e.eventStartTime == newObject.eventStartTime && e.eventEndTime == newObject.eventEndTime;
    });
        
    if(e == null)
    {
        event_management.addEvent(list, newObject);
        res.redirect("/");
    }
    else
    {
        res.render('error', { message: 'Event Already Exists'});
    }
});

module.exports = router;
