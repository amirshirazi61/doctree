export class Email {
    Body: string;
    Subject: string;
    From: string;
    To: string;
    Attachments: Attachment[];
    DealId: number;
}

export class Attachment {
    FileName: string;
    FileData: string;
    Type: string;
}