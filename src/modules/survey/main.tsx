import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { FormPageComponent } from './views/FormPageComponent';
import { FormWelcomeComponent } from './views/FormWelcomeComponent';
import Cookies from 'universal-cookie';
import { FormSummaryComponent } from './views/FormSummaryComponent';
import type { FormData, FormInputTypes } from '@surveytypes';
import type { SurveyState } from './types';
import "./survey.css";

type SurveyArguments = {
    data: FormData | null;
    handleSubmit: (() => void) | undefined;
}

const cookies = new Cookies();

export function Survey({data, handleSubmit}: SurveyArguments) {
    if (!data) { return null;}

    const form = data.form;
    const cookieName = `surveyresults_${form.id}`;
    const cookieDoneName = `surveydone_${form.id}`;
    
    const [surveyState, setSurveyState] = useState<SurveyState>(cookies.get(cookieName) ?? {});

    const onPrevButton = () => {
        setSurveyState(prevState => ({
            ...prevState,
            currentPage: prevState.currentPage - 1,
        }));
    }

    const onNextButton = () => {
        setSurveyState(prevState => ({
            ...prevState,
            currentPage: prevState.currentPage + 1,
        }));
    }

    const onSubmitButton = () => {
        cookies.set(cookieDoneName, true);
        handleSubmit?.();
    }

    // Run once to check if we had an empty object state so that we populate it
    useEffect(() => {
        if (!Object.keys(surveyState).length) {
            setSurveyState(() => {
                const initialState: SurveyState = {
                    currentPage: surveyState.currentPage,
                    results: {},
                };

                form.pages.forEach(page => {
                    page.forEach(field => {
                        /**
                         * For every field, I start up the value with a blank but for a
                         * select, I just take the first value
                         */
                        initialState.results[field.id] = '';
                        switch(field.type) {
                            case 'checkbox':
                                initialState.results[field.id] = [];
                                break;
                            case 'select':
                                if (Array.isArray(field.values)) {
                                    initialState.results[field.id] = field.values[0][0];
                                } else {
                                    initialState.results[field.id] = field.values.from.toString();
                                }
                                break;
                        }
                    })
                });

                return initialState;
            })
        }
    }, []);

    useEffect(() => {
        cookies.set(cookieName, surveyState);
    }, [surveyState]);

    const onDataUpdate = ({id, value, type}: {id: string, value: string, type: FormInputTypes}) => {
        setSurveyState((prevFormData) => {
            let result: string | string[] = value;
            if (type === "checkbox") {
                if (Array.isArray(prevFormData?.results[id])){
                    const prevData = prevFormData.results[id] as string[];
                    const newData = prevData.filter((prevValue) => prevValue !== value);
                    if (prevData.length === newData.length) {
                        newData.push(value);
                    }

                    result = newData;
                } else {
                    result = [value];
                }
            }

            return {
                ...prevFormData,
                results: {
                    ...prevFormData.results,
                    [id]: result,
                }
            }
        });
    }

    // // Need to receive state of form to know from where we left from

    return (
        <div className='surveyWidget'>
            <div className='pageContainer'>
                { surveyState.currentPage ? 
                    (surveyState.currentPage === form.pages.length + 1 
                        ? <FormSummaryComponent formData={data.form} surveyResults={surveyState.results} handlePrev={onPrevButton} handleSubmit={onSubmitButton} /> 
                        : <FormPageComponent 
                            page={form.pages[surveyState.currentPage - 1]} 
                            pageIndex={surveyState.currentPage - 1}
                            results={surveyState.results} 
                            handleInputUpdate={onDataUpdate} 
                            handlePrev={surveyState.currentPage - 1 ? onPrevButton : undefined} 
                            handleNext={onNextButton} />) 
                        : <FormWelcomeComponent title={form.title} welcome={form.welcome} handleStart={onNextButton} />
                }
            </div>
        </div>
    )
}

// If we want this JS file to be available as it is, then we don't treat as a module via import?
window.ModuleSurvey = Survey;
export {Survey as default};