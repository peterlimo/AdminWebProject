
var firebaseConfig = {
                    apiKey: "AIzaSyC_bDcApnMMPEM6TipTwsk6VJvXuByo9XQ",
                    authDomain: "musical-6eed8.firebaseapp.com",
                    projectId: "musical-6eed8",
                    storageBucket: "musical-6eed8.appspot.com",
                    messagingSenderId: "1049535355773",
                    appId: "1:1049535355773:web:69bfe9e3c8b1a54fe84a14",
                    measurementId: "G-CTSBL03JYT"
                  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  var storage = firebase.storage;
  var dataset=new Array();

 function addDocument()
 {
  var uploader = document.getElementById('uploader');
  var fileButton =         document.getElementById('fileButton');
  fileButton.addEventListener('change', function(e){
  var file = e.target.files[0];
  var storageRef = firebase.storage().ref('img/'+file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    uploader.value = percentage;

  }, function error(err) {


  },function complete() {

  });
});  
  
}


function displayUser(email,name,number,diocese,status)
{
   return "<tr>"+
     "<td>"+email+"</td>"+
     "<td>"+name+"</td>"+
     "<td>"+number+"</td>"+
     "<td>"+diocese+"</td>"+
     "<td>"+status+"</td>"+
   "</tr>"
}
function showUsers()
{
    var usersReference = db.collection("users");
  
   x=1;
var imageIcon;
var church;           
    //Get them
    usersReference.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

    var user=displayUser(doc.data().email,doc.data().name,doc.data().number,doc.data().diocease,doc.data().status);
   
  var deletehtml=`<div style='text-align:center;'><div style='background-color: rgb(255, 0, 106);color:#ffffff;width:70px;cursor:pointer;padding:30dp;border-radius:20px;' onclick='deleteUser("${doc.data().email}")'>disable</div></div>`
   if(doc.data().profile!=null)
   { 
    imageIcon=`<img src="${doc.data().profile}" width='80' height='80' style='border-radius:100px'></img>`
   }
   else
   { 
    imageIcon="<img src='img/default_icon.jpg' width='80' height='80' style='border-radius:100px'></img>"
   }
   if(doc.data().church!=null)
   { 
  church=doc.data().church;
   }
   else{
     church="n/a"
   }
  dataset.push([
      imageIcon,
    
      doc.data().email,
      doc.data().name,
      doc.data().number,
      doc.data().diocease,
      church,
      deletehtml]
    )

        });

      $(document).ready(function() {
          $('#example').DataTable( {
            stateSave: true,
    
            "scrollX": true,
              data: dataset,
              columns: [
                { title: "profile image" },
                  { title: "email" },
                  { title: "name" },
                  { title: "number" },
                  { title: "diocease" },
                  { title: "church" },
                  { title: "disable user"}
          ]
          });
      });
   });
}
function getStatistics(){
  db.collection('users').get().then(snap => {
    var size = snap.size // will return the collection size
    var dis= "<p style='text-align:center;color: #52fc03; font-style:bold;'>USERS</p>"+
  
    "<p style='text-align:center;color: #0313fc;margin-top:20px;font-size:35px'>"+size+"</p>";
    document.getElementById("no_of_users").innerHTML=document.getElementById("no_of_users").innerHTML+dis;
  });
  db.collection('learn').doc("students").collection("student").get().then(snap => {
    var size = snap.size // will return the collection size
    var dis= "<p style='text-align:center;color: #52fc03; font-style:bold;'>LEARNERS</p>"+
  
    "<p style='text-align:center;color: #0313fc;margin-top:20px;font-size:35px'>"+size+"</p>";
    document.getElementById("no_of_learners").innerHTML=document.getElementById("no_of_learners").innerHTML+dis;
  });
  db.collectionGroup('songs').get().then(snap => 
  
  {
    var size = snap.size // will return the collection size
    var dis= "<p style='text-align:center;color: #52fc03; font-style:bold;'>SONGS</p>"+
  
    "<p style='text-align:center;color: #0313fc;margin-top:20px;font-size:35px'>"+size+"</p>";
    document.getElementById("no_of_songs").innerHTML=document.getElementById("no_of_songs").innerHTML+dis;
  });
}

function deleteUser(email)
{
  alert(email);
}


function getSongs()
{
  // db.collectionGroup('songs').get().then(snap => 
  
  //   {
  //     var size = snap.size // will return the collection size
  //     var dis= "<p style='text-align:center;color: #52fc03; font-style:bold;'>SONGS</p>"+
    
  //     "<p style='text-align:center;color: #0313fc;margin-top:20px;font-size:35px'>"+size+"</p>";
  //     document.getElementById("no_of_songs").innerHTML=document.getElementById("no_of_songs").innerHTML+dis;
  //   });
var songReference=db.collectionGroup('songs');
songReference.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
  // var user=displayUser(doc.data().email,doc.data().name,doc.data().number,doc.data().diocease,doc.data().status);

  var deletehtml=`<div style='text-align:center;'><div style='background-color: rgb(255, 0, 106);color:#ffffff;width:70px;cursor:pointer;padding:30dp;border-radius:20px;' onclick='deleteItem("${doc.id}")'><p style='margin:10px';">disable</p></div>`
  dataset.push([
    doc.id,
    doc.data().title,
    doc.data().type,
    doc.data().uploader,
    doc.data().composer,
    doc.data().downloads,
    doc.data().views,
    doc.data().approved,
    deletehtml]
  )

      });

    $(document).ready(function() {
        $('#songtable').DataTable( {
          stateSave: true,
  
          "scrollX": true,
            data: dataset,
            columns: [
              { title: "song id" },
                { title: "title" },
                { title: "type" },
                { title: "uploader" },
                { title: "composer" },
                { title: "downloads"},
                { title: "views"},
                { title: "approved"},
                { title: "approve/decline" }
        ]
        } );
    } );
 });
}


function getForums()
{
  // db.collectionGroup('songs').get().then(snap => 
  
  //   {
  //     var size = snap.size // will return the collection size
  //     var dis= "<p style='text-align:center;color: #52fc03; font-style:bold;'>SONGS</p>"+
    
  //     "<p style='text-align:center;color: #0313fc;margin-top:20px;font-size:35px'>"+size+"</p>";
  //     document.getElementById("no_of_songs").innerHTML=document.getElementById("no_of_songs").innerHTML+dis;
  //   });
var songReference=db.collection('rooms');
songReference.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
  // var user=displayUser(doc.data().email,doc.data().name,doc.data().number,doc.data().diocease,doc.data().status);

  var notihtml=`<div style='text-align:center;'><div style='background-color: rgb(255, 0, 106);color:#ffffff;width:70px;cursor:pointer;padding:30dp;border-radius:20px;' onclick='notifyForum("${doc.id}")'>notify</div>`
 
  dataset.push([
    doc.id,
    doc.data().users,
    doc.data().mess,
    notihtml]
  )

      });

    $(document).ready(function() {
        $('#forumtable').DataTable( {
          stateSave: true,

          "scrollX": true,
            data: dataset,
            columns: [
                { title: "title" },
                { title: "no of users" },
                { title: "no of posts" },
                { title: "notify" }
        ]
        } );
    } );
 });
}

function notifyForum(id)
{
var html=`<h3 id="tt">${id}</h3>`
var modol=document.getElementById('add-category');
document.getElementById("title").innerHTML=html;
modol.style.display="block";

}