exports.createPostValidator=(req,res,next) =>{
    
    //title
    req.check("title","Write a Title").notEmpty();
    req.check("title","Title must be between 4 to 150 characters").isLength({
        min:4,
        max:150
    });

    //body
    req.check("body","Write a Title").notEmpty();
    req.check("body","Body must be between 4 to 2000 characters").isLength({
        min:4,
        max:2000
    });

    //check for error 
    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError});
    }

    next();
};

exports.userSignupValidator=(req,res,next) =>{
    //name is not empty 
    req.check("name", "Name is Required").notEmpty();

    //email
    req.check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/).withMessage("Email must contain @")
    .isLength({ min: 4, max:2000})

    //password 
    req.check("password", "Password is required").notEmpty();
    req.check("password")
    .isLength({min:6}).withMessage("Password should be atleast 6 characters")
    .matches(/\d/).withMessage("Password should contain atleast one digit")

    //error
    const errors=req.validationErrors();
    if(errors){
        const firstError=errors.map((error)=> error.msg)[0]
        return res.status(400).json({error: firstError});
    }

    next();
}