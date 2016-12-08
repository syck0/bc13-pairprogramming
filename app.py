from flask import Flask, render_template, request, session, redirect
from myfirebase.config import firebase


app = Flask(__name__)
app.config['DEBUG'] = True
app.secret_key="ThisisAndela"

app.config.from_object(__name__)



@app.route("/")
def main():
    """ Fire up the main page"""
    return render_template("index.html")

@app.route("/create/session",methods=['POST'])
def create_session():
    """ Creates a new session"""
    session_name = request.form['create_session']
    session['pair_name'] = session_name
    session['role'] = 'driver'
    db =firebase.database()

    data = {"name": session_name, "role": session['role']}
    ref = db.child("users").push(data)
    session['dbref']=ref['name']
    return render_template("home.html",pair_name=request.url_root+"join/session?session="+session['dbref'])



@app.route("/join/session", methods=['GET'])
def join_session():
    """ user joins an active session
        all functionality handled by jquery
    """
    return render_template('join.html',session_id=request.args.get('session'))



@app.route("/code/update", methods=['POST'])
def code_update():
    """ Writes code to firebase database"""
    db = firebase.database()
    data = {request.form['line']:
                {
                    "text":request.form['text']
                }
    }
    db.child("users/"+str(session['dbref'])).update(data)

    return "done"



@app.route("/code/delete", methods=['POST'])
def code_delete():
    """ deletes code from firebase"""
    db = firebase.database()
    db.child("users").child(str(session['dbref'])).child(request.form['line']).remove()
    data = {request.form['line']:
        {
            "text": request.form['text']
        }
    }
    return "done"



if __name__ == "__main__":
    app.run()