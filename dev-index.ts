var liveServer = require("live-server");

var params = {
    port: 69,
    root: "./public",
    file: "index.html",
    wait: 500,
    mount: [['/node_modules', './node_modules']],
    logLevel: 2
};

liveServer.start(params);

console.log("Dev server starting on port " + params.port);
