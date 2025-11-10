
import { GoogleGenAI, Type } from "@google/genai";
import { Service } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A real app would have better error handling, but for this context,
  // we'll log a warning. The app will still run with mock data.
  console.warn("API_KEY environment variable not set. Gemini API features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateOutfitSuggestion = async (
    style: string, 
    occasion: string, 
    colors: string, 
    bodyType?: string, 
    skinTone?: string,
    imageFile?: File | null
): Promise<{ description: string; keyItem: string; }> => {
    const fallbackResponse = {
        description: "AI features are disabled. As a placeholder: A classic white t-shirt, dark wash jeans, and white sneakers. This is a timeless and versatile look.",
        keyItem: "Classic White T-shirt"
    };

    if (!API_KEY) {
        return Promise.resolve(fallbackResponse);
    }

    try {
        let prompt = `You are a world-class personal stylist. Generate a fashion outfit suggestion based on these preferences: Style: ${style}, Occasion: ${occasion}, Preferred Colors: ${colors}.`;
        
        const parts: any[] = [];
        
        if (imageFile) {
            const imagePart = await fileToGenerativePart(imageFile);
            parts.push(imagePart);
            prompt += `\n\nAnalyze the user's photo to determine their body type and skin tone, using these insights to refine your suggestions. Do not mention that you're analyzing a photo.`;
        } else {
            if (bodyType) prompt += ` Body Type: ${bodyType}.`;
            if (skinTone) prompt += ` Skin Tone: ${skinTone}.`;
        }

        prompt += `\n\nDescribe the complete outfit (including top, bottom, shoes, and 1-2 accessories) in a catchy, stylish, and encouraging way.
        Finally, identify the single most important "key item" from the outfit that a user could search for to start building this look.
        Return your response as a JSON object.`;
        parts.push({text: prompt});

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        description: { 
                            type: Type.STRING,
                            description: "A markdown-formatted description of the complete outfit."
                        },
                        keyItem: { 
                            type: Type.STRING,
                            description: "The single most important item from the outfit, like 'Oversized Denim Jacket'."
                        }
                    },
                    required: ['description', 'keyItem']
                }
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error generating outfit suggestion:", error);
        return {
            description: "Sorry, I couldn't come up with an outfit right now. Please try again later.",
            keyItem: ""
        };
    }
};

export const findSimilarProductsFromImage = async (imageFile: File): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("AI features are disabled. Please set your API_KEY. Based on your image, we suggest looking at our 'Trending Now' collection for similar styles.");
    }
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = "Analyze the fashion items in this image. Describe the main clothing item's style, color, and type. Then, suggest 3 search terms I can use to find similar items in an e-commerce store.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing image:", error);
        return "Sorry, I couldn't analyze the image. Please try again with a different one.";
    }
};

export const getAIFitCheck = async (imageFile: File): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("AI features are disabled. Please set your API_KEY. As a placeholder: The fit looks great! The color complements your style well. Consider pairing it with white sneakers for a classic look.");
    }
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = "You are a friendly and encouraging fashion stylist. Analyze the outfit in this image. Provide a 'fit check' with constructive and positive feedback on the style, fit, and color combination. Keep it concise and encouraging, around 3-4 sentences.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error generating fit check:", error);
        return "Sorry, I couldn't analyze the image for a fit check right now. Please try again.";
    }
};

export const getServiceSuggestions = async (userProfile: string, services: Service[]): Promise<Array<{ serviceName: string; reason: string; }>> => {
    if (!API_KEY) {
        return Promise.resolve([
            { serviceName: "Hair Styling", reason: "AI is offline. As a default, a fresh haircut is always a great choice for a new look!" },
            { serviceName: "Nails", reason: "AI is offline. A manicure is a perfect way to treat yourself." }
        ]);
    }
    try {
        const prompt = `Based on the following user profile: '${userProfile}', recommend the top 2 salon services from this list: ${JSON.stringify(services.map(s => s.name))}. For each recommendation, provide a brief, compelling reason (around 15-20 words) why it's a good fit for the user. Return your answer as a JSON object.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        recommendations: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    serviceName: { type: Type.STRING },
                                    reason: { type: Type.STRING }
                                },
                                required: ['serviceName', 'reason']
                            }
                        }
                    },
                    required: ['recommendations']
                }
            }
        });
        
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.recommendations || [];

    } catch (error) {
        console.error("Error getting service suggestions:", error);
        return [];
    }
};

export const getBeauticianSuggestions = async (service: string, beauticians: Array<{id: number, name: string, specialty: string, rating: number}>): Promise<number[]> => {
     if (!API_KEY) {
        // Return first 3 beautician IDs as a fallback if AI is disabled
        return Promise.resolve(beauticians.slice(0, 3).map(b => b.id));
    }
    try {
        const prompt = `Given the selected salon service '${service}', please recommend the top 3 most suitable beauticians from the following list: ${JSON.stringify(beauticians)}. Prioritize beauticians whose specialty is a perfect match for the service. After that, rank them by their rating in descending order. Return your answer as a JSON object.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        beauticianIds: {
                            type: Type.ARRAY,
                            items: { type: Type.NUMBER }
                        }
                    },
                    required: ['beauticianIds']
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.beauticianIds || [];
    } catch (error) {
        console.error("Error getting beautician suggestions:", error);
        return [];
    }
};


