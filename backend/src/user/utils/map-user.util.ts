/* eslint-disable prettier/prettier */
import { User } from "../entities/user.entity";

export function mapExpressUserToAppUser(expressUser: any): User {
  const user = new User();
  user.id = expressUser.id;
  user.firstname = expressUser.firstname;
  user.lastname = expressUser.lastname;
  user.email = expressUser.email;
  user.roles = expressUser.roles;
  return user;
}
