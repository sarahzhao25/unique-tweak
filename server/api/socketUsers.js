const Router = require('express').Router();

Router.get('/', (req, res, next) => {
  res.json(req.session.users);
})

Router.post('/', (req, res, next) => {
  req.session.users.push(req.body.name)
  res.json(req.session.users);
})

Router.delete('/:name', (req, res, next) => {
  req.session.users.filter(user => user !== req.params.name);
  res.json(req.session.users);
})

module.exports = Router;
