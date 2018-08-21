// config contains the logins you need to use the Firebase A
var config = {
	apiKey: "AIzaSyDEsWRHBFCz0dhVRg5cekLTHKI5ertDSAE",
	authDomain: "gwc-project-7d5ab.firebaseapp.com",
	databaseURL: "https://gwc-project-7d5ab.firebaseio.com",
	projectId: "gwc-project-7d5ab",
	storageBucket: "gwc-project-7d5ab.appspot.com",
	messagingSenderId: "250632410891"
};

firebase.initializeApp(config);

var storage = firebase.storage();

function init() {
	var submitButton = document.getElementById("submitButton");
	submitButton.addEventListener('change', (e)=>{
	  let file = e.target.files[0];
	  let locationRef = storage.ref('profile_picture/' /*+ user.uid + '/'*/ + file.name)
	  let task = locationRef.put(file)
		task.on('state_changed',
		  function progress(snapshot){ //progress
		    let per = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
				let uploader = document.getElementById('progressBar');

				uploader.value = per;
		  },
		  function error(error){ },
		  function complete(){
		    console.log('Done')
		  }
		)
	});
}

window.onload = init();
