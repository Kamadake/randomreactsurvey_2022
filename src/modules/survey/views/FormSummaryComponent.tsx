import type { FormShape, FormValuePair } from '@surveytypes';
import './FormSummaryComponent.css';

type FormSummaryComponentArguments = {
    formData: FormShape;
    surveyResults: any;
    handlePrev: (() => void) | undefined;
    handleSubmit: (() => void) | undefined;
}

export function FormSummaryComponent({formData, surveyResults, handlePrev, handleSubmit}: FormSummaryComponentArguments) {
    const renderResults = formData.pages.flatMap(page => {
        return page.map(field => {
            let result = surveyResults[field.id];
            switch(field.type) {
                case 'radio':
                    result = (field.values.find((value => value[0] === result)) as FormValuePair)[1];
                    break;
                case 'checkbox':
                    result = result.map((checkboxValue: string) => 
                        (field.values.find((value => value[0] === checkboxValue)) as FormValuePair)[1]).join(", ");
                    break;
            }

            return (<div key={field.id} className='surveyform--summary--result'>
                <span className='surveyform--summary--result--label'>{field.label}: </span>
                <span className='surveyform--summary--result--label'>{result}</span>
            </div>)
        })
    });

    return (
        <div className='surveyform--summary'>
            <h1>{formData.title} Summary</h1>
            <div className='surveyform--summarylist'>
                {renderResults}
            </div>
            <div className='surveyform--formactions'>
                <button onClick={handlePrev} className='button'>Go back</button>
                <button onClick={handleSubmit} className='button'>Submit</button>
            </div>
        </div>
    )
}