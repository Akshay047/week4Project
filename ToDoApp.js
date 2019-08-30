let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let app = express();

//For the db
let db = [];

//For file rendering:
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// static assets
app.use(express.static('images'));
app.use(express.static('css'));

//Enables us to navigate to the folder where the html files reside
//app.use(express.static(__dirname + '/htmlFiles'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.get('/', function(req, res){
    res.sendFile(__dirname + '/htmlFiles/home.html');
});


//Getting a new task...
//This method sends the html file
app.get('/addTask', function(req, res){
    res.sendFile(__dirname + '/htmlFiles/addTask.html');
});

//This method receives a html input
app.post('/addTask', function(req, res){
    // let newTask = req.bodyParser.addTask;
    // let newDate = req.bodyParser.tDate;
    // let newDesc = req.bodyParser.tDesc;

    db.push({
        taskName: req.body.tTask,
        taskDate: req.body.tDate,
        taskDesc: req.body.tDesc
    })

});

app.get('/listAll', function(req, res){
    res.render('listAll.html', {taskDb:db})
});


app.listen(8080);