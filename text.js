var config = {
    apiKey: "AIzaSyCvpYQu44zmRXA0XQkcxEuakyytRsnWXSc",
    authDomain: "stackoverflow.firebaseapp.com",
    databaseURL: "https://stackoverflow.firebaseio.com",
    projectId: "project-8080059325282098184",
    storageBucket: "project-8080059325282098184.appspot.com",
    messagingSenderId: "82293832823"
  };
  firebase.initializeApp(config);
  //firebase.firestore.setLogLevel('debug');
  
  var db = firebase.firestore();
  console.log(new firebase.firestore.Timestamp(1577336400,0).toDate().toString());
  var ref = db.doc("/github/README/firebase-js-sdk-issues-2366/test");
  ref.get().then(function(doc) {
    console.log(doc.id, '=>', doc.data());
  }).catch(function(err) {
    console.error(err);
  });
  
  ref.set({ text: "This is text that includes newlines.\nSee, this is on a new line.\nAnd this again..." })