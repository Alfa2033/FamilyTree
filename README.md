
# Árbol Genealógico de la caza del dragon

## Tecnologias
***
Lista de tecnologias usadas, es necesario contar con SQL Server y NodeJS:
* [NodeJS](https://nodejs.org/en/) Version 20.15.0 
* [SQL Server](https://www.microsoft.com/es-mx/sql-server/sql-server-2022): Version 2022

# Pasos para poder ejecutar la aplicación 

## Configuración de la base de datos

1. Acceder a la carpeta de DATABASE
2. Ejecutar los comandos del archivo Querys (Creación de tablas y relaciones)
3. Ejecutar cada uno de los otros archivos que contienen los storeprocedures

## Configuracion del servidor
***
1. Crear una base de datos con el nombre que sea mas adecuado
2. Acceder a la ruta del server/src y crear un archivo .env con el nombre development.env, tomando en cuenta como ejemplo el example.env
3. Llenar las variables de entorno del archivo creado

`ENVIRONMENT` Colocar el nombre del archivo (development)

`USER_SQL` Usuario con el que nos vamos a conectar a la base de datos

`PASSWORD` Contraseña del usuario de la base de datos

`SERVER_SQL` Nombre del servidor de la base de datos (localhost)

`DATABASE` Nombre de la base de datos

`SERVER_PORT` Puerto por el que se va a exponer el servidor backend (3000)

`URL_WEB_APP` URL de la aplicacion frontend (http://localhost:5500)

`PORT_SQL` Puerto de comunicación con la base de datos, en caso de ser SQL Server colocar (1433)

4. Una vez que se configuraron las variables de entorno regresar nuevamente al directorio de server (/server) a la altura de los package JSON
5. Ejeuctar los comandos para iniciar el servidor
```
npm install
npm start
```

## Configuracion del frontend
1. Acceder a la ruta de /frontend
2. Ejecutar los comandos
```
npm install
npm start
```

## Authors

- [@Alfa_2033](https://www.github.com/Alfa2033)
