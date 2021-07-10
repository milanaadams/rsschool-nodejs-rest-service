export class CreateUserDto {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserResponse = Pick<CreateUserDto, 'id' | 'name' | 'login'>;
