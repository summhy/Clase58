//1.-importamos Express
import express from "express";
//importar body-parse para lectura del formulario
import bodyParser from "body-parser";

import axios from "axios";
//2.-Creamos la constante para la aplicación
const app =express();


const servicios=[{'nombre':'Mochilas', 'precio':10000},
                 {'nombre':'cuadernos', 'precio':1200},
                 {'nombre':'libros','precio':11000},
                 {'nombre':'lápices','precio':500}];

//definición de la carpeta pública en caso de ser necesario
app.use(express.static("public"))
//uso de body parse 
app.use(bodyParser.urlencoded({ extended: false }));

//función de mensaje
function mensaje(){
    console.log("Escuchando en el puerto 3000");
}

//3.-evento de escucha de servicio activo, y callback
app.listen(3000, mensaje())


//4.-ruta metodo get, para la raiz del proyecto
//callback para recibir request y response
app.get("/",(req, res)=>{
    //enviar respuesta al cliente pagina index.html
    return res.render("index")
})

app.get("/contactos",(req, res)=>{
    //enviar respuesta al cliente con un texto simple
    return res.send("<h1>Contacto</h1>")
})

app.get("/servicios",(req, res)=>{
    //enviar respuesta al cliente con un texto simple
    let html = `<ul>`;
    for (let i=0 ;i < servicios.length;i++){
        html += `<li><a href='/servicio/${i}'>${servicios[i].nombre}</a></li>`
    }
    html +=`</ul>
    <form method='post' action='/servicio'>
    <input name="id" type="text" placeholder="id">
    <input name="nombre" type="text"  placeholder="nombre">
    <input value="Buscar" type="submit">
    </form>`;


    return res.send(html)
})

app.get("/servicio/:id",(req, res)=>{
    const id = req.params.id;
    //enviar respuesta al cliente con un texto simple
    return res.send(`<h1>Servicio ${servicios[id].nombre} $ ${servicios[id].precio}</h1>`)
})
app.post("/servicio",(req, res)=>{
    console.log(req.body);
    //console.log(req.params);
    const id = req.body.id;
    //enviar respuesta al cliente con un texto simple
    return res.send(`<h1>Servicio ${servicios[id].nombre} $ ${servicios[id].precio}</h1>`)
})

app.get('/api', async (req, res) => {
    try {
        //para obtener key https://www.marvel.com/signin?referer=https%3A%2F%2Fdeveloper.marvel.com%2Faccount
      const response = await axios.get('https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=xxxxxxxx&hash=xxxxxx');
      res.send(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });

app.all("*",(req, res)=>{
    return res.send(`<h1>Sitio No existe</h1>`)
})
