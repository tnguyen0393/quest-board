import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// Global cache for growth summaries
const growthSummaryCache = new Map<string, string>();

export async function generateCompletion(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating completion:', error);
    throw error;
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export async function generateGrowthSummary(employee: {
  name: string;
  role: string;
  nextCertificate: { name: string };
  modules: { name: string; progress: number }[];
  skills: { name: string }[];
  id: number;
}) {
  // Check if we have a cached summary
  const cacheKey = `growth_summary_${employee.id}`;
  if (growthSummaryCache.has(cacheKey)) {
    return growthSummaryCache.get(cacheKey);
  }

  try {
    const prompt = `Create a unique, engaging growth summary for ${employee.name}, a ${employee.role}, that focuses on their specific achievements and skills.
    They are pursuing their ${employee.nextCertificate.name} certificate, with ${Math.round(employee.modules.reduce((sum, m) => sum + m.progress, 0) / employee.modules.length)}% of their journey complete.
    Their key skills include: ${employee.skills.map(s => s.name).join(", ")}.
    
    Important Guidelines:
    1. Focus on their actual skills and how they apply them in their role
    2. Avoid generic fantasy terms like "realm", "warrior", "beacon", "labyrinth"
    3. Use metaphors that directly relate to their work environment
    4. Highlight specific achievements based on their progress percentage
    5. Make it feel like a real professional journey, not a fantasy quest
    
    Role-Specific Focus:
    - Customer Service Rep: Focus on how they handle customer interactions and improve service quality
    - Call Center Supervisor: Emphasize their team management and operational improvements
    - Quality Analyst: Highlight their data analysis and quality improvement methods
    - Technical Support Agent: Focus on their technical problem-solving and system optimization
    
    Keep it professional but engaging, and make it concise (2-3 sentences).`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.8,
    });
    
    const summary = completion.choices[0].message.content || '';
    // Store in cache
    growthSummaryCache.set(cacheKey, summary);
    return summary;
  } catch (error) {
    console.error('Error generating growth summary:', error);
    throw error;
  }
}

export async function generatePerformanceReviewGuidance(employee: {
  name: string;
  role: string;
  nextCertificate: { name: string };
  modules: { name: string; progress: number; completed: boolean }[];
  skills: { name: string }[];
  goals: { description: string; completed: boolean }[];
  selfReflection: {
    achievements: string;
    challenges: string;
    learnings: string;
    nextSteps: string;
    support: string;
  };
  summary: string;
}) {
  try {
    const prompt = `Generate personalized performance review guidance for ${employee.name}, a ${employee.role} who is pursuing their ${employee.nextCertificate.name} certificate.

Current Status:
- Certificate Progress: ${Math.round(employee.modules.reduce((sum, m) => sum + m.progress, 0) / employee.modules.length)}%
- Completed Modules: ${employee.modules.filter(m => m.completed).map(m => m.name).join(", ")}
- Key Skills: ${employee.skills.map(s => s.name).join(", ")}
- Goals: ${employee.goals.map(g => `${g.description} (${g.completed ? "Completed" : "In Progress"})`).join(", ")}
- Self-Reflection Summary: ${employee.summary}

Self-Reflection Details:
- Achievements: ${employee.selfReflection.achievements}
- Challenges: ${employee.selfReflection.challenges}
- Learnings: ${employee.selfReflection.learnings}
- Next Steps: ${employee.selfReflection.nextSteps}
- Support Needed: ${employee.selfReflection.support}

Please provide a structured guide with bullet points on how to present their growth in a performance review. Focus on:
1. Key achievements to highlight
2. Specific skills and competencies to emphasize
3. Areas of growth and development
4. Future potential and career trajectory
5. Specific examples to support each point

Make the guidance specific to their role, skills, and actual achievements. Avoid generic advice.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });
    
    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating performance review guidance:', error);
    throw error;
  }
} 