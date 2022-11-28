import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import type { FormPage } from '../formtypes';

type FormPageArguments = {
    page: FormPage;
    handleInputUpdate: Function;
    results: any;
}

export function FormPageComponent({page, handleInputUpdate, results}: FormPageArguments) {
    const handleInput = (event: ChangeEvent) => {
        const inputElement = event.target as HTMLInputElement;
        console.log(inputElement.value);
        handleInputUpdate({id: inputElement.name, value: inputElement.value, type: inputElement.type});
    }

    const fieldRenders = (page.map((inputField) => {
        switch(inputField.type) {
            case "input": {
                return (
                    <div key={inputField.id} className='surveyform--inputtext'>
                        <label htmlFor={inputField.id}>{inputField.label}</label>
                        <input onChange={handleInput} name={inputField.id} type="input" value={results[inputField.id] ?? ''} />
                    </div>
                )
            }
            case "radio": {
                const radiobuttons = inputField.values.map(([key, value]) => (
                    <li key={key}>
                        <input onChange={handleInput} type="radio" id={`${inputField.id}_${key}`} checked={results[inputField.id] === key ? true : false} value={key} name={inputField.id} />
                        <label htmlFor={`${inputField.id}_${key}`}>{value}</label>
                    </li>
                ));
                return (
                    <ul key={inputField.id} className='surveyform--radiobuttons'>
                        {radiobuttons}
                    </ul>
                )
            }
            case "checkbox": {
                const checkboxes = inputField.values.map(([key, value]) => (
                    <li key={key}>
                        <input onChange={handleInput} type="checkbox" id={`${inputField.id}_${key}`} checked={results[inputField.id]?.includes(key) ? true : false}  value={key} name={inputField.id} />
                        <label htmlFor={`${inputField.id}_${key}`}>{value}</label>
                    </li>
                ));
                return (
                    <ul key={inputField.id} className='surveyform--checkboxes'>
                        {checkboxes}
                    </ul>
                )
            }
            case "select": {
                return (<div key={inputField.id} className='surveyform--select'>Select here</div>)
            }
        }
    }));
    

    return (
        <div className='surveyform--inputfields'>
            {fieldRenders}
        </div>
    )
}