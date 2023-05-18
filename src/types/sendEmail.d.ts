export interface Content {
    subject: string;
    body: string;
}

export interface Letter extends Content {
    from: string;
    to: string;
}
