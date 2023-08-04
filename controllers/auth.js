import User from "../models/user";
export const register = async (req, res) => {
    console.log(req.body);
    const { name, email, password, address, smaster, program, course, phonenumber, college, university } = req.body;

    // validation
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6) return res.status(400).send('Password is required and should be min 6 characters long');
    let userExist = await User.findOne({email}).exec();
    if(userExist) return res.status(400).send('Email is taken');

    const user = new User({
        name,
        email,
        password,
        address,
        smaster,
        program,
        course,
        phonenumber,
        college,
        university
    });

    try {
        await user.save();
        console.log('USER CREATED',user);
        return res.json({ok : true});
    } catch (error) {
        console.log('Create User Failed',error);
        return res.status(400).send('Error Try Again');
    }
};

export const login = async(req,res) => {
// console.log(req.body)
const {email,password}= req.body;
try {
//check if user with that email exists
let user = await User.findOne({email}).exec()
// console.log('User Exist',user)
if(!user) res.status(400).send("USER WITH THAT EMAIL NOT FOUND");
    user.comparePassword(password, (err,match)=>{
    console.log('COMPARE PASSWORD IN LOGIN ERR',err);
    if(!match || err) return res.status(400).send("Wrong Password");
    console.log("GENERATE A TOKEN THEN SEND AS RESPONSE TO THE CLIENT")
    })
} catch (error) {
console.log('Login Error',error)
res.status(400).send("SignIn Failed")
}
}
