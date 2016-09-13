
var userid = document.getElementById('userid');
var password = document.getElementById('password');
var params = "userid=" + userid.value + "&password="  + password.value;


function login() {
    alert(userid.value);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            alert(http.responseText);
        }
    };
    
    xhttp.open("POST", "/login ", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);    


}



