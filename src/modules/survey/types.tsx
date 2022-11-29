export type SurveyState = {
    currentPage: number;
    results: {
        [key: string]: string | string[];
    }
}