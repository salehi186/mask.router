const http = require('http');
const fs = require('fs');
const path = require('path');
const parse = require('url').parse;

let _maskRouter = null;
class maskRouter {

    constructor() {
        ///make a singleton Object
        if (_maskRouter) 
            return _maskRouter;
        else 
            _maskRouter = this;
        this.routes = {};
        // fs.readdir(__dirname+'/controllers/' ,(err,files)=>files.forEach(f=>
        // this.routes[f]=);
    }

    routeHandler(request, response) {
        let url = parse(request.url, true);
        let extname = path.extname(url.pathname);
        let contentType = '';
        switch (extname) {
            case '.html',
                '.htm':
                contentType = 'text/html';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
            case '':

                try {
                    let routePath = url
                        .pathname
                        .match(/([\w.]+)/g) || ['home'];
                    if (this.routes[routePath[0]]) {
                        let controller = new this.routes[routePath[0]](request, response);
                        let action = routePath[1] || 'index';
                        if (controller.endPoints[request.method][action].every(filter => filter())) 
                            controller[routePath[1] || 'index']();
                        return;
                    }
                } catch (ex) {
                    //throw 'Page Not Found';
                    console.log("Error Happened: ")
                    console.log(ex);
                }
                break;
        }
        let filePath =__dirname +'/../client' + request.url;

        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs
                        .readFile('./404.html', function (error, content) {
                            response.writeHead(200, {'Content-Type': contentType});
                            response.end(content, 'utf-8');
                        });
                } else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            } else {
                response.writeHead(200, {'Content-Type': contentType});
                response.end(content, 'utf-8');
            }
        });

    }

    addControler(name, controllerType) {
        console.log(name + ' loaded');
        this.routes[name] = controllerType;
    }

}

module.exports = new maskRouter();