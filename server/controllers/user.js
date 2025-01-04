const {userSchema, registerUser, getUserByQueryAndOptions, validatePassword, generateToken} = require("../models/user");

async function registerUserController(req, res, next) {

  try {
    const validatedUser = userSchema.validate(req.body);
    if (validatedUser.error) {
      return res.status(400).json({ error: validatedUser.error.details[0].message });
    }

    const newUser = await registerUser(validatedUser.value);

    delete newUser.password;

    return res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }

    throw error;
  }

}

async function loginUserController(req, res, next) {

  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({error: "Email and password are required"});
  }

  const user = await getUserByQueryAndOptions({email});

  if(!user) {
    return res.status(404).json({error: "User not found"});
  }

  const isPasswordValid = await validatePassword(password, user.password);

  if(!isPasswordValid) {
    return res.status(400).json({error: "Invalid password"});
  }

  const token = await generateToken(user);

  delete user.password;

  return res.status(200).json({
    token,
    user
  });

}

module.exports = {
  registerUserController,
  loginUserController
}
