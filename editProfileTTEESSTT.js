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
	var firstName = document.getElementById('firstName-box').value;
	var lastName = document.getElementById('lastName-box').value;
	var age = document.getElementById('age-box').value;
  var gender = document.getElementById('gender-box').value;
	if (user) {
		var uid = user.uid;
		setPref(uid, firstName, lastName, age, gender);
	}
}


function setPref(uid, firstName, lastName, age, gender){
	var prefs = {
		firstName: firstName,
		lastName: lastName,
    age: age,
    gender: gender,
	};

	var ref = database.ref('/user_prefs/' + uid);

	ref.set(prefs);
}

// Gets favourite colour and movie based on user id (uid) (RETRIEVING DATA)
function getPref(uid){
	// builds the location of the data
	var ref = database.ref('/user_prefs/' + uid);

	// gets the data
	return ref.once('value').then(function(snapshot){
		// when it's successful, get the value JSON
		var my_pref = snapshot.val();

		// get the values in the JSON
		var firstName = my_pref.firstName;
		var lastName = my_pref.lastName;
    var age = my_pref.age;
    var gender = my_pref.gender;

		// change the display
		document.getElementById('firstName').innerHTML = my_pref.firstName;
		document.getElementById('lastName').innerHTML = my_pref.lastName;
    document.getElementById('age').innerHTML = my_pref.age;
    document.getElementById('gender').innerHTML = my_pref.gender;
    // change the placeholder
    document.getElementById('firstName-box').placeholder = firstName;
    document.getElementById('lastName-box').placeholder = lastName;
    document.getElementById('age-box').placeholder = age;
    document.getElementById('gender-box').placeholder = gender;
	});
}

function authStatusListener() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			getPref(user.uid);

		} else {
			// User not signed in, get rid of the form and display a message
			document.getElementById('pref-form').innerHTML = '';
			document.getElementById('message-box').innerHTML = 'You are not logged in!';
		}
	});
}

window.onload = function() { authStatusListener();};
