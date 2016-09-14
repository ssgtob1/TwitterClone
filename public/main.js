
var userid = document.getElementById('userid');
var password = document.getElementById('password');
var userIdLoggedIn;


function login() {
    var params = JSON.stringify({ userid: userid.value, password: password.value });
    userIdLoggedIn = userid.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
           var myArr = JSON.parse(this.responseText);
           writeUserFeed(myArr);
        }
    };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhttp.send(params);    

}

function writeUserFeed (feedArr){
    var out="";
out += "<img src=\"/twitterZ-icon.png\" width=\"50\">"
out += "<div class=\"container\">";
out += "<!-- Trigger the modal with a button -->";
out += "<button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Add Tweet<\/button>";
out += "";
out += "<!-- Modal -->";
out += "<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">";
out += "  <div class=\"modal-dialog\">";
out += "";
out += "    <!-- Modal content-->";
out += "    <div class=\"modal-content\">";
out += "      <div class=\"modal-header\">";
out += "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;<\/button>";
out += "        <h4 class=\"modal-title\">New Tweet<\/h4>";
out += "      <\/div>";
out += "      <div class=\"modal-body\">";
out += "       <textarea rows=\"3\" id=\"tweetContent\"></textarea>";
out += "      <\/div>";
out += "      <div class=\"modal-footer\">";
out += "        <button type=\"button\" onclick=\"addTweet()\" class=\"btn btn-default\" data-dismiss=\"modal\">Add<\/button>";
out += "      <\/div>";
out += "    <\/div>";
out += "";
out += "  <\/div>";
out += "<\/div>";
out += "<\/div>";

    var i;
    
    for(i = 0; i < feedArr.length; i++){
        var strVar="";
        
        strVar += "<div class=\"row-fluid\">";
        strVar += "<div class=\"span4 offset4\" id=\"userFeed\">";
        strVar += "<h1>";
        strVar += feedArr[i].Author;
        strVar += "</h1><br>";
        strVar +=  feedArr[i].Content;
        strVar += "<br>";
        strVar += "<a href=\"#\" onclick=\"likeTweet("
        strVar +=  feedArr[i].Id 
        strVar += ")\"class=\"btn btn-xs btn-info pull-right\"><span class=\"glyphicon glyphicon-thumbs-up\"><\/span> <\/a>";
        strVar += "<\/div>";
        strVar += "<\/div>";
        strVar += "<br>";
        out += strVar;

    }

    document.body.innerHTML = '';
    document.body.innerHTML = out;
    // document.getElementById("userFeed").innerHTML = out;


}

function addTweet(){

    var tweetContent = document.getElementById('tweetContent');
    var params = JSON.stringify({ userid: userIdLoggedIn, tweetContent: tweetContent.value });
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
               // var data = JSON.parse(this.responseText);
                alert(this.responseText);
            }
        };
        xhttp.open("POST", "/addTweet", true);
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhttp.send(params);    

}

function likeTweet(tweetid){
    alert("In likeTweet " + tweetid);
    var params = JSON.stringify({ userid: userIdLoggedIn, tweetid: tweetid });
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
               // var data = JSON.parse(this.responseText);
                alert(this.responseText);
            }
        };
        xhttp.open("POST", "/likeTweet", true);
        xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhttp.send(params);    

}





