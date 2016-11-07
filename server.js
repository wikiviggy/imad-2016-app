var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var app = express();
var config= {
    user:'wikiviggy',
    database:'wikiviggy',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
app.use(morgan('combined'));
var articles= {
'article-one':{
    title:'article-1|wikiviggy',
    heading:'article-one',
    date:'septembre 22,2016',
    content:`<p>
            this is content of my first article. bonjour ! enchante . comment cava ?
        </p>
        <p>
            je mapelle vignesh prabhakar. j ai 18 ans. j habite a' chennai au india . 
        </p>
        <p>j etudie ingenerie d' informatique en SRM universite'. j aime chocolats . 
        </p>
        <p>a bientot . the nightmares are REAL !!! BALOR CLUB WORRLDWIDE !
        </p>`
},
'article-two':{
    title:'article-2|wikiviggy',
    heading:'article-two',
    date:'septembre 23,2016',
    content:`<p>
            this is content of my second article. bonjour ! enchante . comment cava ?
        </p>
        <p>
            je mapelle vignesh prabhakar. j ai 18 ans. j habite a' chennai au india . 
        </p>
        <p>j etudie ingenerie d' informatique en SRM universite'. j aime chocolats .  
        </p>
        <p>a bientot . the nightmares are REAL !!! BALOR CLUB WORRLDWIDE !
        </p>`
},
'article-three':{
    title:'article-3|wikiviggy',
    heading:'article-three',
    date:'septembre 24,2016',
    content:`<p>
            this is content of my third article. bonjour ! enchante . comment cava ?
        </p>
        <p>
            je mapelle vignesh prabhakar. j ai 18 ans. j habite a' chennai au india . 
        </p>
        <p>j etudie ingenerie d' informatique en SRM universite'. j aime chocolats .  
        </p>
        <p>a bientot . the nightmares are REAL !!! BALOR CLUB WORRLDWIDE !
        </p>`
}
};
function createTemplate (data) {
    
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmlTemplate=`<html>
   <head>
       <title>
           ${title}
       </title>
   <meta name="viewport" content="width-device-width,initial-scale-1" \>
   <link href="/ui/style.css" rel="stylesheet" />
   </head>
    <body>
        <div class="koodigrah"> 
        <div >
        <a href="/">Home</a>
    </div>
    <hr/>
    <h3>${heading}</h3>
     <h3>correct the spelling errors</h3>    
    <div>
        ${date}
    </div>
    <div>
      ${content}
    </div>
    </div>
</body>
</html>`
;
return htmlTemplate;
}
var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM article', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
        
    });
});
app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname,'ui','index.html'));
});
var counter=0;
app.get('/counter',function (req,res){
 counter=counter+1;
 res.send(counter.toString());
});
app.get('/:articleName',function (req, res) {
   var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (re,res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function( req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
