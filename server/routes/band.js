const express = require('express');
const router = express.Router();
const Band = require('../models/Band');
var validateImage = require('../helpers').validateImage;




router.get("/", async ( req, res ) => {
    
    try{
        const foundBands = await Band.find({});
        var data = foundBands.map((band)=>{
            return {
                _id : band._id,
                name: band.name,
                image: band.image
            }
        })
        res.status(200).json(data)
    }catch(err)
    {
        res.status(500).send("Internal Server error while getting bands");
    }
});

router.get("/:id", async ( req, res ) => {
    try{
        const foundBand = await Band.findById(req.params.id);
        
        res.status(200).json(foundBand);
    }catch(err)
    {
        res.status(500).send("Internal Server error while getting band");
    }
});

router.post("/", async ( req, res ) => {
    let newBand = {
        name  : req.body.name,
        genre : req.body.genre,
        image : req.body.image,
        favourite_album : req.body.favourite_album,
        favourite_song : req.body.favourite_song
    }

    if(!newBand.name)
    {
        res.status(400).send("Name is required");
        return;
    }

    if(newBand.image && !validateImage(newBand.image))
    {
        res.status(400).send("Invalid image url");
        return;
    }
    
    try{
        const foundBand = await Band.find({name:newBand.name});
        if(foundBand && foundBand.length) 
        {
            res.status(409).send("Band already exists");
            return;
        }
    }catch(err){
        res.status(500).send(err.message);
        return;
    }

    try {
        const createdBand = await Band.create(newBand);
        res.status(200).json(createdBand);
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.put("/:id", async ( req, res ) => {
    let newBand = {
        name  : req.body.name,
        genre : req.body.genre,
        image : req.body.image,
        favourite_album : req.body.favourite_album,
        favourite_song : req.body.favourite_song
    }

    if(!newBand.name)
    {
        res.status(400).send("Name is required");
        return;
    }

    if(newBand.image && !validateImage(newBand.image))
    {
        res.status(400).send("Invalid image url");
        return;
    }
    
    try {
        await Band.findOneAndUpdate( {_id: req.params.id}, {$set: {...newBand}});
        const updatedBand = await Band.findById(req.params.id);
        const foundBands = await Band.find({});
        var bands = foundBands.map((band)=>{
            return {
                _id : band._id,
                name: band.name,
                image: band.image
            }
        })
        res.status(200).json({updatedBand,bands});
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete("/:id", async ( req, res ) => {
    try {
        await Band.findOneAndDelete( {_id: req.params.id} );
        res.status(200).send('Band successfully deleted');
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;