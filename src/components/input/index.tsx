import { FC, InputHTMLAttributes } from "react";
import { cn } from "../../utils/tailwind";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input: FC<InputProps> = ({
    disabled,
    error,
    className,
    ...rest
}) => {
    return (
        <label
            className={cn(
                "flex justify-between rounded-[10px] border px-4 pt-[11px] pb-2.5 cursor-pointer",
                disabled
                    ? "bg-disabled"
                    : "bg-zinc-800 hover:outline outline-zink-800/50",
                error ? "border-red-500" : "border-transparent",
                className
            )}
        >
            <input
                className={cn(
                    "placeholder:text-white focus:placeholder:opacity-40 text-base font-normal text-white w-full bg-zinc-800 cursor-pointer outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                    disabled && "text-opacity-50",
                    className
                )}
                disabled={disabled}
                {...rest}
            />
        </label>
    );
};
