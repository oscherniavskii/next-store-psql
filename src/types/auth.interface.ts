export interface RegistrationFormData {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone?: string;
	deliveryAdress?: string;
	confirmPassword: string;
	policy: boolean;
}

export interface LoginFormData {
	email: string;
	password: string;
}

export interface ChangePasswordFormData {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}
