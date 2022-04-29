from flask_app import app
from flask import render_template, redirect, request, session, flash
from flask_app.models.player import Player
#======================================================================================================================================================
#add a player
@app.route("/add_player")
def add_player():
    if "coach_id" not in session:
        flash("Please login or register!")
        return redirect("/")
    return render_template("add_player.html")
#======================================================================================================================================================
#add a player post route
@app.route("/add_player/post", methods=["POST"])
def add_player_post():
    data = {
        "jersey_number" : request.form["jersey_number"],
        "position" : request.form["position"],
        "first_name" : request.form["first_name"],
        "last_name" : request.form["last_name"],
        "birthday" : request.form["birthday"],
        "nationality" : request.form["nationality"],
        "weight" : request.form["weight"],
        "height" : request.form["height"],
        "dominant_foot" : request.form["dominant_foot"],
        "previous_club" : request.form["previous_club"],
        "date_signed" : request.form["date_signed"],
        "description" : request.form["description"],
        "website_url" : request.form["website_url"],
        "profile_picture" : request.form["profile_picture"],
        "coach_id" : session["coach_id"]
    }
    if not Player.validate_player(data):
        return redirect("/add_player")
    Player.add_player(data)
    return redirect("/home")
#======================================================================================================================================================
#one player info
@app.route("/player/<int:player_id>")
def show_player(player_id):
    if "coach_id" not in session:
        flash("Please login or register!")
        return redirect("/")
    data = {
        "player_id" : player_id
    }
    player = Player.show_player(data)
    return render_template("show_player.html", player = player)
#======================================================================================================================================================
#update a player page
@app.route("/update/<int:player_id>")
def update_player(player_id):
    if "coach_id" not in session:
        flash("Please login or register!")
        return redirect("/")
    data = {
        "player_id" : player_id
    }
    player = Player.show_player(data)
    return render_template("update_player.html", player = player)
#======================================================================================================================================================
#update a player post route
@app.route("/update/<int:player_id>/post", methods = ["POST"])
def update_player_post(player_id):
    if "coach_id" not in session:
        flash("Please login or register!")
        return redirect("/")
    if not Player.validate_player(request.form):
        return redirect(f"/update/{player_id}")
    data = {
        "jersey_number" : request.form["jersey_number"],
        "position" : request.form["position"],
        "first_name" : request.form["first_name"],
        "last_name" : request.form["last_name"],
        "birthday" : request.form["birthday"],
        "nationality" : request.form["nationality"],
        "weight" : request.form["weight"],
        "height" : request.form["height"],
        "dominant_foot" : request.form["dominant_foot"],
        "previous_club" : request.form["previous_club"],
        "date_signed" : request.form["date_signed"],
        "description" : request.form["description"],
        "website_url" : request.form["website_url"],
        "profile_picture" : request.form["profile_picture"],
        "coach_id" : session["coach_id"],
        "player_id" : player_id
    }
    Player.update_player(data)
    return redirect("/home")
#======================================================================================================================================================
#delete a player page
@app.route("/delete/<int:player_id>")
def delete_player(player_id):
    if "coach_id" not in session:
        flash("Please login or register!")
        return redirect("/")
    data = {
        "player_id" : player_id
    }
    Player.delete_player(data)
    return redirect("/home")