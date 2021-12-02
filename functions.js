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
    var dataset=new Array();
   x=1;

    //Get them
    usersReference.get().then((querySnapshot) => {
    
        //querySnapshot is "iteratable" itself
        querySnapshot.forEach((doc) => {
            //doc contains all metadata of Firestore object, such as reference and id
            // console.log(userDoc.id)
    var user=displayUser(doc.data().email,doc.data().name,doc.data().number,doc.data().diocease,doc.data().status);
    dataset.push([
      doc.data().email,
      doc.data().name,
      doc.data().number,
      doc.data().diocease,
      doc.data().status])
    x++;
            //If you want to get doc data
       
        //         document.getElementById("usertable").innerHTML= document.getElementById("usertable").innerHTML+user;
        // //   var userDocData = userDoc.data().name;
         

        });
        // var html="<script type='text/javascript'>"+ 
      $(document).ready(function() {
          $('#example').DataTable( {
              data: dataset,
              columns: [
                  { title: "email" },
                  { title: "name" },
                  { title: "number" },
                  { title: "diocease" },
                  { title: "status" }
          
              ]
          } );
      } );
      // +
      // "</script>";
      // document.getElementById("tb").innerHTML= document.getElementById("tb").innerHTML+user;
    });
}


function getUsers(){

}

function countUsers(){

}
function getSongs(){

}
function countSongs(){
    db.collectionGroup("songs").get().then(function(querySnapshot) {      
        console.log(querySnapshot.size); 
    }); 
}