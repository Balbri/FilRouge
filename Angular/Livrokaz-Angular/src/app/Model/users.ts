export class Users {
    constructor(
        public idUser: number,
        public username: string,
        public password: string,
        public enabled: number,
        public authority: string) {}
}
