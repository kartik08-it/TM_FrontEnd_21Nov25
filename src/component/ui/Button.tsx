import { Button as MUIButton, type ButtonProps } from "@mui/material";

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <MUIButton variant="contained" size="medium" {...props}>
      {children}
    </MUIButton>
  );
}
