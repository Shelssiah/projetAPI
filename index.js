// packages requis
const express = require('express');
const bodyParser = require('body-parser');
const fs= require('fs'); // pour gérer création du fichier json

// port
const PORT = process.env.PORT || 3000;

let val= 0;

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

// root
app.post('/annotation', (req, res) => {

  //const annotations = getAnnotations();
  const annotation = {
    id: val++,
    url: req.body.url,
    comment: req.body.comment,
    note: req.body.note
  };

  try {
      const data = fs.readFileSync('annotations.json');
      let annotations = JSON.parse(data);
      annotations.push(annotation);
      fs.writeFileSync('annotations.json', JSON.stringify(annotations));
  } catch (err) {
      const annotations = [annotation];
      fs.writeFileSync('annotations.json', JSON.stringify(annotations));
  }

 // annotations.push(annotation);

  //enregistrement
  

  //res.json(annotation);
  res.send("Annotation crée");
});


// récup Annotations
app.get('/annotation/:url', (req, res) => {

    const url = req.params.url;

    try {
        const data = fs.readFileSync('annotations.json');
        const annotations= JSON.parse(data);

        const annotation = annotations.find((a) => a.url === url);

        if (annotation)
        {
            const format = req.query.format;

            if (format === 'json') {
                res.json(annotation);
            } else {
                const html = '<p> Commentaire : ${annotation.comment} </p> <p> Note: ${annotation.note}</p> ';
                res.send(html);
            }
         } else 
         {
        res.send("Annotation non trouvée");
         }  
    }

    catch (err) {
        console.log(err);
       
    }
});


// serveur
app.listen(PORT, () =>{
  console.log(`The Annotations API is running on: http://localhost:${PORT}.`);
});

