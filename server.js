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
server.get('/',(req,res)=>{
    res.render('home');
});

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
    this.language = ele.show.language ? ele.show.language : "No languages available";
    this.genres = ele.show.genres ? ele.show.genres : "No geners found";
    this.status = ele.show.status ? ele.show.status : "Not available";
    this.premiered = ele.show.premiered ? ele.show.premiered : "Not available";
    this.officialSite = ele.show.officialSite ? ele.show.officialSite: "https://www.hbo.com/";
    // this.rating = ele.show.rating.average ? ele.show.rating.average: "not found";
    this.image = ele.show.image ? ele.show.image.medium : "not found";
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