export class Articles {
    public title: string;
    public description: string;
    public link: string;
    public datePub: string;
    public photo: string;

    constructor(title: string, description: string, link: string, datePub: string, photo: string){
        this.title = title;
        this.description = description;
        this.link = link;
        this.datePub = datePub;
        this.photo = photo;
    }
}