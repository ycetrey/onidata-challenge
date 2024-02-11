import { ChangeEvent, FC, forwardRef } from "react";
import { BaseTextFieldProps, TextField, Typography } from "@mui/material";
import { empty } from "../../helpers";

interface CustomInputProps extends BaseTextFieldProps {
  margin?: "dense" | "normal" | "none" | undefined;
  type?: "text" | "number" | "email" | "password";
  label?: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  error?: boolean;
  errormessage?: string;
  disabled?: boolean;
  register?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<CustomInputProps> = forwardRef((props, ref) => {
  const { error } = props;
  const message = !empty(props.errormessage)
    ? props.errormessage
    : "Obrigatório";

  return (
    <>
      <TextField {...props} ref={ref} />
      {!empty(error) && (
        <Typography
          component="p"
          variant="subtitle2"
          align="right"
          sx={{ color: "red", marginTop: "10px" }}
        >
          {message}
        </Typography>
      )}
    </>
  );
});
