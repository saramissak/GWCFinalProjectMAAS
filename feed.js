function tweet(name){
  document.write(name);
}


function new_post(){
  alert(document.getElementById('post').innerHTML;);
}









function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
