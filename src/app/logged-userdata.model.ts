export class UserData {
    private body: boolean;
    private token: string;
    private username: string;

    get _body(){
        return this.body;
    }

    get _token(){
        return this.token;
    }

    get _username(){
        return this.username;
    }

    constructor(body: boolean, token: string, username: string){
        this.body = body;
        this.token = token;
        this.username = username;
    }
}