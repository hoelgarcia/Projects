from flask import flash;
from flask_app import app
import re

from flask_app.config.mysqlconnection import connectToMySQL;

EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
PASSWORD_REGEX = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$')
class Coach:
    def __init__(self,data):
        self.id = data['id']
        self.club_name = data['club_name']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
#======================================================================================================================================================
#method for validating coach information at registration
    @staticmethod
    def validate_coach(coach):
        is_valid = True
        if len(coach['club_name']) < 4:
            flash("Club name must be at least 4 characters long.",'registration')
            is_valid = False
        if len(coach['first_name']) < 2:
            flash("First name must be at least 2 characters long.", 'registration')
            is_valid = False
        if len(coach['last_name']) < 2:
            flash("First name must be at least 2 characters long.", 'registration')
            is_valid = False
        if not EMAIL_REGEX.match(coach['email']):
            flash("Email address is not valid.",'registration')
            is_valid = False
        if len(coach['password']) < 8:
            flash("Password must be 8-20 characters long.",'registration')
            is_valid = False
        if not PASSWORD_REGEX.match(coach['password']):
            flash("Password must contain at least one number, one uppercase letter, one lowercase letter, and one special symbol(@$!#%*?&).",'registration')
            is_valid = False
        if (coach['password'] != coach['confirmation_password']):
            flash("Confirmation password must match password.",'registration')
            is_valid = False
        return is_valid
# #======================================================================================================================================================
#method for saving coach info into DB
    @classmethod
    def save(cls,data):
        query = "INSERT INTO coaches(club_name, first_name, last_name, email, password, created_at, updated_at) VALUES (%(club_name)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s, NOW(), NOW());"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        return results
#======================================================================================================================================================
#method for finding coach by email
    @classmethod
    def find_by_email(cls, data):
        query = "SELECT * FROM coaches WHERE email = %(email)s;"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        #check to see if there is no email in DB
        if len(results) < 1:
            return False
        return cls(results[0])
#======================================================================================================================================================
#method for finding coach by club name
    @classmethod
    def find_by_club_name(cls, data):
        query = "SELECT * FROM coaches WHERE club_name = %(club_name)s;"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        if len(results) < 1:
            return False
        return cls(results[0])
#======================================================================================================================================================
#method for finding coach by id in MySQL
    @classmethod
    def find_by_id(cls, data):
        query = "SELECT * FROM coaches WHERE id = %(id)s;"
        results = connectToMySQL("CoachPlayerPython").query_db(query,data)
        # get back just ID if you leave it like this
        # gets back all information:
        return cls(results[0])