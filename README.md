# STB_BANK APP
# Development Start Guide

## Pre Requisitos
Tener instalado
    
    Node JS v12 en adelante
    NPM 6+

Instalar serverles by npm

    npm i -g serverless
## Database
Start Database

    docker-compose up mongodb

Stop Database 

   Ctrl + C en la terminal de ejecucion

    docker-compose down -v
## Backend

En la carpeta backend correr el comando:

    npm run start
## Frontend

En la carpeta front end correr el comando:

    npm run dev

# DockerStart Guide
## Requerimientos previos:
    Docker Instalado
    Docker Compose Instalado
    Conexion a Internet

### Cambiar la conexion de la base de datos segun corresponda:

En el archivo .env de la carpeta **"backend"** en la raiz del proyecto:
    
### Docker
    MONGODB_URL=mongodb://mongodb:27017/database
### Desarrollo
    MONGODB_URL=mongodb://localhost:27017/database
### Vercel Deploy
    MONGODB_URL=mongodb+srv://test1:123@cluster0.e2axf.mongodb.net/database?retryWrites=true&w=majority´´´


### Para buildear las imagenes

    docker-compose build --no-cache

### Start de el sistema

    docker-compose up -d

### Ver logs del sistema

    docker-compose logs -f

### Aplicacion

**Acceder en un navegador web a la url:**
    
    http://localhost:3000

    SuperUsuario: admin@test.com
    Clave: 12345678

### Cliente NoSQL

**En un Navegador acceder a la url**

    http://localhost:58080
    Usuario: admin
    Clave: 1234
    Database: database

### Stop Sistema 

    docker-compose down -v

 ## Docker es la version productiva

## Cliente STB

- [Guillermo Talento]()
## Equipo Anima

- [Katherine Damires Gonzalez](usuario)
- [Andrew Nahuel Martinez Herrera](usuario)
- [Bruno Agustin Dos Santos Rodriguez](usuario)
- [Diego Agustin Ramirez Martinez](usuario)
- [Alejandro Gonzalez Gonzalez](usuario)
- [Jonathan Eduardo Cembranos Fernandez](usuario)
- [Kevin Mora Pais](usuario)
- [Sebastian Agustin Pi Bas](usuario)

## Tutores Globant
 
- [Eva Dathaguy](eva.dathaguy@globant.com)
- [Romina Rodriguez]()
- [Veronica Varela]()
- [Analia Luque]()
- [Marcelo Santamaria](@msantamariaglo)
- [Felipe Cordoves]()
- [Nacho Gomez]()
- [Leo Giovanetti]()

# Links

[ANIMA](https://anima.edu.uy/)

[GLOBANT](http://www.globant.com/)

[STB](https://www.softwaretestingbureau.com/)
