const express = require("express");
const Accounts = require("./accounts-model")
const router = express.Router()

const { 
  checkAccountPayload,
  checkAccountNameUnique, 
  checkAccountId } = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll();
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
    res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const account = await Accounts.create({ name: req.body.name.trim(), budget: req.body.budget });
    res.status(201).json(account)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{
    const newDetails = await Accounts.updateById(req.params.id, req.body);
    res.json(newDetails);
  }catch(err){
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    await Accounts.deleteById(req.params.id);
    res.json(req.account);
  }catch(err){
    next(err)
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
