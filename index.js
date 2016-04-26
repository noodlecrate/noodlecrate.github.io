"use strict";
var Express = require("express");
var http = require("http");
var app = Express();
app.set("port", process.env.PORT || 69);
app.use(Express.static("public"));
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
//# sourceMappingURL=index.js.map