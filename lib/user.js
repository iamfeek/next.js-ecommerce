import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { connection } from '../db/connection';

export async function createUser({ name, email, password }) {
  const cryptoPassword = await bcrypt.hashSync(password, 10);

  const user = {
    id: uuidv4(),
    name,
    email,
    password: cryptoPassword,
    createdAt: new Date(),
  };

  await connection('user').insert(user);

  return user;
}

export async function findUser({ email }) {
  return connection('user')
    .select('*')
    .where('email', email)
    .first();
}

export async function validatePassword(user, inputPassword) {
  return bcrypt.compareSync(inputPassword, user.password);
}
