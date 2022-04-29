from  flask_app import app;

from flask_app.controllers import coachcontroller
from flask_app.controllers import playercontroller

if __name__ == "__main__":
    app.run(debug=True)