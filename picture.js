// config contains the logins you need to use the Firebase API
var config = {
	apiKey: "AIzaSyDEsWRHBFCz0dhVRg5cekLTHKI5ertDSAE",
	authDomain: "gwc-project-7d5ab.firebaseapp.com",
	databaseURL: "https://gwc-project-7d5ab.firebaseio.com",
	projectId: "gwc-project-7d5ab",
	storageBucket: "gwc-project-7d5ab.appspot.com",
	messagingSenderId: "250632410891"
};
const storage = firebase.storage()
let locationRef = storage.ref('profile_picture')
locationRef.put = ([profile_picture])
const storage = firebase.storage()
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('change', (e)=>{
  let file = e.target.files[0];
  let locationRef = storage.ref('profile_picture/' + file.name)
  locationRef.put(file)
})
submitButton.addEventListener('change', (e)=>{
  let file = e.target.files[0];
  let locationRef = storage.ref('profile_picture/' + file.name)
  let task = locationRef.put(file)
  task.on('state_changed',
      function progress(snapshot){
        // whilst uploading
      },
      function error(error){
        //error handling
      },
      function complete(){
        // on completion
      }
  )
})
  task.on('state_changed',
    function progress (snapshot){ //progress
      let per = (snapshot.bytestTransferred / snapshot.totalBytes) *100;
      uploader.value = per;
    },
    function error (error){ },
    function comlete(){
      console.log('Done')
    }
  )
  let uploader = document.getElementById('progressBar')
	let storageRef = storage.ref('profile_picture')
	let image = storageRef.child('profile_picture');
	let storageRef = storage.ref('profile_picture/Profile.png');
	image.getMetadata().then(function(metadata) {
		document.getElementryByID('img').src = metadata.downloadURLS[0]
	}).catch(function(error) { /*error handling*/});
	let storageRef = storage.ref('profile_picture/profile_picture.png');
	storageRef.delete().then(function() {
		// removed
	}).catch(function(error) {
		// not removed :(
	});
	submitButton.addEventListener('change', (e)=>{
		let file = e.target.file[0];
		let locationRef = torage.ref('profile_picture'/ + file.name)
		let task = locationRef.put(file)
		task.on('state_changed'
			...
			function complete(){
				// on completion
			}

		)
	})
	const database = firebase.database()
	const ref = database.ref('profile_picture');
	submitButton.addEventListener('change', (e)=>{
		...
		task.on('state_changed',
			...
			function complete(){
				storageRef.getMetadata().them(metadata=>{
					ref.push({
						url: metadata.downloadURLS[0]
					})
					})
				}
		)
	})

		
