export interface User {
    id?: string;
    email: string;
    name: string;
    isAdmin: boolean;
    password: string;
    doc?: any;
    favouriteTeamsIds : string[];
  }