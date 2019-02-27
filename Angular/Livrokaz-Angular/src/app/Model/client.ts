import { Users } from './users';

export class Client {
    constructor(
        public idClient: number,
        public nomClient: string,
        public prenomClient: string,
        public numeroL: number,
        public rueL: string,
        public complementL: string,
        public cpL: number,
        public villeL: string,
        public numeroF: number,
        public rueF: string,
        public complementF: string,
        public cpF: number,
        public villeF: string,
        public emailClient: string,
        public users: Users) {}
}
