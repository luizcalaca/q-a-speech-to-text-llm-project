import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { Writable } from "stream";
import { startRecognitionStream, stopRecognitionStream } from "./utils.ts/RecognitionStream";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  let recognizeStream: Writable;
  console.log("** a user connected - " + socket.id + " **\n");

  socket.on("disconnect", () => {
    console.log("** user disconnected ** \n");
  });

  socket.on("send_message", (message) => {
    console.log("message: " + message);
    setTimeout(() => {
      io.emit("receive_message", "got this message" + message);
    }, 1000); 
  });

  socket.on("startGoogleCloudStream", function (data: Socket) {
    startRecognitionStream(data);
  });

  socket.on("endGoogleCloudStream", function () {
    console.log("** ending google cloud stream **\n");
    stopRecognitionStream();
  });

  socket.on("send_audio_data", async (audioData: { audio: Buffer }) => {
    io.emit("receive_message", "Got audio data");
    if (recognizeStream !== null) {
      try {
        recognizeStream.write(audioData.audio);
      } catch (err) {
        console.log("Error calling google api " + err);
      }
    } else {
      console.log("RecognizeStream is null");
    }
  });

});

server.listen(8081, () => {
  console.log("WebSocket server listening on port 8081.");
});
