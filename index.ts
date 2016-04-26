import * as Express from "express";
import * as http from "http";

let app = Express();

app.set("port", process.env.PORT || 69);
app.use(Express.static("public"));
app.use("/node_modules", Express.static("node_modules"));


http.createServer(app).listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
