import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {FieldError, UseFormRegisterReturn} from 'react-hook-form';

interface TextInputType {
    name: string;
    label: string;
    type?: string;
    divClassName?: string;
    inputClassName?: string;
    register?: UseFormRegisterReturn;
    fieldError?: FieldError;
}

const TextInput = ({name, type, label, divClassName, inputClassName, register, fieldError, ...rest}: TextInputType) => {
    return (
        <div className={`col ${divClassName}`}>
            <Label htmlFor={name} className="ctrl-label">
                {label}
                {fieldError && (
                    <span className="text-red-700 text-sm ml-1" title={fieldError.message}>
                        <i className="fad fa-exclamation-triangle animate-bounce" />
                    </span>
                )}
            </Label>
            <Input
                id={name}
                type={type || 'text'}
                className={`bg-slate-50 ${inputClassName}`}
                autoComplete="false"
                {...(register ? register : {})}
                {...rest}
            />
        </div>
    );
};

export default TextInput;
