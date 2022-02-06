export interface ICommandDetails {
    command: string;
    description: string;
    options: [string,string][];
    action: () => void | Promise<void>;
}