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

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function profile_search(){
  var input = document.getElementById('search').value.toLowerCase();
  var profiles = database.profiles('/user_prefs/'+ uid);

  return profiles.once('value').then(function(snapshot){
    var my_prefs = snapshot.val();
    if(!my_prefs){
      return;
    }
  });
  for(var key in my_prefs){
    if(my_prefss[key]['/user_prefs/' + uid].toLowerCase().indexOf(input) >= 0){
      document.getElementById("posted").innerHTML += "<br>" + my_prefs[key]['/user_prefs/' + uid] + "<br>";
      }
}
function search(){
  document.getElementById('posted').innerHTML = '';
  profile_search()
  var input = document.getElementById('search').value.toLowerCase();
  var ref = database.ref('/posts/');

  // gets the data

  return ref.once('value').then(function(snapshot){
    // when it's successful, get the value JSON
    var all_posts = snapshot.val();
    // get the values in the JSON

    // if there are no values for this entry in the database, change the variables
    if(!all_posts) {
        return;
    }
    for(var key in all_posts){
      if(all_posts[key]['post'].toLowerCase().indexOf(input) >= 0){
        //alert(all_posts[key]['post'] )
        document.getElementById("posted").innerHTML += "<br>" + all_posts[key]['post'] + "<br>";
        document.getElementById("posted").innerHTML += "<a href='" + all_posts[key]['link'] + "'> CLICK ME </a><hr>" ;
        // display.
        // get link here.
      }
    }
  });
}
function authStatusListener() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('nav-bar').innerHTML = '<ul><li><a href="search.html">Search</a></li><li><a href="feed.html">Feed</a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="editProfileTTEESSTT.html">Profile</a></li><li><a href="logout.html">Log Out</a></li></ul>';
    getPref(user.uid);

  } else {
    // User not signed in, get rid of the form and display a message
    document.getElementById('nav-bar').innerHTML = '<ul><li><a href="search.html">Search</a></li><li><a href="index.html">Home </a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="login.html">Log In </a></li><li><a href="signup3.html">Sign Up </a></li></ul>';
    document.getElementById('pref-form').innerHTML = '';
    document.getElementById('message-box').innerHTML = 'You are not logged in!';
  }
});
}
window.onload = function() { authStatusListener(); };
