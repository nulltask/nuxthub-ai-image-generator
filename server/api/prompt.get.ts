export default eventHandler(async (event) => {
  return hubAI().run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      {
        role: "system",
        content: "You are helpful assistant.",
      },
      {
        role: "user",
        content:
          "Please create an example of a prompt for image generation that conveys humor. Provide only the prompt text, and output within 250 characters. Omit quotation marks around the created prompt.",
      },
    ],
    max_tokens: 512,
    top_p: 0.9,
    top_k: 40,
    temperature: 1,
  });
});
