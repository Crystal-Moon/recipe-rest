# Challange Node.js
_API de recetas creada en Node.js, typeOrm y MySQL_

![status](https://img.shields.io/badge/status-OK-green) ![use](https://img.shields.io/badge/use-graphql--apollo-blue)

----

## Deploy
Playground y Docs en [Heroku]()

## Instalacíon
### git clone
Para usos locales ejecutar
```
npm run test
```
Para compilación y ejecución transpilado usar
```
npm run start
```

### conexión
 Para usos locales es necesario crear un archivo  `.env` en la raíz del proyecto, con la siguiente información:
```
# Database
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_PORT=3306
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=
TYPEORM_DATABASE=recipe_rest
TYPEORM_SYNCHRONIZE=true
#TYPEORM_LOGGING=true
TYPEORM_ENTITIES=src/entity/*.js

# Token
JWT_KEY=some_key
```
