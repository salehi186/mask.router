const Controller = require('../Controller');
const fs = require('fs');
class HomeController extends Controller {
    constructor(req, res) {
        super(req, res);
    }
    index() {
       
        this.response.writeHead(200, {'Content-Type': 'text/html'});
        this.response.end(`Hello World.`, 'utf-8');
    }
    get endPoints() {
        return {
            GET: {
                index: []
            }
        };
    }
}

require('../router').addControler('home', HomeController);
module.exports = HomeController;