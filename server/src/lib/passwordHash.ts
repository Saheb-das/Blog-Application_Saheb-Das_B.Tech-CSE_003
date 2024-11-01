import bcrypt from "bcrypt";

/**
 * For hashing password,this function is used
 * @param {String} password - this is user password
 * @param {Number} saltRound - this is number of salt round
 * @returns {String}
 */
async function hashPassword(
  password: String,
  saltRound: number = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password.toString(), salt);
  return hashedPassword;
}

/**
 * For checking that user given password and encrypted password are same or not
 * @param {String} password - this is user password
 * @returns {boolean}
 */
async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password.toString(), hashedPassword);
  return isMatch;
}

export { hashPassword, comparePassword };
