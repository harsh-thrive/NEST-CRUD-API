const SubscriptionMapping = {
    mappings: {
        properties: {
            studentId : {
                type: 'long'
            },
            subscription: {
                type: 'nested',
                properties: {
                    title: 'keyword',
                    authorId: 'long',
                    bookId: 'long',
                    subscriptionId: 'long',
                    dueDate: 'date'
                }
            }
        }
    }
}