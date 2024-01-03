import { Socket } from "socket.io";
const speechClient = new speech.SpeechClient();
import speech from "@google-cloud/speech";
import { Writable } from "stream";
import { request } from "../config/stt-settings";

let recognizeStream: Writable;

export function startRecognitionStream(client: Socket) {
    console.log("* Starting-Recognition-Stream\n");
    try {
      recognizeStream = speechClient
        .streamingRecognize(request)
        .on("error", console.error)
        .on("data", (data) => {
          const result = data.results[0];
          const isFinal = result.isFinal;

          const transcription = data.results
            .map((result: any) => result.alternatives[0].transcript)
            .join("\n");

          console.log(`Live Transcription: `, transcription);

          client.emit("receive_audio_text", {
            text: transcription,
            isFinal: isFinal,
          });

          if (data.results[0] && data.results[0].isFinal) {
            stopRecognitionStream();
            startRecognitionStream(client);
            console.log("restarted stream serverside");
          }
        });
    } catch (err) {
      console.error("Error streaming google api " + err);
    }
  }

  export function stopRecognitionStream() {
    if (recognizeStream) {
      console.log("* Stop-Recognition-Stream \n");
      recognizeStream.end();
    }
    recognizeStream = null as unknown as Writable;
  }
