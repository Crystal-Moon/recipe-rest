# Challange Node.js
_API de recetas creada en Node.js, typeOrm y MySQL_

![status](https://img.shields.io/badge/status-OK-green) ![used](https://img.shields.io/badge/used-graphql--apollo-blue)

----

## Deploy
Playground y Docs en [Heroku](https://challange-recipe.herokuapp.com/)

## Instalacíon
### git clone
Para usos locales con nodemon use:
```
npm run test
```
Para compilación y ejecución transpilado use:
```
npm run start
```

### conexión
 Para usos locales es necesario crear un archivo  `.env` en la raíz del proyecto, con la siguiente información: (modifique las credenciales que crea necesario)
```
# Database credentials
TYPEORM_HOST=localhost
TYPEORM_PORT=3306
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=pass
TYPEORM_DATABASE=database_name

# Database config
TYPEORM_CONNECTION=mysql
TYPEORM_SYNCHRONIZE=true
#TYPEORM_LOGGING=true

# Use with 'npm run test'
#TYPEORM_ENTITIES=src/entity/*.js
# Or use with 'npm run start'
TYPEORM_ENTITIES=build/entity/*.js

# Token
JWT_KEY=some_key
```
