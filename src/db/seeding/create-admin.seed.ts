import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../resources/users/user.model';

function hashPass(pass:string) {
  const saltRounds = 10;
  return bcrypt.hashSync(pass, saltRounds);
}

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { login: 'admin', name: 'admin', password: `${hashPass('admin')}` },
      ])
      .execute()
  }
}
