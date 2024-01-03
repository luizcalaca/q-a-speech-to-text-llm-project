const encoding = "LINEAR16";
const sampleRateHertz = 16000;
const languageCode = "ko-KR"; //en-US
const alternativeLanguageCodes = ["en-US", "ko-KR"];

export const request:any = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: "en-US",
    //alternativeLanguageCodes: alternativeLanguageCodes,
    enableWordTimeOffsets: true,
    enableAutomaticPunctuation: true,
    enableWordConfidence: true,
    enableSpeakerDiarization: true,
    //diarizationSpeakerCount: 2,
    //model: "video",
    model: "command_and_search",
    //model: "default",
    useEnhanced: true,
  },
  interimResults: true,
};