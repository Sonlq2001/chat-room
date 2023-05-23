import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const App = () => {
  const [key, setKey] = useState<string>("");
  const handleJoinRoom = () => {
    if (!key.trim()) {
      window.alert("Vui lòng nhập mã phòng !");
      return;
    }
    socket.emit("join_room", key);
  };

  useEffect(() => {
    socket.on("roomUsers", (value) => {
      console.log(value);
    });
  }, []);

  return (
    <div>
      <h3>Join room</h3>
      <input
        type="text"
        placeholder="Room"
        onChange={(e) => setKey(e.target.value)}
        value={key}
      />
      <button onClick={handleJoinRoom}>Join</button>
    </div>
  );
};

export default App;
