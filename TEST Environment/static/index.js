function startTimer(duration, display) {
    var flag=0 ;
    var timer = duration, hours,minutes, seconds;
    var inter=setInterval(function () {
        hours = parseInt(timer /3600 , 10);
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours< 10 ? "0" + hours : hours;  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(minutes >= 60 && minutes<120){
            minutes=minutes-60;
        }

        if(minutes >= 120){
            minutes=minutes-120;
        }
        if(!document.hidden){
        display.textContent = hours + ":" + minutes + ":" + seconds;
    }
    else{
        flag=1 ;
        clearInterval(inter) ; 
    }
        if (--timer < 0) {
            timer = duration;
        }
          if(display.textContent=='00:00:00' ||  flag==1){
        document.getElementById("body").style.display = "none";
        if(flag == 1){
            alert("YOU TEST IS OVER!!") ;
        }
        else{
        alert("YOUR TIME IS UP!! :)")
        document.getElementById("completion-notice").style.display = "block";
    }
        clearInterval(inter) ;

    }
    }, 1000);
}

function go() {
    var fiveMinutes = 180*10,
        display = document.querySelector('#demo');
    startTimer(fiveMinutes, display);

};
var firebaseConfig = {
    apiKey: "AIzaSyB-W2AktdEtM7z_KHSWXXT_3PoBoWFdubM",
    authDomain: "dredu-71835.firebaseapp.com",
    databaseURL: "https://dredu-71835.firebaseio.com",
    projectId: "dredu-71835",
    storageBucket: "dredu-71835.appspot.com",
    messagingSenderId: "1010179971420",
    appId: "1:1010179971420:web:d2fc28ac5634b8ee8a0999",
    measurementId: "G-19Z5Q66FHX"
  };  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
    var database = firebase.database();
	var uid = sessionStorage.getItem("uid");
	var reff = database.ref('users/' + uid + "/question_paper/");
  					
					function xyz(){
						console.log(uid);
						reff.child('q/').once('value', function(snapshot) {
								console.log("called");
                              snapshot.forEach(function(childSnapshot) {
                                var childKey = childSnapshot.key;
                                var childData = childSnapshot.val();
                                console.log(childData.user_name);
                                var question = childData;
                                document.getElementById('question-text').innerText = childData.user_name;
                              }); 
					});
					}
	 						