export interface EmailContent {
    subject: string;
    text: string;
}

export interface Letter extends EmailContent {
    from: string;
    to: string;
}
