import { FormWelcome } from '../formtypes'

type FormWelcomeComponentArguments = {
    title: string;
    welcome: FormWelcome;
    handleStart: () => void;
}

export function FormWelcomeComponent({title, welcome, handleStart}: FormWelcomeComponentArguments) {
    return (
        <div className='surveryform--welcomepage'>
            <h1>{title}</h1>
            <p>{welcome.description}</p>
            <div className='surveyform--formactions'>
                <button onClick={handleStart} className="button">Start</button>
            </div>
        </div>
    )
}