import {OpenAIChat} from "langchain/llms/openai";

export class OpenAIApi {
    constructor(
        private apiKey: string
    ) {
    }

    public completion = async (prompt: string) => {
        const openAI = new OpenAIChat({
            openAIApiKey: this.apiKey,
            modelName: "gpt-3.5-turbo-16k"
        })
        return await openAI.call(prompt)
    }
}