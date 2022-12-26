export interface AuthModel {
    id?: string,
    profile: ProfileFormValues;
    passwords: PasswordFormValues;
};
export interface ProfileFormValues {
    firstName: string;
    lastName: string;
    contacts: ContactsFormValues;
    dateOfBirth: Date;
};

export interface PasswordFormValues {
    password: string;
    confirmPassword?: string;
};

export interface ContactsFormValues {
    email: string;
    phone: number;
};