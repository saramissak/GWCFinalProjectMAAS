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
	var post = document.getElementById('post-box').value;
	var link = document.getElementById('link-box').value;

	if (user) {
		var posts = user.uid;
		setPref(posts, post, link);
	}
}


function setPref(posts, post, link){
	var prefs = {
		post: post,
		link: link,
	};

	var ref = database.ref('/posts/');
	// ref.set(prefs);

  // Get a key for a new Post.
   var newPostKey = ref.push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
   var updates = {};
   updates['/' + newPostKey]  = prefs;

 	ref.update(updates);
}

// Gets favourite colour and movie based on user id (uid)
function getPref(posts){
	// builds the location of the data
	var ref = database.ref('/posts/');

	// gets the data
	return ref.once('value').then(function(snapshot){
		// when it's successful, get the value JSON
		var my_pref = snapshot.val();

    for(var key in my_pref){
      document.getElementById("feed").innerHTML += "<br>" + my_pref[key]['post'] + "<br>";
			document.getElementById("feed").innerHTML += "<a href='" + my_pref[key]['link'] + "'> CLICK ME </a><hr>" ;
    }

		// get the values in the JSON
		var post = my_pref.post;
		var link = my_pref.link;

		// if there are no values for this entry in the database, change the variables
		if(!post) {
			post = 'Nothing in database!';
		}
		if(!link) {
			link = 'Nothing in database!';
		}


		// change the display
  // document.getElementById("feed").innerHTML = my_pref.post;
	});
}



function authStatusListener() {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('nav-bar').innerHTML = '<ul><li><a href="search.html">Search</a></li><li><a href="feed.html">Feed</a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="profile.html">Profile</a></li><li><a href="logout.html">Log Out</a></li></ul>';
    getPref(user.uid);

  } else {
    // User not signed in, get rid of the form and display a message
    document.getElementById('nav-bar').innerHTML = '<ul><li><a href="search.html">Search</a></li><li><a href="index.html">Home </a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="login.html">Log In </a></li><li><a href="signup3.html">Sign Up </a></li></ul>';
    document.getElementById('pref-form').innerHTML = '';
    document.getElementById('message-box').innerHTML = 'You are not logged in!';
  }
});
}



window.onload = function() {
  authStatusListener();
  var btn = document.getElementById("myBtn");
  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  var dict = []
  // When the user clicks the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
  submit.onclick = function() {
    changePrefs();

    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

};
// Sets Preferences "<div background-color='white'; text-align='center'></div>"
