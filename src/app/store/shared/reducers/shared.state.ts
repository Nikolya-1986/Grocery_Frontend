export interface SharedFeatureState {
    isPreloader: boolean;
    errorMessage: string;
};

export const initialSharedState: SharedFeatureState = {
    isPreloader: false,
    errorMessage: '',
};

export default interface DefaultSharedState {
    shared: SharedFeatureState,
};