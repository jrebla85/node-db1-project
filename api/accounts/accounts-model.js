const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
}

const getById = id => {
  return db("accounts").where("id", id).first();
}

const create = async ({ name, budget }) => {
  const [id] = await db("accounts").insert({ name, budget });
  return getById(id);
}

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return getById(id);
}

const deleteById = async id => {
  return db("accounts").where("id", id).delete();
  
  // const deletedAccount = await getById(id);
  // await db("accounts").where("id", id).delete();
  // return deletedAccount;
}

const checkAccountName = async (name) => {
  const account = await db("accounts").where("name", name).first();
  return account
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkAccountName,
}
