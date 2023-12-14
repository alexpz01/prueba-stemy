export default class Pokemon {
  private name: string = "";
  private sprite: string = "";
  private types: string[] = [];

  // Missing a constructor with all the parameters to not have to
  // call the setters after creating the object

  setName(name: string): void {
    this.name = name;
  }

  setSprite(sprite: string): void {
    this.sprite = sprite;
  }

  setTypes(types: string[]): void {
    this.types = types;
  }

  getName(): string {
    return this.name;
  }

  getSprite(): string {
    return this.sprite;
  }

  getTypes(): string[] {
    return this.types;
  }
}
