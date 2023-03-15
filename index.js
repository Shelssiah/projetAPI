// packages requis
const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs'); // pour gérer création du fichier json

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

// fonction pour avoir un fichier json contenat les annotations
function getAnnotations() {
    const data = fs.readFileSync('annotations.json');
    const annotations = JSON.parse(data);
    return annotations;
}

// récup Annotations
app.get('/annotation', (req, res) => {
    const annotations = getAnnotations();
    res.json(annotations);
});

// root
app.post('/annotation', jsonParser, (req, res) => {

  const annotations = getAnnotations();
  const annotation = {
    id: annotations.length+1,
    url: req.body.url,
    comment: req.body.comment,
    note: req.body.note
  };

  annotations.push(annotation);

  //enregistrement
  fs.writeFileSync('annotations.json', JSON.stringify(annotations));

  res.json(annotation);
});

// serveur
app.listen(PORT, () =>{
  console.log(`The Annotations API is running on: http://localhost:${PORT}.`);
});

