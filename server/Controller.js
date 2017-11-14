/**
 * this is a test
 */
class Controller {
    constructor(req, res)
    {
        /**
         * adsfasdf asdf
         */
        this.request = req;
        this.response = res;
    }
    
    toJSON(obj){

        this
        .response
        .writeHead(200, {'Content-Type': "application/json"});

    this
        .response
        .end(JSON.stringify(obj), 'utf-8');
    }

    get endPoints (){
        return { 
            GET:{},
            PUT:{},
            post:{},
            delete:{}
        }
     }
}



module.exports=Controller;

