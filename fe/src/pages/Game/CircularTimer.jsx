import PropTypes from "prop-types";

const CircularTimer = ({ timeLeft, totalTime }) => {
  const radius = 17; // Bán kính vòng tròn nhỏ hơn
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((totalTime - timeLeft) / totalTime) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-12 h-12">
        {" "}
        {/* Điều chỉnh kích thước SVG */}
        {/* Vòng tròn nền */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6" // Độ dày viền vòng nền
          fill="none"
        />
        {/* Vòng tròn đếm ngược */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#4ade80"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s linear",
          }}
        />
      </svg>
      {/* Số giây còn lại */}
      <span className="absolute text-lg font-bold top-1/2 left-1/2 transform -translate-x-3/4 -translate-y-1/3 ">
        {timeLeft}
      </span>{" "}
      {/* Căn giữa số giây */}
    </div>
  );
};

CircularTimer.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default CircularTimer;
