"use client";

import { useState } from "react";

interface validationConfigType {
  FIELDS: string[];
  MESSAGE: { [key: string]: { [key: string]: string } };
  RULES: { [key: string]: any };
}

const useFormValidation = (validationConfig: validationConfigType) => {
    const { FIELDS, MESSAGE, RULES } = validationConfig;
    const [validationError, setValidationError] = useState<string>("");

    const validate = (formData: { [key: string]: any }) => {
        let newErrors: string = "";
        
            for (const field of FIELDS) {
                const value = formData[field];
                const rules = RULES[field];

                if (rules.required && !value) {
                    newErrors = MESSAGE[field].required;
                    break;
                }

                if (rules.pattern && !rules.pattern.test(value)) {
                    newErrors = MESSAGE[field].pattern;
                    break;  
                }
            }

        setValidationError(newErrors);
        // エラーがなければtrueを返す
        return newErrors === "";
    };
    return { validate, validationError };
}

export default useFormValidation;