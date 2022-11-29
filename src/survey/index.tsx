import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { FormPageComponent } from './views/FormPageComponent';
import { FormWelcomeComponent } from './views/FormWelcomeComponent';
import type { FormData, FormInputTypes } from './formtypes';
import Cookies from 'universal-cookie';
import { FormSummaryComponent } from './views/FormSummaryComponent';

type SurveyArguments = {
    data: FormData | null;
}

type SurveyData = {
    [key: string]: string | string[];
}

const cookies = new Cookies();

export function Survey({data}: SurveyArguments) {
    if (!data) { return null;}

    // const [surveyResults, setSurveyResults] = useState<Map<string, string>>(new Map());
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const form = data.form;
    const cookieName = `surveyresults_${form.id}`;
    
    const [surveyState, setSurveyState] = useState<SurveyData>(cookies.get(cookieName) ?? {});
    // I'll only show the welcome page if the object is still blank, that means it's never been visited

    const onPrevButton = () => {
        console.log('back');
        setCurrentPageIndex((prevValue) => prevValue - 1)
    }

    const onNextButton = () => {
        setCurrentPageIndex((prevValue) => {console.log(prevValue + 1); return prevValue + 1;});
    }

    useEffect(() => {
        cookies.set(cookieName, surveyState);
    }, [surveyState]);

    const onDataUpdate = ({id, value, type}: {id: string, value: string, type: FormInputTypes}) => {
        setSurveyState((prevFormData) => {
            let result: string | string[] = value;
            if (type === "checkbox") {
                if (Array.isArray(prevFormData?.[id])){
                    const prevData = prevFormData[id] as string[];
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
                [id]: result,
            }
        });
    }

    // // Need to receive state of form to know from where we left from

    return (
        <div className='surveyWidget'>
            <div className='pageContainer'>
                { currentPageIndex ? 
                    (currentPageIndex === form.pages.length + 1 
                        ? <FormSummaryComponent /> 
                        : <FormPageComponent 
                            page={form.pages[currentPageIndex - 1]} 
                            results={surveyState} 
                            handleInputUpdate={onDataUpdate} 
                            handlePrev={currentPageIndex - 1 ? onPrevButton : undefined} 
                            handleNext={onNextButton} />) 
                        : <FormWelcomeComponent title={form.title} welcome={form.welcome} handleStart={onNextButton} />
                }
            </div>
        </div>
    )
}

export {Survey as default};