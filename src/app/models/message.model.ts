export class Message{
    constructor(
        public  id: number, 
        public  senderId: number,
        public  receiverId: number,
        public  messageContent: string,
        public  date :Date
    ){}
}