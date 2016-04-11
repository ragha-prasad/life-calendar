'use strict';

var moment = require('moment');
var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/numberOfWeeks', function handler(req, res) {
    var dob = moment(new Date(req.query.year, req.query.month, req.query.day));
    var today = moment(new Date());
    var noOfWeeks = today.diff(dob, 'weeks');
    res.json({
        'noOfWeeks': noOfWeeks
    });
});

app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

