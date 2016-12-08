from flask import Flask, render_template, request, session, redirect
from flask_codemirror import CodeMirror
from editor.codeeditor import codeEditor
from myfirebase.config import firebase

# mandatory
CODEMIRROR_LANGUAGES = ['python']
# optional
#CODEMIRROR_THEME = '3024-day'
CODEMIRROR_ADDONS = (
            ('ADDON_DIR','ADDON_NAME'),
)

app = Flask(__name__)
app.config['DEBUG'] = True
app.secret_key="ThisisAndela"

app.config.from_object(__name__)
codemirror = CodeMirror(app)





@app.route("/")
def main():
    return render_template("index.html")

@app.route("/create/session",methods=['POST'])
def create_session():
    form = codeEditor()
    session_name = request.form['create_session']
    session['pair_name'] = session_name
    session['role'] = 'driver'
    db =firebase.database()

    data = {"name": session_name, "role": session['role']}
    ref = db.child("users").push(data)
    session['dbref']=ref['name']
    return render_template("home.html",pair_name=session['pair_name'], form = form)


@app.route("/join/session")
def join_session():
    pass

@app.route("/code/update", methods=['POST'])
def code_update():
    db = firebase.database()
    data = {request.form['line']:
                {
                    "text":request.form['text']
                }
    }
    db.child("users/"+str(session['dbref'])).update(data)

    return "done"


@app.route("/home")
def home():
    return render_template("home.html",pair_name=session['pair_name'])




if __name__ == "__main__":
    app.run()