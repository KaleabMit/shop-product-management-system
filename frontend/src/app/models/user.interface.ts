export type UserRoles = 'Admin' | 'Reader' | 'BookProvider' | 'Moderator';
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    passwordConfirm?: string;
    roles?: UserRoles;
    username?:string;

}