export class user {
    id?:number;
    username?:string;
    pokemon?: Array<string>;


    constructor(id:number,username:string,pokemon:Array<string>){
        this.id = id;
        this.username = username;
        this.pokemon = pokemon;
    }
}