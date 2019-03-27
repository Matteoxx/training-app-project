export class Measurement {
    private name: string;
    private progress: string;
    private size: string;

    get _name(){
        return this.name;
    }

    get _progress(){
        return this.progress;
    }

    get _size(){
        return this.size;
    }

    constructor(name: string, progress: string, size: string){
        this.name = name;
        this.progress = progress;
        this.size = size;
    }
}