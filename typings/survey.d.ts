import type { FormData } from '@surveytypes';

type SurveyArguments = {
    data: FormData | null;
}

declare global {
    interface Window {
        ModuleSurvey: ({data}: SurveyArguments) => JSX.Element | null;
    }
}