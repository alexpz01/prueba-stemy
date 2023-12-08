export default class Pokemon {
    private name : string = ""
    private sprite : string = ""
    private types : string[] = []

    setName(name : string) : void {
        this.name = name
    }

    setSprite(sprite : string) : void {
        this.sprite = sprite
    }

    setTypes(types : string[]) : void {
        this.types = types
    }

    getName() : string {
        return this.name
    }
    
    getSprite() : string {
        return this.sprite
    }

    getTypes() : string[] {
        return this.types
    }
 }