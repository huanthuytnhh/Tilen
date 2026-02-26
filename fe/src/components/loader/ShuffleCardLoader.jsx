import React from "react";
import "./ShuffleCardLoader.css"; // Nếu bạn muốn giữ lại các animations từ CSS

const ShuffleCardLoader = () => {
  return (
    <div className="flickity-container flex justify-center items-center h-screen -ml-[70px]">
      <div className="hand relative h-[100px]">
        {/* Card 1 */}
        <div className="card card-1 w-[70px] h-[100px] border-4 border-[#262722] rounded-[3px] bg-lavender absolute top-0 flex justify-center items-center z-3 ml-[20px]">
          <span></span>
        </div>
        {/* Card 2 */}
        <div className="card card-2 w-[70px] h-[100px] border-4 border-[#262722] rounded-[3px] bg-lavender absolute top-0 flex justify-center items-center z-2 ml-[10px]">
          <span></span>
        </div>
        {/* Card 3 */}
        <div className="card card-3 w-[70px] h-[100px] border-4 border-[#262722] rounded-[3px] bg-lavender absolute top-0 flex justify-center items-center z-1">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ShuffleCardLoader;
