export interface UserModel {
    id?: string,
    profile: ProfileFormValues;
    passwords: PasswordFormValues;
};
export interface ProfileFormValues {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    contacts: ContactsFormValues;
};

export interface PasswordFormValues {
    password: string;
    confirmPassword?: string;
};

export interface ContactsFormValues {
    email: string;
    phone: number;
};