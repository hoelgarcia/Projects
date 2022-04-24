from flask_app import app
from flask import render_template, session, redirect, request, flash
from flask_bcrypt import Bcrypt
from flask_app.models.user import User
bcrypt = Bcrypt(app)

#landing page for login and registration
@app.route("/")
def login_registration_page():
    return render_template("loginregistrationpage.html")

# process registration
@app.route("/register", methods = ['POST'])
def register():
    if not User.validate_user(request.form):
        return redirect("/")
    
    data_email = {
        'email' : request.form['email']
    }
    if User.find_by_email(data_email):
        flash("Email is already in use.",'registration')
        return redirect("/")
    
    data_user_name = {
        'user_name' : request.form['user_name']
    }
    
    if User.find_by_username(data_user_name):
        flash("Username is already in use.",'registration')
        return redirect("/")
    
    #hash password before saving
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    
    data = {
        "user_name" : request.form['user_name'],
        "first_name" : request.form['first_name'],
        "last_name" : request.form['last_name'],
        "email" : request.form['email'],
        "password" : pw_hash
    }
    user_id = User.save(data)
    session["user_id"] = user_id
    return redirect("/dashboard")
# process login
@app.route("/login", methods = ['POST'])
def login():
    data = {
        "email" : request.form['email']
    }
    user_in_db = User.find_by_email(data)
    if not user_in_db:
        flash("This email is not in our system.",'login')
        return redirect("/")
    if not bcrypt.check_password_hash(user_in_db.password, request.form["password"]):
        flash("This password does not match the email.",'login')
        return redirect("/")
    session["user_id"] = user_in_db.id
    return redirect("/dashboard")

@app.route("/dashboard")
def dashboard():
    if "user_id" in session:
        data = {
            "id" : session["user_id"]
        }
        user = User.find_by_id(data)
        return render_template("dashboard.html", user = user)
    else:
        return redirect("/")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")