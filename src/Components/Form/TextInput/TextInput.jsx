import React, { useState, useCallback, useEffect } from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./TextInput.scss";

const TextInput = ({
  type = "text",
  placeholder = null,
  onChange = () => null,
  error = false,
  errorText = null,
  required = false,
  value = "",
  autoFocus = false,
  showTogglePassword = true,
  ...props
}) => {
  const [typeState, setTypeState] = useState(type);
  const [flow, setFlow] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setFlow(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    setFlow(!!value);
  }, [value]);

  useEffect(() => {
    setFlow(!!value || autoFocus);
    setFocused(autoFocus);
    // only trigger once the component renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFlow(!!value || focused);
  }, [value, focused]);

  useEffect(() => {
    setTypeState(type);
  }, [type]);

  return (
    <div className="text-input-wrapper">
      <span
        className={`text-input-label${flow ? " flow" : ""}`}
      >{`${placeholder}${required ? " *" : ""}`}</span>
      <input
        className={`text-input ${error && "input-error"}`}
        type={typeState}
        placeholder=""
        onChange={(e) => onChange(e.target.value)}
        required={required}
        value={value}
        onBlur={onBlur}
        onFocus={handleFocus}
        autoFocus={autoFocus}
        {...props}
      />
      {type === "password" && showTogglePassword && (
        <span
          className="show-password"
          onClick={() =>
            setTypeState(typeState === "text" ? "password" : "text")
          }
        >
          {typeState === "text" ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </span>
      )}
      {error && errorText && <p className="text-input-error">{errorText}</p>}
    </div>
  );
};

export default TextInput;
