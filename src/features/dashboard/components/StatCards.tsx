interface StatCardProps {
  label: string;
  value: number;
  iconSrc: string;
  bgColor?: string;
  textColor?: string;
  border?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  iconSrc,
  bgColor = "bg-white",
  textColor = "text-black",
  border = false,
}) => {
  return (
    <div
      className={`flex items-center gap-4 px-6 py-4 rounded-xl shadow-sm ${bgColor} ${textColor} ${
        border ? "border border-gray-200" : ""
      }`}
    >
      <img src={iconSrc} alt={label} className="w-8 h-8" />
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};
export default StatCard;