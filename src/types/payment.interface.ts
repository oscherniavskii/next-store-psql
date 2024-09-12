interface AmountPayment {
	value: string;
	currency: string;
}

interface ObjectPayment {
	id: string;
	status: string;
	amount: AmountPayment;
	payment_method: {
		type: string;
		id: number;
		saved: boolean;
		title: string;
		card: object;
	};
	create_at: string;
	expires_at: string;
	description: string;
}

export interface PaymentStatusData {
	event:
		| 'payment.succeeded'
		| 'payment.waiting_for_capture'
		| 'payment.canceled'
		| 'refund.succeeded';
	type: string;
	object: ObjectPayment;
}

interface Amount {
	value: string;
	currency: string;
}

interface Recipient {
	account_id: string;
	gateway_id: string;
}

interface PaymentMethod {
	type: string;
	id: string;
	saved: boolean;
}

interface Confirmation {
	type: string;
	return_url: string;
	confirmation_url: string;
}

export interface IPaymentResponse {
	id: string;
	status: string;
	amount: Amount;
	recipient: Recipient;
	payment_method: PaymentMethod;
	created_at: Date;
	confirmation: Confirmation;
}
