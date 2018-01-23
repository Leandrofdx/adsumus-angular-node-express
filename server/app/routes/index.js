var api = require('../api'),
    path = require('path');

module.exports  = function(app) {
    
    app.route('/pages')
        .post(api.adiciona)
        .get(api.lista);

    app.route('/pages/:pageSlug')
        .delete(api.remove)
        .get(api.busca)
        .put(api.atualiza);
       
    app.all('/*', function(req, res) {
        res.sendFile(path.join(app.get('clientPath'), '/'));
        
    });

};