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

  return (
    <div
      className={`flex flex-col items-start leading-[1.1] select-none font-sans ${sizeClasses[size]} ${className}`}
      aria-label="Nicola Capasso Photo"
    >
      <span
        className={`font-extralight uppercase tracking-[0.01em] ${inverse ? "text-background" : "text-foreground"}`}
        style={{ fontWeight: 200 }}
      >
        Nicola Capasso
      </span>
      <span
        className={`font-bold uppercase tracking-[0em] ${inverse ? "text-background" : "text-foreground"}`}
        style={{ fontWeight: 700 }}
      >
        Photo
      </span>
    </div>
  );
};
