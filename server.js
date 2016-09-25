var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleone={
    title:'article-1|wikiviggy',
    heading:'article-one',
    date:'septembre 22,2016',
    content:`<p>
            this is content of my first article. bonjour ! enchante . comment cava ?
        </p>
        <p>
            je mapelle vignesh prabhakar. j ai 18 ans. j habite a' chennai au india . 
        </p>
        <p>j etudie ingenerie d' informatique en SRM universite'. j aime chocolats . j deteste' iitians. 
        </p>
        <p>a bientot . the nightmares are REAL !!! BALOR CLUB WORRLDWIDE !
        </p>`
};

function createtemplate(data){
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmltempate=`<html>
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
</html>`;
return htmltemplate;
}
app.get('/', function (req, res) {
  res.send(createtemplate(articleone));
});
app.get('/article-one',function (req, res){
    res.sendfile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two',function (req, res){
    res.sendfile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three',function (req, res){
    res.sendfile(path.join(__dirname, 'ui', 'article-three.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
