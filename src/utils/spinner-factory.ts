import ora, { Ora } from "ora";

export class SpinnerFactory {
    constructor() { };

    static CreateDefault(input: string): Ora {
        const spinner = ora(input);
        spinner.color = 'magenta';
        spinner.spinner = 'dots8';
        return spinner;
    }
}