# mmo-folders

## descripción
Permite organizar las rutas de una aplicación mediante funciones ```path.join``` enlazadas con las rutas clave.

## Requerimiento
```javascript
    const folders= require('terkojones/mmo-folders);
```

## API
### función ```folders```
```javascript
    const paths = folders([root][, def]);
```
Devuelve una función principal que genera rutas a partir de los argumentos que se le pasen con las funciones miembro indicadas mediante *def*.

* **root** ```{string}``` Directorio del que parten todas las rutas generadas(p.o. gererará rutas relativas)
* **def** ```{object}``` Objeto de pares *key-pathDef* a partir del cual se generarán las funciones miembro. 
    * **key**: Será la clave que se asigne a la función miembro(que será una funciíon ```path.join``` enlazada con la ruta que se defina mediante *pathDef*).
    * **pathDef**: ```{string}``` definicion de ruta relativa a root a la que se enlazara la función miembro que sigue los siguentes criterios:
        * Si comienza con "/", "\\", "./" o ".\\" seguido de una ruta, generará una ruta relativa a la carpeta indicada en *root*. P.e. ```rsc: '/resources'```, enlazará con *\<root\>/resources*.
        * Si acaba con '/' o '\\' el nombre de la clave será incorporado al final de la ruta. P.e. ```app: '/src/'```, enlazará con *\<root\>/src/app*.
        * Si comienza con un nombre, esté ha de ser el de una de las funciones miembro ya definidas, y la ruta resultante enlazará con ésta. P.e. (siguiendo lo ejemplos previos) ```config:'app/configurations'```, se enlazará con *\<root\>/src/app/configurations*.
        * Si tan sólo se indica el nombre de una de las funciones miembros ya definidas, la ruta resultante será el resultado de concatenar ésta con la clave indicada. P.e. ```database: 'config'```, se enlazará con *\<root\>/src/app/configurations/database*
### contante miembro ```folders.MAIN```
Devuelve la ruta a la carpeta con el punto de entrada a la aplicación.

## función ```paths``` generada por ```folders```
```javascript
    const paths = folders([root][, def]);
    paths(...args)
```
* **args**: {Array\<strings\>} Seciones de ruta que se concatenarán con root para generar una ruta final. Teniendo en cuenta que:
    * Si el primer argumento es la clave de una función miembro, el resto de estos será concatenados mediante dicha función.
    * En otro caso, los argumentos serán concatenados con la ruta indicada en *root*.
### función miembro ```paths.extend```
```javascript
    paths.extend(<key/def>[, pathDef])
```
* **\<key/def\>**: ```{string|object}```
    * Si ```{string}```, clave bajo la cual se generará la función miembro.
    * Si ```{object}```, objeto con definición de funciones miembro tal y como se explica en ```folders```
* **pathDef**: ```{string}´´´, si se pasó key será la definición de la ruta con que se enlazará la función miembro generada según se explica en ```folders```. En otro caso se ignora.

**Nota**: cada definición de ruta crea una nueva función miembro de la principal(```paths```) que es una función ```path.join``` enlazada con la ruta definida.

## Ejemplo
```javascript
// Punto de entrada aplicacion  C:\Users\user\workspace\index.js

const folders = require('../index.js');

const back = folders(folders.MAIN, {
	app: "/",
	config: 'app/cofigurations',
	routes: 'app',
	test: "/test1.1"
});

console.log(back.app("index.js"));
console.log(back("app", "index.js"));
console.log(back.config("database.js"));
console.log(back("pedro", "por", "su", "casa"))
console.log(back.routes("login.js"));
console.log(back.test("demo.js"));

const front = folders({
	lib: "/",
	jquery: 'lib/jquery-3.1.2.js',
	js: 'lib/scripts',
	css: "lib",
	skins: 'css'
});

console.log(front.js("main.js"));
console.log(front("jquery", "customizer", "popup.js"));
console.log(front.css("style.css"));
console.log(front.skins("dark.css"));

// C:\Users\user\workspace\test\app\index.js
// C:\Users\user\workspace\test\app\index.js
// C:\Users\user\workspace\test\app\cofigurations\database.js
// C:\Users\user\workspace\test\pedro\por\su\casa
// C:\Users\user\workspace\test\app\routes\login.js
// C:\Users\user\workspace\test\test1.1\demo.js
// lib\scripts\main.js
// lib\jquery-3.1.2.js\customizer\popup.js
// lib\css\style.css
// lib\css\skins\dark.css
```