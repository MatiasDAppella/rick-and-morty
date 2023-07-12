const http = require("http");
const data = require("./utils/data.js");

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    if (RegExp("/rickandmorty/character").test(req.url)){
        let id = Number(req.url.split("/").pop())

        if (data.some(e => e.id === id)){
            res.writeHead(200, {
                "Content-type": "application/json"
            })
    
            return res.end(JSON.stringify(data.filter(e => e.id === id)))
        }

        res.writeHead(404, {
            "Content-type": "text/plain"
        })
        return res.end("Character not found")
    }

}).listen(3001, "localhost")