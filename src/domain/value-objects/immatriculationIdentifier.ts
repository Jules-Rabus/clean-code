export class immatriculationIdentifier {

    public readonly value: string;

    public constructor(value: string) {
        if (!this.validate(value)) {
            throw new Error(`Invalid immatriculation ${value}`);
        }
        this.value = value;
    }


    public validate(value: string): boolean {
        const immatriculationRegex = /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/;
        return immatriculationRegex.test(value);
    }

    public equals(other: immatriculationIdentifier): boolean {
        return this.value === other.value;
    }
}