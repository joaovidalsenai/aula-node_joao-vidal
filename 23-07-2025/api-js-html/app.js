import express from 'express';
const app = express();
const PORT = 3001;

app.get("/", function(req, res){
    res.send("Entrei na página principal");
})

app.listen(PORT, function(){
    console.log(`Servidor conectado na porta ${PORT}`)
});