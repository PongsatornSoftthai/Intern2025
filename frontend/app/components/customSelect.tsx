'use client'
import React from "react";
import Select, { StylesConfig } from "react-select";

interface CustomSelectProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {

    //จัดการ react-select change
    const handleChange = (selected: any) => {
        onChange(selected ? selected.value : "");
    };

    //กำหนดสไตล์สำหรับทุก dropdown
    const customStyles: StylesConfig = {
        control: (provided) => ({
            ...provided,
            borderRadius: 10,
            borderColor: "#28644c",
            minHeight: "40px",
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#5dC47F"
                : state.isFocused ? "#5dC47F"
                    : "#fff",
            color:state.isSelected?"#fff":"#000",
            borderRadius: 5,
            padding: 10,
        }),
    };

    return (
        <Select 
            instanceId="custom-select"
            options={options}
            value={options.find((o)=>o.value === value)||null}
            onChange={handleChange}
            placeholder={placeholder}
            styles={customStyles}
        />
    );
}