"use client";

import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  RoomContext,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";

export default function Page() {
  // State for user inputs
  const [room, setRoom] = useState("quickstart-room");
  const [name, setName] = useState("quickstart-user");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

  // Create room instance
  const [roomInstance] = useState(
    () =>
      new Room({
        adaptiveStream: true, // Optimize video quality for each participant's screen
        dynacast: true, // Enable automatic audio/video quality optimization
      })
  );

  // Function to handle room connection
  const connectToRoom = async () => {
    if (!room.trim() || !name.trim()) {
      setError("Room name and username are required");
      return;
    }

    setError("");
    try {
      const resp = await fetch(`/api/token?room=${room}&username=${name}`);
      const data = await resp.json();

      if (data.token) {
        await roomInstance.connect(
          "wss://talker-dui057pi.livekit.cloud", // Should be in env variable
          data.token
        );
        setIsConnected(true);
      } else {
        setError("Failed to get token");
      }
    } catch (e) {
      console.error(e);
      setError(
        "Connection error: " +
          (e instanceof Error ? e.message : "Unknown error")
      );
    }
  };

  // Disconnect from room
  const disconnectFromRoom = () => {
    roomInstance.disconnect();
    setIsConnected(false);
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      roomInstance.disconnect();
    };
  }, [roomInstance]);

  return (
    <div className="min-h-screen p-4">
      {!isConnected ? (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Join Video Conference</h1>

          {error && (
            <div className="mb-4 p-2 text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 font-medium">Room Name</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter room name"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <button
            onClick={connectToRoom}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Join Room
          </button>
        </div>
      ) : (
        <RoomContext.Provider value={roomInstance}>
          <div data-lk-theme="default" className="h-screen flex flex-col">
            <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
              <div>
                <span className="font-semibold">Room:</span> {room}
              </div>
              <button
                onClick={disconnectFromRoom}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Leave Room
              </button>
            </div>

            {/* Video conference component */}
            <div className="flex-1">
              <MyVideoConference />
            </div>

            {/* Audio renderer and control bar */}
            <RoomAudioRenderer />
            <ControlBar />
          </div>
        </RoomContext.Provider>
      )}
    </div>
  );
}

function MyVideoConference() {
  // Get all camera and screen share tracks
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height) - 3.5rem)" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
}
