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

export async function generateReviewAdvice(employee: {
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
}) {
  try {
    const prompt = `Create a concise, bullet-pointed presentation guide for ${employee.name} (${employee.role}) to present their growth and achievements in their review.

    Employee Data:
    Certificate: ${employee.nextCertificate.name} (${Math.round(employee.modules.reduce((sum, m) => sum + m.progress, 0) / employee.modules.length)}% complete)
    Completed Modules: ${employee.modules.filter(m => m.completed).map(m => m.name).join(", ")}
    In Progress: ${employee.modules.filter(m => !m.completed && m.progress > 0).map(m => `${m.name} (${m.progress}%)`).join(", ")}

    Key Achievements: "${employee.selfReflection.achievements}"
    Completed Goals: ${employee.goals.filter(g => g.completed).map(g => g.description).join(", ")}
    Skills: ${employee.skills.map(s => s.name).join(", ")}

    Create a presentation guide with these sections:

    1. Certificate Value & Progress
    - Highlight the value of the ${employee.nextCertificate.name} certificate for their role
    - Show completed modules and their relevance
    - Present progress as evidence of commitment

    2. Key Achievements
    - List 2-3 most impactful achievements from their self-reflection
    - Connect each achievement to their role and skills

    3. Goals & Growth
    - Highlight completed goals and their impact
    - Show how goals align with certificate progress

    4. Forward Focus
    - Present next steps from their self-reflection
    - Show how certificate completion will enhance their role

    Format as clear bullet points. Keep it concise and focused on demonstrating value to their role.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
    });
    
    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating review advice:', error);
    throw error;
  }
} 