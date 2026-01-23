import { api } from "@/shared/services/api";

type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

interface GenerateGoodsImageRequest {
  promptDescription: string;
  aspectRatio: AspectRatio;
}

interface GenerateGoodsImageResponse {
  dataUrl: string;
}

/**
 * Generates a creative image for K-Pop goods using Gemini Nano Banana (Flash Image) model.
 * @param promptDescription - Description of the item to generate.
 * @param aspectRatio - Aspect ratio for the generated image. Defaults to "1:1".
 * @returns Base64 string of the generated image.
 */
export const generateGoodsImage = async (
  promptDescription: string, 
  aspectRatio: AspectRatio = "1:1"
): Promise<string | null> => {
  try {
    const body: GenerateGoodsImageRequest = { promptDescription, aspectRatio };
    const res = await api.post<GenerateGoodsImageResponse>("/ai/goods-image", body);
    return res?.dataUrl || null;
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    return null;
  }
};
