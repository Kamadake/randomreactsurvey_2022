import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import type { FormCheckbox, FormInput, FormInputTypes, FormPage, FormRadio, FormSelect } from '../formtypes';

type FormPageArguments = {
    page: FormPage;
    results: any;
    handleInputUpdate: (Object: {id: string, value: string, type: FormInputTypes}) => void;
    handlePrev: (() => void) | undefined;
    handleNext: (() => void) | undefined;
}

export function FormPageComponent({page, results, handleInputUpdate, handlePrev, handleNext}: FormPageArguments) {
    const handleInput = (event: ChangeEvent) => {
        const inputElement = event.target as HTMLInputElement;
        console.log(inputElement.value);
        handleInputUpdate({id: inputElement.name, value: inputElement.value, type: inputElement.type as FormInputTypes});
    }

    const fieldRenders = (page.map((inputField) => {
        switch(inputField.type) {
            case "input": {
                inputField as FormInput;
                return (
                    <div key={inputField.id} className='surveyform--inputtext'>
                        <label htmlFor={inputField.id}>{inputField.label}</label>
                        <input onChange={handleInput} name={inputField.id} type="input" value={results[inputField.id] ?? ''} />
                    </div>
                )
            }
            case "radio": {
                inputField as FormRadio;
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
                inputField as FormCheckbox;
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
                inputField as FormSelect;
                let selectOptions;
                if (Array.isArray(inputField.values)) {
                    selectOptions = inputField.values.map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))
                } else {
                    const {to, from} = inputField.values;
                    selectOptions = [...Array(to - from + 1).keys()].map((value, index) => {
                        const numValue = from + index;
                        return (
                            <option key={numValue} value={numValue}>{numValue}</option>
                        )
                    });
                } 
                return (
                    <div key={inputField.id} className='surveyform--select'>
                        <label>{inputField.label}</label>
                        <select onChange={handleInput} name={inputField.id} value={results[inputField.id] ?? ''}>
                            {selectOptions}
                        </select>
                    </div>
                )
            }
        }
    }));
    

    return (
        <div className='surveyform--inputfields'>
            {fieldRenders}
            <div className='surveyform--formactions'>
                <button onClick={handlePrev} disabled={handlePrev ? false : true}  className='button'>Prev</button>
                <button onClick={handleNext} className='button'>Next</button>
            </div>
        </div>
    )
}