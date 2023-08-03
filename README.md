SOCIALUBB
_________________________________________________________________

Es una red social ddirigido a los estudiantes de la UBB, el cual esta enfocado en crear un espacio virtual que promueva la conectividad, colaboración y apoyo entre los estudiantes de la universidad.

Software stack

El proyecto "SOCIALUBB" es una aplicación web que corre sobre el siguiente software

-Ubuntu 20.04
-NodeJS 18.16
-ReactJS 18.2
-ExpressJS 4.18.2
-Mongoose 6.6.5
-MongoDB
-MongoAtlas
-NPM

Clonación del repositorio 

Para obtener una copia del proyecto se debe clonar el repositorio de GitHub, para esto se debe ejecutar el siguiente comando en la terminal:

PARA CLONAR REPOSITORIO DE BACKEND

git clone https://github.com/ClaudiaVillagran/SocialUbb-Backend.git

PARA CLONAR REPOSITORIO DE FRONTEND

git clone https://github.com/ClaudiaVillagran/SocialUbb-Frontend.git

Variables de entorno

Se debe generar un archivo .env en la carpeta frontend y backend respectivamente, el cual debe contener las siguientes variables de entorno:

BACKEND:

DB= mongodb+srv://SocialUbb:9RLszlBSkQoXKa50@socialubbcluster.n4rqyez.mongodb.net/SocialUbb?retryWrites=true&w=majority
PORT=80

FRONTEND:

cd SocialUbb-Frontend
cd helpers
nano Global.jsx

url:"http://ipservidor:1332/api/"

Instalar dependencias del proyecto ambiente de desarrollo

Para instalar las dependencias del proyecto, se debe ejecutar el siguiente comando en la terminal:

Para el correcto funcionamiento del proyecto se deben dar permisos de administrador a la carpeta, para esto se ejecuta el siguiente comando dentro de la carpeta raiz del proyecto:

chmod -R 777 .

Servidor de producción

Es importante considerar que para el funcionamiento correcto del proyecto deben estar corriendo los proyectos en diferentes servidores donde deberan realizarse los pasos de instalación de dependencias y configuración de variables de entorno.

Para configurar el servidor de producción se debe seguir los siguientes pasos en ambos servidores, frontend y backend:

Iniciar el modo root e ingresar las credenciales de administrador del servidor

sudo su

Actualizar el sistema operativo

apt-get update

Instalar curl para descargar paquetes

apt-get install -y curl

Instalar autoclean para limpiar el sistema

apt-get -y autoclean

Instalar git para clonar el repositorio

apt-get install git

Instalar nano para editar archivos

apt-get install nano

Instalar nvm para instalar NodeJS

curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

Reiniciar bash para que se puedan utilizar comandos de NVM

exec bash

Instalar version 18.16.0

cambiar alias de NodeJS

nvm alias deafult 16.15.0

Cambiar la version de NodeJS

nvm use default

Instalar yarn para instalar dependencias y pm2 para correr la aplicación

npm install -g yarn
npm install -g pm2

Clonar el repositorio del proyecto como se menciona en el apartado "Clonación del repositorio"

Luego de haber clonado el repositorio se debe mover hacia la carpeta raiz del proyecto, para esto se debe ejecutar el siguiente comando:

cd Ceewebapp

Instalar dependencias del proyecto ambiente de producción
Si se encuentra en la carpeta raiz del proyecto y desea instalar las dependencias, se debe ejecutar el siguiente comando:

yarn install

Para poder ejecutar el proyecto se debe generar el .env en la carpeta raiz del proyecto, el cual debe contener las variables mencionadas anteriormente dependiendo de cual de los proyectos este corriendo, el frontend o el backend. Para generar el .env mediante terminal se debe ejecutar el siguiente comando:

touch .env

Para modificar el archivo .env se debe ejecutar el siguiente comando:

nano .env

Para ejecutar el proyecto se debe ejecutar el siguiente comando en la terminal:

pm2 start yarn -- dev

para visualizar el backend

http://ipservidor:1332cd ..
