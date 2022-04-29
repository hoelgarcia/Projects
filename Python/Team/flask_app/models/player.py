from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
from flask_app.models import coach

class Player:
    def __init__(self, data):
        self.id = data["id"]
        self.jersey_number = data["jersey_number"]
        self.position = data["position"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.birthday = data["birthday"]
        self.nationality = data["nationality"]
        self.weight = data["weight"]
        self.height = data["height"]
        self.dominant_foot = data["dominant_foot"]
        self.previous_club = data["previous_club"]
        self.date_signed = data["date_signed"]
        self.description = data["description"]
        self.website_url = data["website_url"]
        self.profile_picture = data["profile_picture"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.coach = {}
#======================================================================================================================================================
#method for adding a player
    @classmethod
    def add_player(cls, data):
        query = "INSERT INTO players ( jersey_number, position,first_name, last_name, birthday, nationality, weight, height, dominant_foot, previous_club, date_signed, description, website_url, profile_picture, coach_id,created_at) VALUES (%(jersey_number)s, %(position)s, %(first_name)s, %(last_name)s, %(birthday)s, %(nationality)s, %(weight)s, %(height)s, %(dominant_foot)s, %(previous_club)s, %(date_signed)s, %(description)s, %(website_url)s, %(profile_picture)s, %(coach_id)s, NOW());"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        return results
#======================================================================================================================================================
#method for getting player
    @classmethod
    def get_players(cls):
        query = "SELECT * FROM players LEFT JOIN coaches ON players.coach_id = coaches.id;"
        results = connectToMySQL("CoachPlayerPython").query_db(query)
        players = []
        for row in results:
            player = cls(row)
            coach_data = {
                "id" : row["coaches.id"],
                "club_name" : row["club_name"],
                "first_name" : row["coaches.first_name"],
                "last_name" : row["coaches.last_name"],
                "email" : row["email"],
                "password" : row["password"],
                "created_at" : row["coaches.created_at"],
                "updated_at" : row["coaches.updated_at"]
            }
            player.coach = coach.Coach(coach_data)
            players.append(player)
        return players
#======================================================================================================================================================
#method for showing one player
    @classmethod
    def show_player(cls,data):
        query = "SELECT * FROM players LEFT JOIN coaches ON players.coach_id = coaches.id WHERE players.id = %(player_id)s;"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        player = cls(results[0])
        coach_data = {
            "id" : results[0]["coaches.id"],
            "club_name" : results[0]["club_name"],
            "first_name" : results[0]["coaches.first_name"],
            "last_name" : results[0]["coaches.last_name"],
            "email" : results[0]["email"],
            "password" : results[0]["password"],
            "created_at" : results[0]["coaches.created_at"],
            "updated_at" : results[0]["coaches.updated_at"]
        }
        player.coach = coach.Coach(coach_data)
        return player
#======================================================================================================================================================
#method for updating one player
    @classmethod
    def update_player(cls,data):
        query = "UPDATE players SET jersey_number = %(jersey_number)s, position = %(position)s, first_name = %(first_name)s, last_name = %(last_name)s, birthday = %(birthday)s, nationality = %(nationality)s, weight = %(weight)s, height = %(height)s, dominant_foot = %(dominant_foot)s, previous_club = %(previous_club)s, date_signed = %(date_signed)s, description = %(description)s, website_url = %(website_url)s, profile_picture = %(profile_picture)s, updated_at = NOW() WHERE id = %(player_id)s;"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        return
#======================================================================================================================================================
#method for removing one player
    @classmethod
    def delete_player(cls,data):
        query = "DELETE FROM players WHERE id = %(player_id)s;"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        return
#======================================================================================================================================================
#validate form for adding player
    @staticmethod
    def validate_player(data):
        is_valid = True 
        if int(data["jersey_number"]) < -1  and int(data["jersey_number"]) > 100 and int(data["jersey_number"]) == "":
            flash("Jersey number is required.")
            is_valid = False
        if data['position'] == "":
            flash("Player position is required.")
            is_valid = False
        if data['first_name'] == "":
            flash("Player first name is required.")
            is_valid = False
        if data['last_name'] == "":
            flash("Player last name is required.")
            is_valid = False
        if data['birthday'] == "":
            flash("Player birth date is required.")
            is_valid = False
        if data['nationality'] == "":
            flash("Player nationality is required.")
            is_valid = False
        if data['height'] == "":
            flash("Player height(cm) is required.")
            is_valid = False
        if data['weight'] == "":
            flash("Player weight(kg) is required.")
            is_valid = False
        if data['dominant_foot'] == "":
            flash("Player skill foot is required.")
            is_valid = False
        if data['previous_club'] == "":
            flash("Player's previous club is required.")
            is_valid = False
        if data['date_signed'] == "":
            flash("Player's signing date is required.")
            is_valid = False
        if data['description'] == "":
            flash("Player description is required.")
            is_valid = False
        if data['website_url'] == "":
            flash("Website credit is required.")
            is_valid = False
        if data['profile_picture'] == "":
            flash("URL picture is required.")
            is_valid = False
        return is_valid