from flask import flash
from flask_app import app

import re

from flask_app.config.mysqlconnection import connectToMySQL


EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')

class User:
    def __init__(self,data):
        self.id = data['id']
        self.user_name = data['user_name']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    @staticmethod
    def validate_user(user):
        is_valid = True
        if len(user['user_name']) < 4:
            flash("Username must be at least 4 characters long.",'registration')
            is_valid = False
        if len(user['first_name']) < 2:
            flash("First name must be at least 2 characters long.", 'registration')
            is_valid = False
        if len(user['last_name']) < 2:
            flash("Last name must be at least 2 characters long.",'registration')
            is_valid = False
        if not EMAIL_REGEX.match(user['email']):
            flash("Email address is not valid.",'registration')
            is_valid = False
        if len(user['password']) < 8:
            flash("Password must be at least 8 characters long.",'registration')
            is_valid = False
        if (user['password'] != user['confirmation_password']):
            flash("Confirmation password must match password.",'registration')
            is_valid = False
        return is_valid
    
    @staticmethod
    def validate_update_user(user):
        is_valid = True
        if len(user['user_name']) < 4:
            flash("Username must be at least 4 characters long.",'update')
            is_valid = False
        if len(user['first_name']) < 2:
            flash("First name must be at least 2 characters long.", 'update')
            is_valid = False
        if len(user['last_name']) < 2:
            flash("Last name must be at least 2 characters long.",'update')
            is_valid = False
        if not EMAIL_REGEX.match(user['email']):
            flash("Email address is not valid.",'update')
            is_valid = False
        return is_valid
    
    # method to save user into DB
    @classmethod
    def save(cls, data):
        query = "INSERT INTO users(user_name, first_name, last_name, email, password, created_at, updated_at) VALUES (%(user_name)s, %(first_name)s, %(last_name)s, %(email)s, %(password)s, NOW(), NOW());"
        results = connectToMySQL("LoginRegistrationPython").query_db(query,data)
        return results
    #method to find user by email
    @classmethod
    def find_by_email(cls, data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        results = connectToMySQL("LoginRegistrationPython").query_db(query,data)
        #check to see if there is no email in DB
        if len(results) < 1:
            return False
        return cls(results[0])
    #method to find user by email
    @classmethod
    def find_by_username(cls, data):
        query = "SELECT * FROM users WHERE user_name = %(user_name)s;"
        results = connectToMySQL("LoginRegistrationPython").query_db(query,data)
        #check to see if there is no username in DB
        if len(results) < 1:
            return False
        return cls(results[0])
    @classmethod
    def find_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL("LoginRegistrationPython").query_db(query,data)
        # get back just ID if you leave it like this
        # gets back all information:
        return cls(results[0])
    @classmethod
    def update_user(cls, data):
        query = "UPDATE users SET user_name = %(user_name)s, first_name = %(first_name)s, last_name = %(last_name)s, email = %(email)s, updated_at = NOW() WHERE id = %(user_id)s;"
        results = connectToMySQL("LoginRegistrationPython").query_db(query,data)
