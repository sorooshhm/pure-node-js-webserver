const http = require("http");
const client = require("./db");
(async function () {
  await client.connect();
  console.log("Db connected");
})();

const methods = {
  get(path, controller) {
    let route = {};
    if (path.includes(":")) {
      let arr = path.split("/");
      arr.shift();
      let parmsArr = arr.filter((i) => i.includes(":"));
      route.params = [];
      parmsArr.map((i, index) => {
        route.params.push({ name: i.slice(1), index: arr.indexOf(i) });
      });
      path = path.replaceAll(/:[a-z]+/g, "[\\w]+");
      path = new RegExp(path);
      route.regexp = true;
    }
    route.path = path;
    route.controller = controller;
    route.method = "GET";
    app.routes.push(route);
  },
  post(path, controller) {
    let route = {};
    if (path.includes(":")) {
      let arr = path.split("/");
      arr.shift();
      let parmsArr = arr.filter((i) => i.includes(":"));
      route.params = [];
      parmsArr.map((i, index) => {
        route.params.push({ name: i.slice(1), index: arr.indexOf(i) });
      });
      path = path.replaceAll(/:[a-z]+/g, "[\\w]+");
      path = new RegExp(path);
      route.regexp = true;
    }
    route.path = path;
    route.controller = controller;
    route.method = "POST";
    app.routes.push(route);
  },
  put(path, controller) {
    let route = {};
    if (path.includes(":")) {
      let arr = path.split("/");
      arr.shift();
      let parmsArr = arr.filter((i) => i.includes(":"));
      route.params = [];
      parmsArr.map((i, index) => {
        route.params.push({ name: i.slice(1), index: arr.indexOf(i) });
      });
      path = path.replaceAll(/:[a-z]+/g, "[\\w]+");
      path = new RegExp(path);
      route.regexp = true;
    }
    route.path = path;
    route.controller = controller;
    route.method = "PUT";
    app.routes.push(route);
  },
  delete(path, controller) {
    let route = {};
    if (path.includes(":")) {
      let arr = path.split("/");
      arr.shift();
      let parmsArr = arr.filter((i) => i.includes(":"));
      route.params = [];
      parmsArr.map((i, index) => {
        route.params.push({ name: i.slice(1), index: arr.indexOf(i) });
      });
      path = path.replaceAll(/:[a-z]+/g, "[\\w]+");
      path = new RegExp(path);
      route.regexp = true;
    }
    route.path = path;
    route.controller = controller;
    route.method = "DELETE";
    app.routes.push(route);
  },
};
const app = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let originWrite = res.write;
  res.write = function (data) {
    return originWrite.call(
      this,
      typeof data == "object" ? JSON.stringify(data) : data
    );
  };
  const { url, method } = req;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    req.body = body ? JSON.parse(body) : {};
    const route = app.routes.find((r) => {
      console.log(r);
      if (r.regexp) {
        if (
          url.match(r.path) &&
          method == r.method &&
          url.match(r.path)[0] == url
        ) {
          let arr = url.split("/");
          let params = {};
          r.params.map((p) => {
            params[p.name] = arr[p.index + 1];
          });
          req.params = params;

          return r;
        }
      }
      if (url == r.path && method == r.method) {
        return r;
      }
    });
    if (route) {
      return route.controller(req, res);
    }
    res.statusCode = 404;
    res.write({ message: "Not Found" });
    res.end();
  });
});
app.routes = [];
Object.assign(app, methods);

module.exports = { app };
