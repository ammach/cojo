import React from "react";
import { Select } from "antd";
import { FormItem } from "@components/form/formItem/FormItem";
import { useTabletSize } from "@hooks/window";
import "./formItemActionSelect.css";

export function FormItemActionSelect({
  name,
  options,
  onChange,
  disabled,
  size,
}) {
  const isTablet = useTabletSize();
  const { Option } = Select;

  return (
    <FormItem
      className="select-action"
      name={name}
      initialValue={options[0].value}
    >
      <Select
        size={isTablet ? "large" : "middle"}
        id={name}
        aria-expanded
        style={size ? { width: size } : { width: 80 }}
        dropdownClassName="select-action-dropdown"
        onChange={onChange}
        {...(disabled && { disabled: disabled })}
      >
        {options.map(({ text, value }, key) => (
          <Option key={key} value={value}>
            {text}
          </Option>
        ))}
      </Select>
    </FormItem>
  );
}
