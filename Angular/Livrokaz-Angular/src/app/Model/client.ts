import { Users } from './users';

export class Client {
    constructor(
        public idClient: number,
        public nomClient: string,
        public prenomClient: string,
        public numeroL: string,
        public rueL: string,
        public complementL: string,
        public cpL: string,
        public villeL: string,
        public numeroF: number,
        public rueF: string,
        public complementF: string,
        public cpF: string,
        public villeF: string,
        public emailClient: string,
        public identifiants: Users) {}
}
