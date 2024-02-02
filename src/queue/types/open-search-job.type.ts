export class SubscriptionJobType{
    studentId: number
    subscription: {
        bookId: number,
        authorId: number,
        title: string,
        susbscriptionId: number,
        dueDate: string
    }
}
