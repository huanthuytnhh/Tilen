
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import VideoControls from "./VideoControls";

const VideoChat = ({
  stream,
  isLocal,
  userName,
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      stream.play(videoRef.current);
      return () => {
        stream.stop();
      };
    }
  }, [stream]);

  return (
    <div className="video-chat-container relative w-full h-full">
      <div
        ref={videoRef}
        className="video-wrapper w-full h-full rounded-full overflow-hidden"
      />
      {userName && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center text-sm py-1">
          {userName}
        </div>
      )}
      {isLocal && (
        <VideoControls
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          onToggleAudio={onToggleAudio}
          onToggleVideo={onToggleVideo}
        />
      )}

    </div>
  );
};

VideoChat.propTypes = {
  stream: PropTypes.object.isRequired,
  isLocal: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  isAudioEnabled: PropTypes.bool,
  isVideoEnabled: PropTypes.bool,
  onToggleAudio: PropTypes.func,
  onToggleVideo: PropTypes.func,
};

export default VideoChat;
