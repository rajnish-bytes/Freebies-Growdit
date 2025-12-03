interface FlagIconProps {
  countryCode: string;
  className?: string;
}

const FlagIcon = ({ countryCode, className = "w-5 h-4" }: FlagIconProps) => {
  // Using flagcdn.com for high-quality SVG flags
  const flagUrl = `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
  
  return (
    <img 
      src={flagUrl} 
      alt={`${countryCode} flag`}
      className={`inline-block object-cover rounded-sm ${className}`}
      loading="lazy"
    />
  );
};

export default FlagIcon;
