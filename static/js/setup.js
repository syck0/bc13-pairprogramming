function updateData(doc , line, text){
    doc.replaceRange(text , line);
}
function init() {

    var editor = CodeMirror(document.getElementById("code"), {
                      lineNumbers: true,
                      extraKeys: {"Ctrl-Space": "autocomplete"},
                      readonly:true,
                      mode: {
                          name: "python",

                      }
                    });

    var config = {
        apiKey: "AIzaSyC3juQWlZkickBDwDtFnuyOTWCIt6U4fzs",
        authDomain: "code-ing.firebaseapp.com",
        databaseURL: "https://code-ing.firebaseio.com",
        storageBucket: "code-ing.appspot.com",
        messagingSenderId: "441078050477"
    };
    firebase.initializeApp(config);

    doc=document.getElementById('#code'):


    var codeRef = firebase.database().ref('users/' + '-KYTEBU8G34kpBT0kP9j');
      codeRef.on('child_added', function(data) {
          line=data['key'];
          text=data.val()['text'];
        console.log(line, text);
        updateData(doc,data['key'],data.val()['text']);
      });

      codeRef.on('child_changed', function(data) {
          console.log(data['key']+":"+data.val()['text']);
          updateData(doc,data['key'],data.val()['text']);

      });

      codeRef.on('child_removed', function(data) {
        console.log(data['key'] + ":" + data.val());
      });



      // Keep track of all Firebase reference on which we are listening.
      listeningFirebaseRefs.push(codeRef);


}

window.onload = function(){
    init();
};

