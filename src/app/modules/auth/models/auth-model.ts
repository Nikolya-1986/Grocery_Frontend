export interface AuthModel {
    id?: string,
    profile: ProfileFormValues;
    passwords: PasswordFormValues;
}
export interface ProfileFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    dateOfBirth: Date;
}

export interface PasswordFormValues {
    password: string;
    confirmPassword?: string;
}