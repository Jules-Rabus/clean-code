export default class Immatriculation {
    public readonly value: string;
  
    public constructor(value: string) {
      if (!this.validate(value)) {
        throw new Error("Invalid Immatriculation : ${value}");
      }
      this.value = value;
    }
  
    public validate(value: string): boolean {
      const immatriculationRegex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;
      return immatriculationRegex.test(value);
    }
  
    public equals(other: Immatriculation): boolean {
      return this.value === other.value;
    }
  
    public static REGEX: RegExp = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;
  }
  