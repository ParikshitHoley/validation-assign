const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require("../model/user.model");

router.post("",body("first_name").trim().notEmpty().isLength({ min: 3, max: 20 }),
body("last_name").trim().notEmpty().isLength({ min: 3, max: 20 }),
body("email").isEmail().bail().custom(async (value)=>{

    const checkEmail = await User.findOne({email:value});

    if(checkEmail){
        throw new Error("Email already is in use");
    }
    return true;
}),
body("age").isNumeric().isFloat({min:1,max:100}),
body("pincode").isNumeric().isLength({min:6,max:6}),
body("gender").not().isEmpty().withMessage('Gender is required').isIn(['Male', 'Female','other']),

  async (req, res) => {
      try{

    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {

        // let newError;

        let newError = errors.array().map((ele)=>{

            return({key:ele.param , message:ele.msg})

        })

      return res.status(400).json({ errors: newError });

    }

    const user = await User.create(req.body)

    return res.status(201).send(user)

      }catch(err){
        return res.status(500).send({ message: err.message });
      }
    
  },

);


module.exports = router;

