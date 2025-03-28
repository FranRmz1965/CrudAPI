const http = require("node:http");
const fs = require("node:fs");
const { info } = require("node:console");

var productos;

fs.readFile("./productos.json", "utf8", (err, file) =>{
    
    productos = JSON.parse(file);
    console.log(productos);
});

const puerto = 3000;

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    switch(request.method){
        case "GET":
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify(productos));
        break;
        case "POST":
            request.on("data", info  =>{
                var producto_a_agregar =JSON.parse(info.toString());
                productos.nombres.push(producto_a_agregar.nombre);
                console.log(productos);

                fs.writeFile("./productos.json", JSON.stringify(productos), () =>{
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    
                    var respuesta_post = {
                        "resultado": "Se ha agregado " + producto_a_agregar.nombre + " en la base de datos"
                    }
                    response.end(JSON.stringify(respuesta_post));
                });
            });
        break;
    }

    
});


server.listen(puerto, () =>{
    console.log("Servidor a la escucha en http://localhost:" + puerto);
});