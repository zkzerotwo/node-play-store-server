const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express()
const apps = require('./playstore');
// const { sort } = require('./playstore');

app.use(morgan('common'));
app.use(cors());


    app.get('/apps', (req, res) => {
        let sort = req.query.sort
        let genre = req.query.genres
        console.log(req)
        // console.log(results);
        console.log(sort);
        console.log(genre)
        if (!['App', 'rating'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of App or rating')
        }

        if (sort === 'App') {
            if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
                return res
                    .status(400)
                    .send('Please pick an applicable genre')
            }

        }
        let results = apps.filter(app => app.Genres.includes(genre))
        if (sort) {
            results
                .sort((a, b) => {
                    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
                });
        }
        res
            .json(results)
    })
module.exports = app