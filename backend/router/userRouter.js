const router = require("./postRouter");
const express = require('express');
const router = express.Router();
const Model = require('../models/userModels');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add' , (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result);
        
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});
router.post("/authenticate", (req, res) => {
    console.log(req.body);
    Model.find(req.body)
    .then((result) => {
        if(result){
            const{_id, name, email} = result;
            const payload = {_id, name, email};
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiry:'2 days'
            },
            (err, token) => {
                if(err){
                    res.status(500).json({message: "Error in generating token"});
                }
                else{
                    res.status(200).json({token, role: result.role});
                }
            }
        )}
        else{
            res.status(401).json({message: "Invalid credentials"});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});