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
  var address = document.getElementById('address-box').value;
  var phoneNumber = document.getElementById('phoneNumber-box').value;
  var email = document.getElementById('email-box').value;
  var objective = document.getElementById('objective-box').value;
  var skills = document.getElementById('skills-box').value;
  var accomplishments = document.getElementById('accomplishments-box').value;
  var raceList = document.getElementsByClassName('race');
   // makes a list of all the elements with the class "race" (regarldess of if its checked)
  var count = 0;
  var checkedRaces = [];
  while (count < raceList.length) {
    if (raceList[count].checked) { // if the checkbox was checked, add to checked list
      checkedRaces.push(raceList[count]);
    }
    count++;
  }
  var i;
  for (i = 0; i < raceList.length; i++) {
    alert("all the races: " + raceList[i].id);
  }
  var racesText = "";
  var q;
  for (q = 0; q < checkedRaces.length; q++) {
    alert("checked races: " + checkedRaces[q].id);
    racesText = racesText + str(checkedRaces[q]) + "/";
    alert(racesText);
  }



	if (user) {
		var uid = user.uid;


    ///////////////// RETREIVING THE DATA //////////////////////
    // gives the user the ability to change one section rathe than
    // having to reinput all the values in

    // builds the location of the data
    var ref = database.ref('/user_prefs/' + uid);

    // gets the data
    return ref.once('value').then(function(snapshot){
    	// when it's successful, get the value JSON
    	var my_pref = snapshot.val();

      // if user does not put in new input, get the previous values in the JSON
      if (!firstName) {
        firstName = my_pref.firstName;
      }
      if (!lastName) {
        lastName = my_pref.lastName;
      }
      if (!age) {
        age = my_pref.age;
      }
      if (!gender) {
        gender = my_pref.gender;
      }
      if (!address) {
        address = my_pref.address;
      }
      if (!phoneNumber) {
        phoneNumber = my_pref.phoneNumber;
      }
      if (!email) {
        email = my_pref.email;
      }
      if (!objective) {
        objective = my_pref.objective;
      }
      if (!skills) {
         skills = my_pref.skills;
      }
      if (!accomplishments) {
        accomplishments = my_pref.accomplishments;
      }
      alert(firstName);
      alert(lastName);
      alert(age);
      alert(gender);
      alert(address);
      alert(phoneNumber);
      alert(email);
      alert(objective);
      alert(skills);
      alert(accomplishments);

      setPref(uid, firstName, lastName, age, gender, address, phoneNumber, email, objective, skills, accomplishments);
	  });

  }
}

function setPref(uid, firstName, lastName, age, gender, address, phoneNumber, email, objective, skills, accomplishments){
	var prefs = {
		firstName: firstName,
		lastName: lastName,
    age: age,
    gender: gender,
    address: address,
    phoneNumber: phoneNumber,
    email: email,
    objective: objective,
    skills: skills,
    accomplishments: accomplishments,
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
    var address = my_pref.address;
    var phoneNumber = my_pref.phoneNumber;
    var email = my_pref.email;
    var objective = my_pref.objective;
    var skills = my_pref.skills;
    var accomplishments = my_pref.accomplishments;

		// change the display
		document.getElementById('firstName').innerHTML = my_pref.firstName;
		document.getElementById('lastName').innerHTML = my_pref.lastName;
    document.getElementById('age').innerHTML = my_pref.age;
    document.getElementById('gender').innerHTML = my_pref.gender;
    document.getElementById('address').innerHTML = my_pref.address;
    document.getElementById('phoneNumber').innerHTML = my_pref.phoneNumber;
    document.getElementById('email').innerHTML = my_pref.email;
    document.getElementById('objective').innerHTML = my_pref.objective;
    document.getElementById('skills').innerHTML = my_pref.skills;
    document.getElementById('accomplishments').innerHTML = my_pref.accomplishments;
    // change the placeholder
    document.getElementById('firstName-box').placeholder = firstName;
    document.getElementById('lastName-box').placeholder = lastName;
    document.getElementById('age-box').placeholder = age;
    document.getElementById('gender-box').placeholder = gender;
    document.getElementById('address-box').placeholder = address;
    document.getElementById('phoneNumber-box').placeholder = phoneNumber;
    document.getElementById('email-box').placeholder = email;
    document.getElementById('objective-box').placeholder = objective;
    document.getElementById('skills-box').placeholder = skills;
    document.getElementById('accomplishments-box').placeholder = accomplishments;
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

window.onload = function(){authStatusListener();};
