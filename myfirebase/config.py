import pyrebase


config = {
  "apiKey": "AIzaSyC3juQWlZkickBDwDtFnuyOTWCIt6U4fzs",
  "authDomain": "code-ing.firebaseapp.com",
  "databaseURL": "https://code-ing.firebaseio.com/",
  "storageBucket": "code-ing.appspot.com"
}


firebase = pyrebase.initialize_app(config)