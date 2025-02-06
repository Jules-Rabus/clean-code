export default class VinIdentifier {

    public readonly value: string;

    public constructor(value: string) {
        if (!this.validate(value)) {
            throw new Error('Invalid VIN : ${value}');
        }
        this.value = value;
    }

    public validate(value: string): boolean {
        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
        return vinRegex.test(value);
    }

    public equals(other: VinIdentifier): boolean {
        return this.value === other.value;
    }

    public static REGEX: RegExp = /^[A-HJ-NPR-Z0-9]{17}$/;
}