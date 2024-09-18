const emailRegExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const noNumbers = /^[A-Za-z\s]+$/;

export type InputType = {
    default_value?: string | number | boolean;
    value?: string | number | boolean;
    validation?: RegExp;
    min_value?: number;
    max_value?: number;
    options?: string[] | number[];
    type: "text" | "longtext" | "dropdown" | "number";
};

export const inputs: InputType[] = [
    {
        default_value: "Name",
        value: "First Name",
        validation: noNumbers,
        type: "text",
    },
    {
        default_value: "Last Name",
        value: "Last Name",
        validation: noNumbers,
        type: "text",
    },
    {
        default_value: "Email",
        value: "qwe@asd.com",
        validation: emailRegExp,
        type: "text",
    },
    {
        default_value: "Age",
        value: "0",
        min_value: 12,
        max_value: 75,
        type: "number",
    },
    {
        default_value: "Lorem ipsim dolorm",
        value: "",
        type: "longtext",
    },
    {
        default_value: "children",
        value: "",
        options: ["children", "adult", "senior"],
        type: "dropdown",
    },
    {
        default_value: false,
        value: "",
        type: "text",
    },
];