export const generateTrendReport = async (): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("## AI Trend Analyzer is Offline\n\nAI features are currently disabled. Please set your API_KEY to get the latest fashion trend reports. In the meantime, streetwear and vintage looks are always in style!");
    }
    try {
        const prompt = `You are a top-tier fashion trend analyst for a major publication like Vogue. Create a concise but engaging fashion trend report for the current season.
        - Identify 3 major trends.
        - For each trend, give it a catchy name.
        - Briefly describe the trend (2-3 sentences).
        - Suggest 2-3 key pieces to get the look.
        - Format the entire output in clean markdown, using headings, bold text, and bullet points.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating trend report:", error);
        return "## Oops!\n\nWe couldn't fetch the latest trends right now. Please try again in a moment.";
    }
};

export const generateBeautyAdvice = async (imageFile: File): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("AI features are disabled. Based on general best practices, we recommend a gentle cleanser, a vitamin C serum in the morning, and a hydrating moisturizer. For hair, a weekly deep conditioning treatment can work wonders!");
    }
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = `You are a helpful and knowledgeable AI Beauty Advisor. Analyze the user's face in this image.
        Based on visible features (do not assume gender, age, or ethnicity), provide:
        1. A simple, recommended 3-step skincare routine (e.g., cleanser, moisturizer, SPF).
        2. Recommendations for 2-3 types of skincare products that might be beneficial.
        3. A brief haircare tip based on the visible hair type.
        Keep the tone positive and general, as you are not a dermatologist. Format the output in markdown with clear headings.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error generating beauty advice:", error);
        return "Sorry, I couldn't analyze the image for beauty advice right now. Please try again.";
    }
};

export const generateVirtualClosetOutfits = async (imageFiles: File[]): Promise<string> => {
    if (!API_KEY) {
        return Promise.resolve("AI features are disabled. Try pairing a graphic tee with your favorite jeans for a classic look, or mix a patterned skirt with a solid-colored top!");
    }
    if (imageFiles.length === 0) {
        return "Please upload some items to your closet first!";
    }
    try {
        const imageParts = await Promise.all(imageFiles.map(fileToGenerativePart));
        const prompt = `You are an expert fashion stylist with a talent for creating amazing outfits from existing clothes. Look at the clothing items in these images from a user's virtual closet.
        - Create 3 distinct outfit combinations using only the items provided.
        - For each outfit, list the items that compose it.
        - Give each outfit a catchy name (e.g., "Weekend Wanderer", "Chic Coffee Date").
        - Format your response clearly in markdown, using headings for each outfit.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [...imageParts, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error generating virtual closet outfits:", error);
        return "Sorry, I couldn't generate outfits from your closet right now. Please try again.";
    }
};

export const generateSellerInsights = async (): Promise<{predictedTopSeller: string; customerSegment: string; marketingIdea: string;}> => {
     if (!API_KEY) {
        return Promise.resolve({
            predictedTopSeller: "AI Offline: Vintage Graphic Tees",
            customerSegment: "AI Offline: Young adults (18-25) interested in streetwear.",
            marketingIdea: "AI Offline: Run a '2 for $80' deal on graphic tees and promote it on video reels."
        });
    }
    try {
        const prompt = `You are an AI business intelligence analyst for a fashion marketplace. Generate some predictive insights for a seller. Provide a JSON object with three keys:
        1. "predictedTopSeller": A plausible top-selling product type for the next quarter (e.g., "Oversized Linen Shirts").
        2. "customerSegment": A key customer segment to target (e.g., "Professionals aged 25-35 looking for smart-casual wear.").
        3. "marketingIdea": A brief, actionable marketing campaign idea (e.g., "Create a 'Work-from-Anywhere' collection and promote it with influencer collaborations on Instagram.").
        Keep the text for each value concise.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        predictedTopSeller: { type: Type.STRING },
                        customerSegment: { type: Type.STRING },
                        marketingIdea: { type: Type.STRING }
                    },
                    required: ['predictedTopSeller', 'customerSegment', 'marketingIdea']
                }
            }
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating seller insights:", error);
        return {
            predictedTopSeller: "Error",
            customerSegment: "Error",
            marketingIdea: "Could not fetch AI insights."
        };
    }
};