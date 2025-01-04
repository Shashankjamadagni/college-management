const {userSchema, registerUser} = require("../models/user");

async function registerUserController(req, res, next) {

  const validatedUser = userSchema.validate(req.body);
  if (validatedUser.error) {
    return res.status(400).json({ error: validatedUser.error.details[0].message });
  }

  const newUser = await registerUser(validatedUser.value);

  delete newUser.password;

  return res.status(201).json(newUser);

}

module.exports = {
  registerUserController
}
