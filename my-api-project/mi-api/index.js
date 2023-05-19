var express = require('express');
const apiRouter = require('./server');
const { errorLogs, handlerError } = require('./middleware/error.handler');
var app = express();

app.use(express.json());
apiRouter(app);
app.use(handlerError); //lo ponemos en este orden porque queremos que se ejecute en este orden
app.use(errorLogs);


app.get('/', function(req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
  console.log("hola tú");

});
