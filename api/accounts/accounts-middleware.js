const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  try{
    if(!name || !budget){
      res.status(400).json({ message: "name and budget are required" })
    }else if (typeof name !== "string"){
      res.status(400).json({ message: "name of account must be a string" })
    }else if(name.trim().length <= 2 || name.trim().length > 100){
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    }else if(typeof budget !== "number"){
      res.status(400).json({ message: "budget of account must be a number" })
    }else if(budget < 0 || budget > 1000000){
      res.status(400).json({ message: "budget of account is too large or too small" })
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const {name} = req.body
  try{
    const checkedName = await Accounts.checkAccountName(name.trim());
    if(!checkedName){
      next();
    }else {
      res.status(400).json({ message: "that name is taken" })
    }
  }catch(err){
    next(err);
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id);
  try{
    if(!account){
      res.status(404).json({ message: "account not found" })
    }else{
      req.account = account;
      next();
    }
  }catch(err){
    next(err);
  }
}
