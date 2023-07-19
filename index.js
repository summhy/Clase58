//1.-importamos Express
import express from "express";
//2.-Creamos la constante para la aplicación
const app =express();
const servicios=[{'nombre':'Mochilas', 'precio':10000},
                 {'nombre':'cuadernos', 'precio':1200},
                 {'nombre':'libros','precio':11000},
                 {'nombre':'lápices','precio':500}];

//definición de la carpeta pública en caso de ser necesario
app.use(express.static("public"))

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
    html +=`</ul>`;


    return res.send(html)
})

app.get("/servicio/:id",(req, res)=>{
    const id = req.params.id;
    //enviar respuesta al cliente con un texto simple
    return res.send(`<h1>Servicio ${servicios[id].nombre} $ ${servicios[id].precio}</h1>`)
})



app.all("*",(req, res)=>{
    return res.send(`<h1>Sitio No existe</h1>`)
})
