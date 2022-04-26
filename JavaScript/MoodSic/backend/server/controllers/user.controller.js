const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



class UserController {


    getAllUsers = (req,res) => {
        User.find()
            .then(allUsers =>{
                res.json({results: allUsers})
            })
            .catch(err =>{
                res.json({error: err})
            })
    }


    register = (req,res) => {
    User.find({email: req.body.email})
        .then(usersWithEmail => {
            console.log("response when finding user", usersWithEmail)
            if(usersWithEmail.length === 0){
                User.create(req.body)
                .then(user => {
                    const userToken = jwt.sign({
                        id: user._id,
                        firstName: user.firstName
                    }, process.env.SECRET_KEY);

                    res
                        .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                            httpOnly: true
                        })
                        .json({ msg: "success!", user: user });
                })
            .catch(err => res.json(err));
            }else{
                res.json({errors: {email:{message:"Email is taken!"}}})
            }
        })
        .catch(err => console.log("errr!", err))
    }


    login = async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
    
        if(user === null) {
            // email not found in users collection
            return res.json({error: "User not found."});
        }
    
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!correctPassword) {
            // password wasn't a match!
            return res.json({error: "Password is incorrect!"});
        }
    
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id,
            firstName: user.firstName
        }, process.env.SECRET_KEY);
    
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    logout = (req,res) => {
        res.clearCookie("usertoken");
        res.sendStatus(200);
    }

    getLoggedInUser = (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
        User.findOne({ _id: decodedJWT.payload.id })
            .then(foundUser => {
                res.json({results: foundUser})
            })
            .catch(err => {
                res.json(err)
            })
    }
}

module.exports = new UserController();