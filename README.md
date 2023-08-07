# **SOCIALUBB**

Es una red social ddirigido a los estudiantes de la UBB, el cual esta enfocado en crear un espacio virtual que promueva la conectividad, colaboración y apoyo entre los estudiantes de la universidad.

## **Software stack**

El proyecto "SOCIALUBB" es una aplicación web que corre sobre el siguiente software

-Ubuntu 20.04
-NodeJS 18.16
-ReactJS 18.2
-ExpressJS 4.18.2
-Mongoose 6.6.5
-MongoDB
-MongoAtlas
-NPM

## **Conexión a la base de datos**

Para obtener un string de conexion de atlas lo primero que se debe hacer es ir a la página de MongoAtlas, se registra y le pedirá que ingrese un nombre y contraseña para una base de datos. Crea la nueva base de datos y luego en el menú de la izquierda selecciona "Clusters" y luego "Connect" y selecciona "Connect your application" y copia el string de conexion. Este string de conexion debe ser para el que se entrega con la siguiente configuracion:

NodeJS
2.2.12 or later
Con esto deberia entregarse un string de conexion tal que asi:

```
mongodb+srv://SocialUbb:<password>@socialubbcluster.n4rqyez.mongodb.net/SocialUbb?retryWrites=true&w=majority
```

Entre las etiquetas < > se debe reemplazar el password por el que se le entrega al crear la base de datos.

Este string de conexion debe ser reemplazado en el archivo .env que se encuentra en la raiz del proyecto, en la variable de entorno DB.

# **DOCKER**

Con una terminal situarse dentro del directorio raiz del proyecto, para esto se debe estar en el mismo directorio donde se hizo el clon del proyecto (branch main) y ejecutar el siguiente comando:

```
cd SocialUbb-Backend
```

Para construir la imagen docker del backend, se debe ejecutar el siguiente comando desde la carpeta raiz del proyecto:

```
docker build -t socialubb-backend . 
```

Una vez creado el contenedor de docker, se debe ejecutar el siguiente comando para correr el contenedor:

```
docker run --rm -ti -p 3000:3000 -v ${pwd}:/home socialubb-backend
```
**pwd: es la ruta del directorio raiz del backend, asi que es importante ejecutar el comando desde la carpeta SocialUbb-Backend como se especifica.**

Luego se debe acceder a la carpeta del proyecto, para esto se debe ejecutar los siguientes comando:

```
cd home
npm install
np run dev
```

Clonación del repositorio 

Para obtener una copia del proyecto se debe clonar el repositorio de GitHub, para esto se debe ejecutar el siguiente comando en la terminal:

PARA CLONAR REPOSITORIO DE BACKEND

```
git clone https://github.com/ClaudiaVillagran/SocialUbb-Backend.git
```

Variables de entorno

Se debe generar un archivo .env en la carpeta backend, el cual debe contener las siguientes variables de entorno:

BACKEND:

```
DB= mongodb+srv://SocialUbb:9RLszlBSkQoXKa50@socialubbcluster.n4rqyez.mongodb.net/SocialUbb?retryWrites=true&w=majority
PORT=80
```

Instalar dependencias del proyecto ambiente de desarrollo

Para instalar las dependencias del proyecto, se debe ejecutar el siguiente comando en la terminal:

Para el correcto funcionamiento del proyecto se deben dar permisos de administrador a la carpeta, para esto se ejecuta el siguiente comando dentro de la carpeta raiz del proyecto:

```
chmod -R 777 .
```

Servidor de producción

Es importante considerar que para el funcionamiento correcto del proyecto deben estar corriendo los proyectos en diferentes servidores donde deberan realizarse los pasos de instalación de dependencias y configuración de variables de entorno.

Para configurar el servidor de producción se debe seguir los siguientes pasos en ambos servidores, frontend y backend:

Iniciar el modo root e ingresar las credenciales de administrador del servidor

```
sudo su
```

Actualizar el sistema operativo

```
apt-get update
```

Instalar curl para descargar paquetes

```
apt-get install -y curl
```

Instalar autoclean para limpiar el sistema

```
apt-get -y autoclean
```

Instalar git para clonar el repositorio

```
apt-get install git
```

Instalar nano para editar archivos

```
apt-get install nano
```

Instalar nvm para instalar NodeJS

```
curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
```

Reiniciar bash para que se puedan utilizar comandos de NVM

```
exec bash
```

Instalar version 18.16.0

```
nvm install 18.16.0
```

cambiar alias de NodeJS

```
nvm alias deafult 18.16.0
```

Cambiar la version de NodeJS

```
nvm use default
```

Instalar yarn para instalar dependencias y pm2 para correr la aplicación

```
npm install -g yarn
npm install -g pm2
```

Clonar el repositorio del proyecto como se menciona en el apartado "Clonación del repositorio"

Luego de haber clonado el repositorio se debe mover hacia la carpeta raiz del proyecto, para esto se debe ejecutar el siguiente comando:

```
cd SocialUbb-Backend
```

Instalar dependencias del proyecto ambiente de producción
Si se encuentra en la carpeta raiz del proyecto y desea instalar las dependencias, se debe ejecutar el siguiente comando:

```
yarn install
```

Para poder ejecutar el proyecto se debe generar el .env en la carpeta raiz del proyecto, el cual debe contener las variables mencionadas anteriormente dependiendo de cual de los proyectos este corriendo, el frontend o el backend. Para generar el .env mediante terminal se debe ejecutar el siguiente comando:

```
touch .env
```

Para modificar el archivo .env se debe ejecutar el siguiente comando:

```
nano .env
```

Dentro del .env, deben exitir dos variables necesarias

PORT=80
DB=<urlDeConexionGeneradaeEnMongoatlas>

Para ejecutar el proyecto se debe ejecutar el siguiente comando en la terminal:

```
pm2 start yarn -- dev
```

para visualizar el backend

```
http://ipservidor:1332
```