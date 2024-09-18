import { SyntheticEvent, useState } from "react";
import { InputType, inputs } from "../../inputs";
import { Input } from "../input";
import { TextArea } from "../text-area";

const defaultFormValues = inputs.reduce((acc, curr, i) => {
    acc[i] = curr.value || curr.default_value || "";

    return acc;
}, {} as { [key: string]: InputType["value"] });

const defaultErrors = Object.keys(defaultFormValues).reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
}, {} as { [key: string]: boolean });

export const Form = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [errors, setErrors] = useState(defaultErrors);
    const [showValues, setShowValues] = useState(false);

    const onSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        if (!Object.values(errors).some((val) => val)) {
            setShowValues(!showValues);
        }
    };

    const onChange = (
        field: string,
        value: string | number,
        validationRegExp?: RegExp
    ) => {
        if (
            validationRegExp &&
            typeof value === "string" &&
            !validationRegExp.test(value)
        ) {
            setErrors({ ...errors, [field]: true });
        } else {
            setErrors({ ...errors, [field]: false });
        }

        setFormValues({ ...formValues, [field]: value });
    };

    const onCheckboxChange = (field: string, value: boolean) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    const renderInput = (
        { type, options, validation, value, default_value }: InputType,
        i: number
    ) => {
        if (typeof value === "boolean" || typeof default_value === "boolean") {
            return (
                <label className="text-white text-lg flex gap-8 items-center">
                    <input
                        type="checkbox"
                        name={String(i)}
                        checked={formValues[i] as boolean}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onCheckboxChange(String(i), e.target.checked)
                        }
                        className="size-8"
                    />
                    Checkbox
                </label>
            );
        }

        switch (type) {
            case "text":
                return (
                    <Input
                        value={formValues[i] as string}
                        type={type}
                        name={String(i)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(String(i), e.target.value, validation)
                        }
                        error={errors[i]}
                    />
                );
            case "number":
                return (
                    <Input
                        value={formValues[i] as string}
                        type={type}
                        name={String(i)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChange(String(i), e.target.value)
                        }
                        error={errors[i]}
                    />
                );

            case "longtext":
                return (
                    <TextArea
                        value={formValues[i] as string}
                        type={type}
                        name={String(i)}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            onChange(String(i), e.target.value)
                        }
                        error={errors[i]}
                    />
                );

            case "dropdown":
                return (
                    <select
                        className="h-8"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            onChange(String(i), e.target.value)
                        }
                    >
                        {options?.map((option) => (
                            <option>{option}</option>
                        ))}
                    </select>
                );
            default:
                return <></>;
        }
    };

    return (
        <div className="flex flex-col gap-5 items-center">
            <div className="grid grid-cols-[400px_400px] gap-10">
                <form
                    id="form"
                    onSubmit={onSubmit}
                    className="flex flex-col gap-3"
                >
                    {inputs.map((input, i) => renderInput(input, i))}
                </form>
                {showValues ? (
                    <ul className="text-white flex flex-col gap-3 rounded-[10px] bg-zinc-800 px-4">
                        {Object.values(formValues).map((val) => (
                            <li className="h-[46px] flex items-center">
                                {String(val)}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            <button
                form="form"
                className="h-[46px] w-[300px] text-white p-2 text-lg rounded-[10px] bg-zinc-800"
                type="submit"
            >
                <span>Submit</span>
            </button>
        </div>
    );
};
