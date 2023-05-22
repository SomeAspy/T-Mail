export interface Content {
    subject: string;
    text: string;
}

export interface Letter extends Content {
    from: string;
    to: string;
}
