import {Label} from '@/components/ui/label';
import {ReactNode} from 'react';
import {FieldError} from 'react-hook-form';

interface Props {}

interface TextInputType {
    name: string;
    label: string;
    className?: string;
    fieldError?: FieldError;
    children: ReactNode;
}

const FormField = ({name, label, className, fieldError, children}: TextInputType) => {
    return (
        <div className={`col ${className}`}>
            <Label htmlFor={name} className="ctrl-label">
                {label}
                {fieldError && (
                    <span className="text-red-700 text-sm ml-1" title={fieldError.message}>
                        <i className="fad fa-exclamation-triangle animate-bounce" />
                    </span>
                )}
            </Label>
            {children}
        </div>
    );
};

export default FormField;
