declare module "@surveytypes" {
    export type FormValuePair = [key: string, value: string | number];

    export type FormInputTypes = "input" | "select" | "radio" | "checkbox";

    export type FormCheckbox = FormBase & {
        type: "checkbox";
        values: FormValuePair[];
        options: {
            includeOtherInput: boolean;
        }
    }

    export type FormRadio = FormBase & {
        type: "radio";
        values: FormValuePair[];
    }

    export type FormSelect = FormBase & {
        type: "select";
        values: {
            from: number;
            to: number;
        } | FormValuePair[];
    }

    export type FormInput = FormBase & {
        type: "input";
    }


    export type FormBase = {
        id: string;
        label: string;
        type: FormInputTypes;
        required?: boolean;
    }

    export type FormField = (FormInput | FormRadio | FormCheckbox | FormSelect);

    export type FormPage = FormField[];

    export type FormWelcome = {
        description: string;
    }

    export type FormShape = {
        timeBeforeVisibleInSeconds: number;
        id: string;
        title: string;
        welcome: FormWelcome;
        pages: FormPage[]; 
    }

    export type FormData = {
        form: FormShape;
    };
}