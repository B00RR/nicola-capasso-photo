type LogoTextProps = {
  className?: string;
  inverse?: boolean;
  size?: "sm" | "md" | "lg";
};

export const LogoText = ({ className = "", inverse = false, size = "md" }: LogoTextProps) => {
  const sizeClasses = {
    sm: "text-[12px]",
    md: "text-[14px] md:text-[16px]",
    lg: "text-[18px] md:text-[22px]",
  };

  const color = inverse ? "text-background" : "text-foreground";

  return (
    <span
      className={`inline-flex items-baseline whitespace-nowrap select-none ${sizeClasses[size]} ${color} ${className}`}
      aria-label="Nicola Capasso Photo"
      style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase" }}
    >
      <span style={{ fontWeight: 300 }}>Nicola Capasso</span>
      <span className="inline-block w-[0.6em]" aria-hidden="true" />
      <span style={{ fontWeight: 500 }}>Photo</span>
    </span>
  );
};
