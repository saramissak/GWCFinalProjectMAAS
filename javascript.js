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


// waits for authentication status changes
function authStatusListener() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
      document.getElementById('nav-bar').innerHTML = '<ul> <li><a href="#search">Search</a></li><li><a href="feed.html">Feed</a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="profile.html">Profile</a></li><li><a href="logout.html">Log Out</a></li></ul>';
		} else {
			document.getElementById('nav-bar').innerHTML = '<ul><li><a href="#search">Search</a></li><li><a href="index.html">Home </a></li><li><h3><a href="index.html">Company Name</a></h3></li><li><a href="login.html">Log In </a></li><li><a href="signup3.html">Sign Up </a></li></ul>';
		}
	});
}

// the function that gets called when the page first loads
function init() {
	authStatusListener();
}

// tells the browser to call init when the page first loads
window.onload = init();
