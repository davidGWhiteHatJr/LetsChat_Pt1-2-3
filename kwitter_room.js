const firebaseConfig = {
  apiKey: "AIzaSyD8YhtaQYPvlA-4jUXScrQwDmjxT5XQ1Go",
  authDomain: "kwitter-dcf30.firebaseapp.com",
  databaseURL: "https://kwitter-dcf30-default-rtdb.firebaseio.com",
  projectId: "kwitter-dcf30",
  storageBucket: "kwitter-dcf30.appspot.com",
  messagingSenderId: "129695258070",
  appId: "1:129695258070:web:de68241aa714e36629c077",
  measurementId: "G-FMW26LLG1H"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
}

function getData() 
{
  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       
      
      room_name = childKey;
      console.log("Room Name - " + room_name);
      row = "<div class='room_name' id="+room_name+" onclick='redirectToRoomName(this.id)' > #"+ room_name +"</div> <hr>";
      document.getElementById("output").innerHTML += row
      
    });
  });

}
getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
