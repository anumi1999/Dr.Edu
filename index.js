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
  var helo;
  document.querySelector('#signin').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    var auth = firebase.auth();
    var currentUser = auth.currentUser;
    var uid = currentUser.uid;
    sessionStorage.setItem("uid",uid);
    writeUserData(uid,email);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
      });
     
        function writeUserData( uid ,email ) {
            database.ref('users/' + uid).set({
            username: uid,
            email: email,
          }) ; 
        };
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                
                window.location.href="/index.html";
              } else {
                // No user is signed in.
              }

            // Step 1:
            //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
            //  If there is a user, log out out user details for debugging purposes.
          });
  });



