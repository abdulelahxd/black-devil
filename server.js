'use strict';
// initial server 
require('dotenv').config();

const express = require('express');
const server = express();
const cors = require('cors');
const superagent = require('superagent');
const ejs = require('ejs');
const PORT = process.env.PORT || PORTTWO;

server.use(cors());
server.use(express.static('./public'));
server.set('view engine', 'ejs');

// routes
server.get('/search',(req,res)=>{
    let url = `http://api.tvmaze.com/search/shows?q=${req.query.userKey}`;
    superagent.get(url).then(movieData=>{
        let movieInfo = movieData.body.map(ele=>{
            return new Movie(ele);
        });
        res.render('show', { movieKey : movieInfo });
    });
});

// constructor for movies
function Movie(ele) {
    this.name = ele.show.name;
    this.language = ele.show.language;
    this.genres = ele.show.genres; // array 
    this.status = ele.show.status;
    this.premiered = ele.show.premiered;
    this.officialSite = ele.show.officialSite;
    this.rating = ele.show.rating;
    this.image = ele.show.image.medium;
    this.summary = ele.show.summary;
}

// catch error
server.get('*',(req,res)=>{
    res.render('error');
});

server.use((Error,req,res) =>{
    res.status(500).send(Error);
});

// listening port
server.listen(PORT, ()=>{
    console.log(` __--__ `);
});