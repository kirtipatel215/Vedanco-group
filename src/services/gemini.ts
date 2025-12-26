
import { GoogleGenAI } from "@google/genai";

// Helper to ensure API Key is present (Protected Environment Variable)
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("CRITICAL: process.env.API_KEY is not defined.");
    throw new Error("API configuration missing. Please ensure process.env.API_KEY is set.");
  }
  return key;
};

// --- 1. General Intelligence & Analysis (Gemini 3 Pro) ---
export const analyzeContent = async (prompt: string, videoFile?: File): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    let contents: any = prompt;

    if (videoFile) {
       const base64Video = await fileToGenerativePart(videoFile);
       contents = {
         parts: [base64Video, { text: prompt }]
       }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
    });
    return response.text || "No analysis generated.";
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    throw new Error(error.message || "Failed to analyze content.");
  }
};

// --- 2. Image Generation (Nano Banana Pro) ---
export const generateImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K"): Promise<string> => {
  try {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await window.aistudio.openSelectKey();
        }
    }

    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "16:9" 
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data received.");
  } catch (error: any) {
    console.error("Image Gen Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
};

// --- 3. Image Editing (Gemini 2.5 Flash Image) ---
export const editImage = async (imageFile: File, prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const base64Image = await fileToGenerativePart(imageFile);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
            base64Image,
            { text: prompt }
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    return ""; 
  } catch (error: any) {
    console.error("Image Edit Error:", error);
    throw new Error("Failed to edit image.");
  }
};

// --- 4. Video Generation (Veo) ---
export const generateVideo = async (prompt: string, aspectRatio: "16:9" | "9:16" = "16:9", resolution: "720p" | "1080p" = "720p"): Promise<string> => {
  try {
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
            await window.aistudio.openSelectKey();
        }
    }

    const veoAi = new GoogleGenAI({ apiKey: getApiKey() });

    let operation = await veoAi.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: resolution,
        aspectRatio: aspectRatio
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await veoAi.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("No video URI returned.");

    // Note: We use the key here again for the fetch call
    const videoResponse = await fetch(`${videoUri}&key=${getApiKey()}`);
    const blob = await videoResponse.blob();
    return URL.createObjectURL(blob);

  } catch (error: any) {
    console.error("Veo Gen Error:", error);
    throw new Error(error.message || "Failed to generate video.");
  }
};

async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type
        },
      });
    };
    reader.readAsDataURL(file);
  });
}
