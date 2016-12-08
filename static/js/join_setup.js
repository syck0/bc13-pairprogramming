function updateData(doc , line, text){
    line = parseInt(line);
    if (text == undefined){
                text="";
            }
    if (doc.getLine(line+1)== undefined){
                text=text+"\n";
            }

          doc.setLine(parseInt(line),text);
}
function init() {

    var editor = CodeMirror(document.getElementById("code"), {
                      lineNumbers: true,
                      extraKeys: {"Ctrl-Space": "autocomplete"},
                      readOnly:true,
                      mode: {
                          name: "python"
                      }
                    });

    var config =
    {
        apiKey: "AIzaSyC3juQWlZkickBDwDtFnuyOTWCIt6U4fzs",
        authDomain: "code-ing.firebaseapp.com",
        databaseURL: "https://code-ing.firebaseio.com",
        storageBucket: "code-ing.appspot.com",
        messagingSenderId: "441078050477"
    };
    firebase.initializeApp(config);

        var doc=editor.getDoc();
    console.log('{{session_id}}');

        var codeRef = firebase.database().ref('users/' + '{{session_id}}');



        codeRef.on('child_added', function(data)
        {
            var line=data['key'];
            var text=data.val()['text'];
            updateData(doc,line,text);
      });

      codeRef.on('child_changed', function(data)
      {
        var line=data['key'];
        var text=data.val()['text'];
        updateData(doc,line,text);


      });

      codeRef.on('child_removed', function(data)
      {
        doc.removeLine(data['key']);
      });




      // Keep track of all Firebase references on which we are listening.

    }


window.onload = function(){
    init();
};

