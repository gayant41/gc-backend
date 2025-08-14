import User from "../modules/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUser(req, res) {

    const newUserData = req.body;
    newUserData.password = bcrypt.hashSync(newUserData.password, 10)

    const user = new User(newUserData)
    console.log(user)

    if (req.user == null) {
        res.json({
            message: "Please login as admin"
        })
        return
    }
    if (req.user.type != "admin") {
        res.json({
            message: "Please login as admin"
        })
        return
    }
    //"email": "admin@example.com",
    //"password": "securePassword123"
    user.save()
        .then(() => {
            res.json({
                message: "User created"
            })
        })
        .catch(() => {
            res.json({
                message: "User not created"
            })
        })

}

export function loginUser(req, res) {
    User.find({ email: req.body.email }).then((users) => {
        if (users.length == 0) {
            res.json({
                message: "User not found"
            })
        }
        else {
            const user = users[0]
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)

            if (isPasswordCorrect) {
                const token = jwt.sign({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                }, process.env.SECRET_KEY)
                res.json({
                    token: token,
                    message: "Password correct",
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type,
                        profilePicture: user.profilePicture

                    }

                })
            } else {
                res.json({
                    message: "Password incorrect"
                })
            }
        }
    }
    )
}

export function isadmin(req) {
    if (req.user == null) {

        return false
    }
    if (req.user.type != "admin") {

        return false
    }
    return true
}

export function iscustomer(req) {
    if (req.user == null) {

        return false
    }
    if (req.user.type != "customer") {

        return false
    }
    return true
}