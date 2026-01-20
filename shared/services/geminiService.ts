import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generates a creative image for K-Pop goods using Gemini Nano Banana (Flash Image) model.
 * @param promptDescription - Description of the item to generate.
 * @param aspectRatio - Aspect ratio for the generated image. Defaults to "1:1".
 * @returns Base64 string of the generated image.
 */
export const generateGoodsImage = async (
  promptDescription: string, 
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1"
): Promise<string | null> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Returning null to use placeholder.");
    return null;
  }

  try {
    const model = 'gemini-2.5-flash-image';
    
    const fullPrompt = `
      Professional product photography of: ${promptDescription}.
      Style: K-Pop merchandise aesthetic, high-end, clean, vibrant, studio lighting.
      No text overlays, no distorted hands, photorealistic 8k.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return null;
  }
};
