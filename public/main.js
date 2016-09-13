
var userid = document.getElementById('userid');
var password = document.getElementById('password');



function login() {
    var params = JSON.stringify({ userid: userid.value, password: password.value });
    
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
    var out = "";
    var i;
    
    for(i = 0; i < feedArr.length; i++){
        var strVar="";
        
        strVar += "<div class=\"row-fluid\">";
        strVar += "<div class=\"span4 offset4\" id=\"userFeed\">";
        strVar += "<h1>";
        strVar += feedArr[i].Author;
        strVar += "</h1><br>";
        strVar +=  feedArr[i].Content;
        strVar += "<\/div>";
        strVar += "<\/div>";
        strVar += "<br>";
        out += strVar;

    }

    document.body.innerHTML = '';
    document.body.innerHTML = out;
    // document.getElementById("userFeed").innerHTML = out;


}






