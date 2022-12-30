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
    favoriteFoods: FavoriteFoodsFormValues;
};

export interface PasswordFormValues {
    password: string;
    confirmPassword?: string;
    codeQuestion: CodeQuestionFormValues;
};
export interface ContactsFormValues {
    email: string;
    phone: number;
};

export interface FavoriteFoodsFormValues {
    foods: string[];
};

export interface CodeQuestionFormValues {
    codeQuestion: string,
    answer: string;
    significance: number;
}