export interface DonationResponse {
    donationId : string,
    campaignId : string,
    amount : number,
    isAnonymous : boolean,
    donationDate : Date,
    paymentMethod : string,
    transactionId : string,
    paymentStatus : string,
    receiptUrl : string
}