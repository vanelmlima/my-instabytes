import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function gerarDescricaoComGemini(imageBuffer) {
  const prompt =
    "Descreva a imagem em uma frase curta. Responda diretamente. Não inicie com frases como 'Claro, aqui está uma frase que descreve a imagem:' ";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "descrição não disponível.";
  } catch (erro) {
    console.error("Erro ao obter descrição:", erro.message, erro);
    throw new Error("Erro ao obter a descrição com o Gemini.");
  }
}

export async function gerarAltTextComGemini(imageBuffer) {
  const prompt =
    "Gere um texto alternativo em português do brasil para a seguinte imagem. Responda em uma única frase de forma descritiva. Não inicie com frases como 'Claro, aqui está uma frase que descreve a imagem:'";

  try {
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };
    const res = await model.generateContent([prompt, image]);
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}