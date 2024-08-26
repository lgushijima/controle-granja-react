import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Control, Controller, FieldError, FieldValues, Path} from 'react-hook-form';

interface SelectBoxTextValueType {
    value: string;
    text: string;
}
interface SelectBoxType<T extends FieldValues> {
    name: Path<T>;
    label: string;
    subtitle: string;
    defaultValue: any;
    divClassName?: string;
    fieldError?: FieldError;
    control?: Control<T>;
    formatValue?: (value: any) => string;
    onValueChange?: (value: string) => any;
    items: Array<SelectBoxTextValueType>;
}

const SelectBox = <T extends FieldValues>({
    name,
    label,
    items,
    defaultValue,
    subtitle,
    divClassName,
    control,
    fieldError,
    formatValue,
    onValueChange,
}: SelectBoxType<T>) => {
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

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue || ''}
                render={({field}) => (
                    <Select
                        value={formatValue ? formatValue(field.value) : field.value}
                        onValueChange={value => {
                            if (typeof onValueChange === 'function') return field.onChange(onValueChange(value));
                            else return field.onChange(value);
                        }}>
                        <SelectTrigger id={name} className={`bg-slate-50`}>
                            <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{subtitle}</SelectLabel>
                                {items.map(i => (
                                    <SelectItem key={i.value} value={i.value}>
                                        {i.text}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
    );
};

export default SelectBox;
