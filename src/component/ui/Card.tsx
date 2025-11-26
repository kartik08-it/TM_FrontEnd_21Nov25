import { Card as MUICard, CardContent, type CardProps } from "@mui/material";

interface Props extends CardProps {
  children: React.ReactNode;
}

export default function Card({ children, sx, ...rest }: Props) {
  return (
    <MUICard
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        marginBottom: 2,
        backgroundColor: "#ffffff",
        ...sx,
      }}
      {...rest}
    >
      <CardContent sx={{ padding: 0 }}>{children}</CardContent>
    </MUICard>
  );
}
