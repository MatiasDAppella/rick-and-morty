const http = require("http");
const { getCharacter } = require("./controllers/getCharacter");

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    if (req.url.includes("/rickandmorty/character")){
        let id = req.url.split("/").at(-1)
        return getCharacter(res, id)
    }
    
    return res.writeHead(404, {
        "Content-type": "text/plain"
    }).end("No response")

}).listen(3001, "localhost")