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

app.get('/api', function (req, res) {
  res.set({ 'content-type': 'application/json; charset=utf-8' });

  let apiUrl =
    'https://www.akropolis.lt/lt/klaipeda/titulinis/pramogos/ledo-rezervacijos/akropolio-ledo-paslaugos';

  // if (req.params.city === 'vilnius')
  //   apiUrl =
  //     'https://www.akropolis.lt/lt/vilnius/main-page-setup/pramogos/ledo-rezervacijos/akropolio-ledo-paslaugos';

  // if (req.params.city === 'siauliai')
  //   apiUrl =
  //     'https://www.akropolis.lt/lt/siauliai/titulinis/pramogos/ledo-rezervacijos/akropolio-ledo-paslaugos';

  // if (req.params.city === 'kaunas')
  //   apiUrl =
  //     'https://www.akropolis.lt/lt/kaunas/titulinis/pramogos/ledo-rezervacijos';

  const stream = x(apiUrl, {
    date: ['.ice-reservation__day | trim | notEmpty'],
    time: ['.ice-reservation__time | trim | notEmpty'],
    content: ['.content-container__cell | trim | notEmpty'],
  }).stream();

  stream.pipe(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
