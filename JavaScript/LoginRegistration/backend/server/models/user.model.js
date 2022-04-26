const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email must be a valid email with an '@' and website source."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer."],
        maxlength: [24, "Password must be less than 24 characters."]
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters."]
    },
    birthday:{
        type: Date,
        required: [true, "Birth date is required."]
    },
    profilePicture:{
        type: String,
        required: [true, "Please upload an image url/address to set as your profile picture."]
    }
}, {timestamps: true});



UserSchema.virtual('confirm')
    .get( () => this._confirm )
    .set( value => this._confirm = value);



UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) {
    this.invalidate('confirm', 'Password must match confirm password');
}
next();
});



UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
    next();
    })
})






module.exports = mongoose.model("User", UserSchema);