// packages requis
const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs');

// port
const PORT = process.env.PORT || 3000;

// appels
const app = express();
app.use(bodyParser.json());

// html dossier client
app.use(express.static('client'));

// verification
app.get('/', (request, response) => {
    response.send('Welcome on the annotations API! Hello Wold ! ');
});

// def de var
let iden= 0;

// root
app.post('/annotation', (req, res) => {
  const annotation = {
    id: iden+1,
    url: req.body.url,
    comment: req.body.comment,
    note: req.body.note
  };

  // fichier existant

  const data= fs.raedFileSync('annot.json','utf8');
  const val= JSON.parse(data);

  // ajout nouv créé
  val.push(annotation);

  //enregistrement
  fs.writeFileSync('annot.json', JSON.stringify(val));


  res.json(annotation);
});

// serveur
app.listen(PORT, () =>{
  console.log(`The Annotations API is running on: http://localhost:${PORT}.`);
});

/*
//
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/annotation', (req, res) => {
  const annotation = {
    url: req.body.url,
    comment: req.body.comment,
    note: req.body.note
  };
  res.json(annotation);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
*/

/* # test fonctionnel
app.get('/', (request, response) => {
    // The string we want to display on http://localhost:3000
    response.send('Welcome on the annotations API! Hello Wold ! ');
});
*/