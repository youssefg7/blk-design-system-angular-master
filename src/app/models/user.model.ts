import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor( name: string, email: string, password: string, isAdmin: boolean) {}

    toString(): string {
        return ('User: ' + this.name + ', ' + this.email);
    }

}

export const userConverter = {
    toFirestore(user: User): DocumentData {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
            };
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
        const data = snapshot.data(options)!;
        return new User(data.name, data.email, data.password, data.isAdmin);
      }
};
