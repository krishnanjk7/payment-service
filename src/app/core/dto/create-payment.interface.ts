export interface CreatePayment {
    creditCardNumber: string;
    cardholder: string;
    expirationDate: string;
    securityCode: string;
    amount: number;
}