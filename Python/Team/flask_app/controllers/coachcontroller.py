from flask_app.models.player import Player
from flask_app import app
from flask import render_template, session, redirect, request,flash
from flask_bcrypt import Bcrypt
from flask_app.models.coach import Coach
bcrypt = Bcrypt(app)

#======================================================================================================================================================
#landing page for login and registration
@app.route("/")
def login_registration_page():
    return render_template("log_reg_page.html")
#======================================================================================================================================================
#process registration
@app.route("/register", methods = ["POST"])
def register():
    if not Coach.validate_coach(request.form):
        return redirect("/")
    data_email = {
        'email' : request.form['email']
    }
    if Coach.find_by_email(data_email):
        flash("Email is already in use.", 'registration')
        return redirect("/")
        
    data_club_name = {
        'club_name' : request.form['club_name']
    }
    if Coach.find_by_club_name(data_club_name):
        flash("This club is already registered.","registration")
        return redirect("/")
    #hash password before saving
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    data = {
        "club_name" : request.form["club_name"],
        "first_name" : request.form["first_name"],
        "last_name" : request.form["last_name"],
        "email" : request.form["email"],
        "password" : pw_hash
    }
    coach_id = Coach.save(data)
    session["coach_id"] = coach_id
    return redirect("/home")
#======================================================================================================================================================
#process login
@app.route("/login", methods = ['POST'])
def login():
    data = {
        "email" : request.form['email']
    }
    coach_in_db = Coach.find_by_email(data)
    if not coach_in_db:
        flash("This email is not in our system.",'login')
        return redirect("/")
    if not bcrypt.check_password_hash(coach_in_db.password, request.form["password"]):
        flash("This password does not match the email.",'login')
        return redirect("/")
    session["coach_id"] = coach_in_db.id
    return redirect("/home")
#======================================================================================================================================================
#dashboard page with session check
@app.route("/home")
def home():
    if "coach_id" in session:
        data = {
            "id" : session["coach_id"]
        }
        coach = Coach.find_by_id(data)
        players = Player.get_players()
        return render_template("home.html", coach = coach, players = players)
    else:
        flash("Please login or register!")
        return redirect("/")
#======================================================================================================================================================
#clears session redirects to login/reg page
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")