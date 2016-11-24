import Auth from '../middlewares/authorization.js';

var Todo = require("../models/todo");

var appRouter = function(app) {
  app.post("/api/save", function(req, res) {
     if(!req.body.firstname) {
         return res.status(400).send({"status": "error", "message": "A firstname is required"});
     } else if(!req.body.lastname) {
         return res.status(400).send({"status": "error", "message": "A lastname is required"});
     } else if(!req.body.email) {
         return res.status(400).send({"status": "error", "message": "A email is required"});
     }
     Todo.save(req.body, function(error, result) {
         if(error) {
             return res.status(400).send(error);
         }
         res.send(result);
     });
 });

app.get("/api/getByDocumentId/:id", function(req, res) {
    if(!req.params.id) {
        return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    Todo.getByDocumentId(req.params.id, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});

app.delete("/api/delete/:id", function(req, res) {
  console.log(req.params.id);
    if(!req.params.id) {
        return res.status(400).send({"status": "error", "message": "A document id is required"});
    }
    Todo.delete(req.params.id, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});

app.get("/api/getAll", function(req, res) {
  console.log("passe");
    Todo.getAll(function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.send(result);
    });
});
};
module.exports = appRouter;
