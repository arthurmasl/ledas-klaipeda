const Xray = require('x-ray');
const x = Xray({
  filters: {
    trim: value => value.replace(/\s/g, ''),
    notEmpty: value => (value.length ? value : null),
  },
});

var bodyParser = require('body-parser');
var cors = require('cors');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());
app.use(express.static('build'));

app.get('/api', function(req, res) {
  res.set({ 'content-type': 'application/json; charset=utf-8' });

  var stream = x(
    'https://www.akropolis.lt/lt/klaipeda/titulinis/pramogos/ledo-rezervacijos/akropolio-ledo-paslaugos',
    {
      date: ['.ice-reservation__day | trim | notEmpty'],
      time: ['.ice-reservation__header | trim | notEmpty'],
      content: ['.content-container__cell | trim | notEmpty'],
    }
  ).stream();

  stream.pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
