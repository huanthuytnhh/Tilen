import React from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";

const VideoControls = ({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
}) => {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        onClick={onToggleAudio}
        className={`p-2 rounded-full ${
          isAudioEnabled ? "bg-blue-500" : "bg-red-500"
        } text-white hover:opacity-80 transition-opacity`}
      >
        {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
      </button>
      <button
        onClick={onToggleVideo}
        className={`p-2 rounded-full ${
          isVideoEnabled ? "bg-blue-500" : "bg-red-500"
        } text-white hover:opacity-80 transition-opacity`}
      >
        {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
      </button>
    </div>
  );
};

export default VideoControls;
