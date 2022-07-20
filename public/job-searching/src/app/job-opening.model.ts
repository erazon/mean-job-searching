export class JobOpening {
    #_id!: string;
    #title!: string;
    #salary!: number;
    #description!: string;
    #experience!: string;
    #skills!: [string];
    #postDate!: string;
    
    get _id(){return this.#_id;};
    get title(){return this.#title;};
    get salary(){return this.#salary;};
    get description(){return this.#description;};
    get experience(){return this.#experience;};
    get skills(){return this.#skills;};
    get postDate(){return this.#postDate;};
}
