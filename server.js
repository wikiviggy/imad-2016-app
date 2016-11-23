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
        </p>
         <div id="HCB_comment_box">
     <a href="http://www.htmlcommentbox.com">HTML Comment Box</a> is loading comments...</div>
      <link rel="stylesheet" type="text/css" href="http://www.htmlcommentbox.com/static/skins/default/skin.css" />
      <script type="text/javascript" language="javascript" id="hcb"> /*<!--*/ if(!window.hcb_user){
      hcb_user={ 
      };
      } (function(){s=document.createElement("script");s.setAttribute("type","text/javascript");s.setAttribute("src", "http://www.htmlcommentbox.com/jread?page="+escape((window.hcb_user && hcb_user.PAGE)||(""+window.location)).replace("+","%2B")+"&opts=470&num=10");if (typeof s!="undefined") document.getElementsByTagName("head")[0].appendChild(s);})(); /*-->*/
      </script> `      
        
}
};
function createTemplate (data) {
    
var title=data.title;
var date=data.date;
var heading=data.heading;
var content=data.content;

var htmlTemplate=`<html>
   <head>
       <style>
       body
       {
           background-image:url("http://kingofwallpapers.com/background-images-for-websites/background-images-for-websites-016.jpg");
       }
       </style>
       <title>
           ${title}
       </title>
   <meta name="viewport" content="width-device-width,initial-scale-1" \>
   <link href="/ui/style.css" rel="stylesheet" />
   </head>
    <body>
        <h3>          
        <marquee>
           Welcome to this article ! This is a resource of this app ! 
           </marquee>
        </h3>   
        <div class="koodigrah"> 
        <div >
        <a class="wiki"href="/">Home</a>
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
function login () {

var page=`<html>
<head>
<style>
       body
              {
                         background-image:url("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR2ChMQxpzikur_oqrbesow3tgAmWDD4f5Iq80ru3Idxz4Z_DgK");
                                }
                                       </style>

<title>
Login page
</title>
<meta name="viewport" content="width-device-width,initial-scale-1" \>
</head>
<body>
<a class="evil"href="/">Home</a>
<h1 style="font-family:Comic Sans Ms;text-align="center";font-size:20pt;
color:#00FF00;>
Simple Login Page to access and comment upon my third article 
</h1>
<form name="login">
Username<input type="text" name="userid"/>
Password<input type="password" name="pswrd"/>
<input type="button" onclick="check(this.form)" value="Login"/>
<input type="reset" value="Cancel"/>
</form>
<script language="javascript">
function check(form)/*function to check userid & password*/
{
 /*the following code checkes whether the entered userid and password are matching*/
  if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd")
    {
        window.open('article-three')/*opens the target page while Id & password matches*/
          }
           else
            {
               alert("Error Password or Username")/*displays error message*/
                 }
                 }
                 </script>
                 </body>
                 </html> `
                 ;
                 return page;
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
function place()
{
    var location=`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15543.436330762042!2d80.2042434!3d13.108112300000002!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1479885075683" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>`
    ;
    return location;
}
app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname,'ui','index.html'));
});
var counter=0;
app.get('/counter',function (req,res){
 counter=counter+1;
 res.send(counter.toString());
});
app.get('/mymap', function  (req,res) {
    res.send(place());
});
app.get('/my-login',function (req,res){
  res.send(login());
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
