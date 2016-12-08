function init() {
    var config = {
        apiKey: "AIzaSyC3juQWlZkickBDwDtFnuyOTWCIt6U4fzs",
        authDomain: "code-ing.firebaseapp.com",
        databaseURL: "https://code-ing.firebaseio.com",
        storageBucket: "code-ing.appspot.com",
        messagingSenderId: "441078050477"
    };
    firebase.initializeApp(config);


    var firepadRef = getExampleRef();
    //// Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineNumbers: true,
        mode: {
            name:'python'
        }
      });

    // Helper to get hash from end of URL or generate a random one.
    function getExampleRef() {
        var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
            ref = ref.child(hash);
        } else {
            ref = ref.push(); // generate unique location.
            window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }
        return ref;
    }
}

window.onload=function() {
    init();
}


