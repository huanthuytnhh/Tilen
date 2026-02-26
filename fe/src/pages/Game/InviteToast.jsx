import React from "react";
import PropTypes from "prop-types";

export default function InviteToast({ roomId, fromUserId, closeToast }) {
  const handleAccept = () => {
    console.log(
      `Accepted invitation to room ${roomId} from user ${fromUserId}`
    );
    closeToast(); // Đóng thông báo
    // Thêm logic gửi sự kiện "accept_invite" tới server
  };

  const handleReject = () => {
    console.log(
      `Rejected invitation to room ${roomId} from user ${fromUserId}`
    );
    closeToast(); // Đóng thông báo
    // Thêm logic gửi sự kiện "reject_invite" tới server
  };

  return (
    <div className="grid grid-cols-[1fr_1px_80px] w-full">
      <div className="flex flex-col p-4">
        <h3 className="text-zinc-800 text-sm font-semibold">Room Invitation</h3>
        <p className="text-sm">
          User <strong>{fromUserId}</strong> invited you to join room{" "}
          <strong>{roomId}</strong>.
        </p>
      </div>
      <div className="bg-zinc-900/20 h-full" />
      <div className="grid grid-rows-[1fr_1px_1fr] h-full">
        <button onClick={handleAccept} className="text-green-600 font-medium">
          Accept
        </button>
        <div className="bg-zinc-900/20 w-full" />
        <button onClick={handleReject} className="text-red-600 font-medium">
          Reject
        </button>
      </div>
    </div>
  );
}

InviteToast.propTypes = {
  roomId: PropTypes.string.isRequired,
  fromUserId: PropTypes.string.isRequired,
  closeToast: PropTypes.func.isRequired,
};
