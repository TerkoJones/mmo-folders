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
