import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { FormPageComponent } from './views/FormPageComponent';
import type { FormData, FormInputTypes } from './formtypes';
import Cookies from 'universal-cookie';

type SurveyArguments = {
    data: FormData | null;
}

type SurveyData = {
    [key: string]: string | string[];
}

const cookies = new Cookies();
const cookieName = "yield-surveyform";

export function Survey({data}: SurveyArguments) {
    if (!data) { return null;}

    // const [surveyResults, setSurveyResults] = useState<Map<string, string>>(new Map());
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
    const form = data.form;
    
    const [surveyState, setSurveyState] = useState<SurveyData>(cookies.get(cookieName) ?? {});

    const onPrevButton = () => {
        console.log('back');
        setCurrentPageIndex((prevValue) => (prevValue) === 0 ? prevValue : prevValue - 1)
    }

    const onNextButton = () => {
        console.log('next');
        setCurrentPageIndex((prevValue) => (prevValue + 1) === form.pages.length ? prevValue : prevValue + 1)
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
                <FormPageComponent page={form.pages[currentPageIndex]} results={surveyState} handleInputUpdate={onDataUpdate} />
            </div>
            <div className='surveyform--formactions'>
                <button onClick={onPrevButton} className='button' disabled={currentPageIndex === 0 ? true : false}>Prev</button>
                <button onClick={onNextButton} className='button'>Next</button>
            </div>
        </div>
    )
}

export {Survey as default};