import { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useUser } from "@clerk/clerk-react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
const appId = import.meta.env.VITE_AGORA_APP_ID;

const useAgoraVideo = (roomId, socket) => {
  const [players, setPlayers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [localTracks, setLocalTracks] = useState({
    audioTrack: null,
    videoTrack: null,
  });
  const { user } = useUser();
  const toggleAudio = async () => {
    try {
      console.log("Toggle audio....");
      if (localTracks.audioTrack) {
        if (isAudioEnabled) {
          await localTracks.audioTrack.setEnabled(false);
        } else {
          await localTracks.audioTrack.setEnabled(true);
        }
        setIsAudioEnabled(!isAudioEnabled);
      }
    } catch (error) {
      console.error("Error toggling audio:", error);
    }
  };

  const toggleVideo = async () => {
    try {
      console.log("Toggle video....", !isVideoEnabled);
      if (localTracks.videoTrack) {
        if (isVideoEnabled) {
          await localTracks.videoTrack.setEnabled(false);
          console.log("Check :", localTracks.videoTrack);
        } else {
          await localTracks.videoTrack.setEnabled(true);
        }
        setIsVideoEnabled(!isVideoEnabled);
      }
    } catch (error) {
      console.error("Error toggling video:", error);
    }
  };
  const leaveChannel = async () => {
    try {
      console.log("Leaving Agora channel...");
      await client.leave();
      client.removeAllListeners();
      setPlayers([]);
      setLocalStream(null);
      setIsInitialized(false);
      console.log("Successfully left Agora channel");
    } catch (error) {
      console.error("Error leaving Agora channel:", error);
    }
  };

  useEffect(() => {
    if (!roomId || !socket || !user || !appId) {
      console.log("Missing dependencies:", { roomId, socket, user, appId });
      return;
    }

    let localTracks = {
      videoTrack: null,
      audioTrack: null,
    };

    const initializeAgora = async () => {
      try {
        setLoading(true);
        console.log("Joining Agora channel...", roomId);

        await client.join(appId, roomId, null, user.id);
        console.log("Joined Agora channel");

        // Tạo tracks
        [localTracks.audioTrack, localTracks.videoTrack] = await Promise.all([
          AgoraRTC.createMicrophoneAudioTrack(),
          AgoraRTC.createCameraVideoTrack(),
        ]);

        // Publish cả audio và video
        await client.publish([localTracks.audioTrack, localTracks.videoTrack]);
        console.log("Published local tracks");

        setLocalStream(localTracks.videoTrack);
        setPlayers((prev) => [
          ...prev,
          {
            userId: user.id,
            stream: localTracks.videoTrack,
            audioTrack: localTracks.audioTrack, // Thêm audioTrack
          },
        ]);

        setIsInitialized(true);
        setLoading(false);
      } catch (error) {
        console.error("Agora initialization error:", error);
        setLoading(false);
      }
    };

    // Handle remote users
    client.on("user-published", async (remoteUser, mediaType) => {
      console.log("Remote user published:", remoteUser.uid, mediaType);

      // Subscribe to the remote user
      await client.subscribe(remoteUser, mediaType);
      console.log("Subscribed to remote user:", mediaType);

      if (mediaType === "video") {
        setPlayers((prev) => {
          const existingPlayer = prev.find((p) => p.userId === remoteUser.uid);
          if (existingPlayer) {
            return prev.map((p) =>
              p.userId === remoteUser.uid
                ? { ...p, stream: remoteUser.videoTrack }
                : p
            );
          }
          return [
            ...prev,
            {
              userId: remoteUser.uid,
              stream: remoteUser.videoTrack,
              audioTrack: null,
            },
          ];
        });
      }

      if (mediaType === "audio") {
        remoteUser.audioTrack?.play(); // Phát audio
        setPlayers((prev) => {
          return prev.map((p) =>
            p.userId === remoteUser.uid
              ? { ...p, audioTrack: remoteUser.audioTrack }
              : p
          );
        });
      }
    });

    client.on("user-unpublished", (remoteUser, mediaType) => {
      console.log("Remote user unpublished:", remoteUser.uid, mediaType);
      if (mediaType === "audio") {
        remoteUser.audioTrack?.stop();
      }
    });

    socket.on("user_left", async ({ userId }) => {
      console.log(`User left event received for userId: ${userId}`);
      if (userId === user.id) {
        await leaveChannel();
      }
      setPlayers((prev) => prev.filter((p) => p.userId !== userId));
    });

    initializeAgora();

    // Cleanup
    return () => {
      console.log("Cleaning up Agora...");
      localTracks.audioTrack?.close();
      localTracks.videoTrack?.close();
      client.removeAllListeners();
      socket.off("user_left");
      leaveChannel();
    };
  }, [roomId, socket, user]);

  return {
    players,
    localStream,
    isInitialized,
    loading,
    leaveChannel,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio,
    toggleVideo,
  };
};

export default useAgoraVideo;
