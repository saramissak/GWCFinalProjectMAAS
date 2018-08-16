// config contains the logins you need to use the Firebase API
var config = {
	apiKey: "AIzaSyDEsWRHBFCz0dhVRg5cekLTHKI5ertDSAE",
	authDomain: "gwc-project-7d5ab.firebaseapp.com",
	databaseURL: "https://gwc-project-7d5ab.firebaseio.com",
	projectId: "gwc-project-7d5ab",
	storageBucket: "gwc-project-7d5ab.appspot.com",
	messagingSenderId: "250632410891"
};


// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();



// Handles the submit button being clicked based on user id
function changePrefs(){
var user = firebase.auth().currentUser;
var colour = document.getElementById('colour-box').value;
var movie = document.getElementById('movie-box').value;

if (user) {
  var uid = user.uid;
  setPref(uid, colour, movie);
}
}


function setPref(uid, colour, movie){
var prefs = {
  colour: colour,
  movie: movie,
};

var ref = database.ref('/user_prefs/' + uid);

ref.set(prefs);
}

// Gets favourite colour and movie based on user id (uid)
function getPref(uid){
// builds the location of the data
var ref = database.ref('/user_prefs/' + uid);

// gets the data
return ref.once('value').then(function(snapshot){
  // when it's successful, get the value JSON
  var my_pref = snapshot.val();

  // get the values in the JSON
  var colour = my_pref.colour;
  var movie = my_pref.movie;

  // if there are no values for this entry in the database, change the variables
  if(!colour) {
    colour = 'Nothing in database!';
  }
  if(!movie) {
    movie = 'Nothing to database!';
  }

  // change the display
  document.getElementById('colour').innerHTML = my_pref.colour;
  document.getElementById('movie').innerHTML = my_pref.movie;
});
}

function authStatusListener() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('nav-bar').innerHTML = '<ul><li><a href="#search">Search</a></li><li><a href="feed.html">Feed</a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="profile.html">Profile</a></li><li><a href="logout.html">Log Out</a></li></ul>';
    getPref(user.uid);

  } else {
    // User not signed in, get rid of the form and display a message
    document.getElementById('nav-bar').innerHTML = '<ul><li><a href="#search">Search</a></li><li><a href="index.html">Home </a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="login.html">Log In </a></li><li><a href="signup3.html">Sign Up </a></li></ul>';
    document.getElementById('pref-form').innerHTML = '';
    document.getElementById('message-box').innerHTML = 'You are not logged in!';
  }
});
}

window.onload = function() { authStatusListener(); };
// Sets Preferences


//function new_post(){
  //var post = prompt("");
//}

//function writeUserData(userId, name, email, imageUrl) {
  //firebase.database().ref('users/' + userId).set({
    //username: name,
    //email: email,
    //profile_picture : imageUrl
  //});
//}
