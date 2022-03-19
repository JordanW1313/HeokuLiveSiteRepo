import http from 'http';
import fs from 'fs';
import mime from 'mime-types';
let lookup = mime.lookup; //ALIAS

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    let path = req.url as string;
    if(path == "/" || path == "/home")
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)) as string;

    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            res.writeHead(404);
            res.end("ERROR: 404 - File Not Found!" + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff")
        res.writeHead(200, {'Content-Type': mime_type});
        res.end(data);
    });
});

server.listen(port, () => {
  console.log(`Server running at Port:${port}/`);
});