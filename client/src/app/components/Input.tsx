"use client";

interface InputProps {
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    buttonLabel: string;
    onClick: () => void;
}

const Input: React.FC<InputProps> = ({ placeholder, type, value, onChange, buttonLabel, onClick }) => {
    return(
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button onClick={onClick}>{buttonLabel}</button>
        </div>
    );
}

export default Input;