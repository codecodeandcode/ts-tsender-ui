//Input的UI长的样子

import React, { ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    placeholder: string;
    value: string;
    type?: string;
    large?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    value,
    type = 'text',
    large = false,
    onChange,
}) => {
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        onChange(e);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="font-medium text-gray-700">{label}</label>

            {large ? (
                <textarea
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    min-h-[120px] resize-y text-black placeholder-gray-400"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    text-black placeholder-gray-400"
                />
            )}
        </div>
    );
};

export default InputField;