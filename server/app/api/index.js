var db = require('../../config/database');

var api = {}

api.adiciona = function(req, res) {
    var page = req.body;
    delete page._id;
    db.insert(page, function(err, newDoc) {
        if(err) return console.log(err);
        console.log('Adicionado com sucesso: ' + newDoc._id);
        res.json(newDoc._id);
    });  
};

api.busca = function(req, res) {
   db.findOne({slug: req.params.pageSlug }, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.lista = function(req, res) {
    db.find({}).sort({titulo: 1}).exec(function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.atualiza = function(req, res) {
    console.log('Parâmetro recebido:' + req.params.pageSlug);
    db.update({slug : req.params.pageSlug }, req.body, function(err, numReplaced) {
        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });  
};

api.remove = function(req, res) {
    db.remove({ slug: req.params.pageSlug }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });
};

module.exports = api;