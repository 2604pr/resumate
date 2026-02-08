const axios = require("axios");

class HFService {
  constructor() {
    this.client = axios.create({
      baseURL: "https://router.huggingface.co/v1",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
    });
  }

  async chat(prompt, systemRole) {
    const res = await this.client.post("/chat/completions", {
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        { role: "system", content: systemRole },
        { role: "user", content: prompt }
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    return res.data.choices[0].message.content;
  }

  async analyzeResume(resumeText) {
    return this.chat(
      resumeText,
      "You are an expert AI resume analyst and career advisor."
    );
  }

  async generateInterviewQuestions(resumeText) {
    return this.chat(
      resumeText,
      "You are an expert technical interviewer and career coach."
    );
  }

  async provideCareerGuidance(resumeText) {
    return this.chat(
      resumeText,
      "You are a senior career counselor and industry expert."
    );
  }
}

module.exports = new HFService();