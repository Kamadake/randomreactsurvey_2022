import type { FormData } from '@surveytypes';

type SurveyArguments = {
    data: FormData | null;
    handleSubmit: (() => void) | undefined;
}

declare global {
    interface Window {
        ModuleSurvey: ({data, handleSubmit}: SurveyArguments) => JSX.Element | null;
    }
}