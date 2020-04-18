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
  document.querySelector('#signin').addEventListener('click' , function(){
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    if(email != "" && password !="") {
      var result = firebase.auth().signInWithEmailAndPassword(email, password);
      var auth = firebase.auth();
      var currentUser = auth.currentUser;
      var uid = currentUser.uid;
      var user = firebase.auth().currentUser;
      var credential;
      
      // Prompt the user to re-provide their sign-in credentials
      
      user.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
      }).catch(function(error) {
        // An error happened.
      });
      console.log(uid);
      window.location.href= "/index.html";
      result.catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        alert("Message : "+ errorMessage);
      })
    }
    else {
      window.alert("Incomplete");
    }
  });
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      var auth = firebase.auth();
      var currentUser = auth.currentUser;
      var uid = currentUser.uid;
      writeUserData(uid,email);
    }
  });
function writeUserData( uid ,email ) {
    database.ref('users/' + uid).set({
    username: uid,
    email: email,
  }) ; };

  $("ul").on("click", "li", function () {
	// body...
     $(this).toggleClass("completed");
 });

//delete button

$("input[type = 'text']").keypress(function(k){
	if(k.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + todoText + "</li>");
	}

});

$(".fa-pencil-alt").click(function(){
 $("input[type='text']").fadeToggle()
});
var fb_db = firebase.database().ref();
  function updateData(){ 
    console.log("called");
  data = document.getElementById('chep').value;
	fb_db.child("users/" + uid + "/todo/" ).push({
		user_name : data }); 
   document.location.reload();
}
var i = 0;
var add ={};
fb_db.child("users/" + uid + "/todo/" ).once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childData.user_name);
    $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + childData.user_name + "</li>");
  }); 
  $("ul").on("click","span",function(){
    $(this).parent().fadeOut(500,function(){
      var keyy = $(this).text();
      fb_db.child("users/" + uid + "/todo/" ).once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey1 = childSnapshot.key;
        var childData1 = childSnapshot.val();
        if(childData1.user_name === keyy) {
          fb_db.child("users/" + uid + "/todo/" + childKey1 + "/").remove(); 
        }
    });
  $(this).remove();
});
   
});
});
});