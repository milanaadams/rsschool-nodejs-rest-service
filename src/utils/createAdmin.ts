import * as bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export async function createDefaultAdmin() {
  const userRepo = getRepository(User);
  const adminExist = await userRepo.findOne({ login: 'admin' });

  if (adminExist) {
    console.log(adminExist);
    return;
  }

  const adminInfo = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  };

  const adminWithHashedPass = {
    ...adminInfo,
    password: bcrypt.hashSync(adminInfo.password, 10),
  };

  const admin = userRepo.create(adminWithHashedPass);
  const addedAdmin = await userRepo.save(admin);
  console.log('Admin created', addedAdmin);
  return addedAdmin;
}
