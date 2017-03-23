var morgan = require('morgan');
var path = require('path');
var express=require('express');
var app=express();
app.use(morgan('combined'));

var Pool=require('pg').Pool;

var config={
    user:'preethiannjacob',
    database:'preethiannjacob',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD //create environment variable
};

app.use(express.static('ui'));
app.get('/',function(req,res){
	res.sendFile(__dirname + '/ui/index.html');
});


/* one way of including css
app.get('/css/style.css',function(req,res){
	res.sendFile(__dirname + '/css/style.css');
});*/

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT*FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
    
});

app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

/*Old code
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={ 
   			'article-one':{
				title:"Article One | Preethi Ann Jacob",
				heading:'Article One',
				date:'Sep 5, 2016',
				content:`
				         <p>
  							This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
  						</p>
  						<p>
  							This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
  					   </p>
  					   <p>
  							This is the content of my first article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
  					   </p>`
			},
			'article-two':{
				title:'Article Two | Preethi Ann Jacob',
				heading:'Article Two',
				date: 'Feb 5, 2017',
				content: `
				    <p>
  							This is the content of my second article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
  					</p> `
			},
			'article-three':{
				title:'Article Three | Preethi Ann Jacob',
				heading:'Article Three',
				date: 'Feb 15, 2017',
				content: `
				    <p>
  							This is the content of my third article. This is the content of my first article. This is the content of my first article. This is the content of my first article.
  					</p> `
			}
 };
function createTemplate(data){
	var title=data.title;
	var date=data.date;
	var heading=data.heading;
	var content=data.content;

	var htmlTemplate=`
	<html>
  	<head>
  	<title>
  		${title}
  	</title>
  	<meta name="viewport" content="width=device-width, initial-scale=1"/>
  	</head>
  	<body>
  		<div>
  			<a href="/">Home</a>
  		</div>
  		<hr/>
  		<h3>
  			${heading}
  		</h3>
  		<div> 
  			${date}
  		</div>
  		<div>
  			${content}
  		</div>
  	</body>
	</html>
  `; 
  return htmlTemplate;

}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
  counter=counter+1;
  res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    //Get the name from the request
    var name=req.query.name;
    
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function(req,res){
	//articleName==article-one
	//article(articleName={} content object for article-one
	var articleName=req.params.articleName;
	res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});*/