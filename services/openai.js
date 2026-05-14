import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateStartup = async (data) => {
  const { idea, targetMarket, businessModel, stage, founderBackground, fileContent, fileName } = data;

  const fileSection = fileContent
    ? `\n    📎 Uploaded Document: ${fileName || 'Document'}\n    Document Content:\n    ${fileContent}\n`
    : '';

  const prompt = `
    You are an expert startup analyst, venture capitalist, and product strategist.
    Your task is to evaluate a startup idea and return a complete, structured business analysis.
    ${fileContent ? 'The user has also uploaded a supporting document — use its content to enrich your analysis.' : ''}

    ---
    ## 📥 INPUT
    Startup Idea: ${idea}
    Target Market: ${targetMarket || 'Not specified'}
    Business Model: ${businessModel || 'Not specified'}
    Stage: ${stage || 'Idea'}
    Founder Background: ${founderBackground || 'Not specified'}${fileSection}

    ---
    ## 🧠 INSTRUCTIONS
    Analyze the idea step-by-step and return ONLY valid JSON.
    Be concise, practical, and specific. Avoid generic statements.
    Return ONLY JSON (no explanations outside JSON).
    Keep scores between 0–10.
    Be realistic, not overly optimistic.
    Avoid vague phrases like “this could be successful”.
    Make outputs actionable and specific.

    ---
    ## 📊 OUTPUT FORMAT
    {
      "classification": {
        "industry": "",
        "business_model_type": "",
        "target_audience": ""
      },
      "problem_analysis": {
        "problem_clarity": "",
        "pain_level": "",
        "existing_solutions": ""
      },
      "market_breakdown": {
        "target_customer": "",
        "top_regions": [],
        "market_size_estimate": "",
        "growth_rate": ""
      },
      "analysis": {
        "strengths": [],
        "weaknesses": [],
        "opportunities": [],
        "threats": []
      },
      "market_analysis": {
        "tam": "",
        "sam": "",
        "som": "",
        "market_trends": [],
        "entry_barriers": [],
        "customer_personas": [
          { "title": "", "description": "", "pain_points": [] }
        ]
      },
      "competition": {
        "competitors": [
          { "name": "", "strength": "", "weakness": "" }
        ],
        "differentiation_strategy": ""
      },
      "monetization": {
        "revenue_model": "",
        "pricing_strategy": "",
        "revenue_potential": ""
      },
      "financials": {
        "year1_revenue_estimate": "",
        "cost_drivers": [],
        "profitability_timeline": ""
      },
      "scores": {
        "innovation": 0,
        "feasibility": 0,
        "market_size": 0,
        "revenue_potential": 0,
        "overall": 0
      },
      "risks": {
        "key_risks": [],
        "regulatory_risks": "",
        "mitigation_strategies": []
      },
      "validation_plan": {
        "experiments": [],
        "metrics_to_track": [],
        "validation_methods": []
      },
      "execution_plan": {
        "week_1_2": "",
        "week_3_4": "",
        "month_2_3": ""
      },
      "founder_fit": {
        "score": 0,
        "reason": ""
      },
      "branding": {
        "name_suggestions": [],
        "brand_colors": ["#hex", "#hex"],
        "brand_voice": "",
        "logo_concept": ""
      },
      "pitch_deck": [
        { "slide": 1, "title": "Title", "content": "", "visual_suggestion": "" }
      ],
      "competitor_matrix": [
        { "competitor": "", "price_point": "", "target_segment": "", "main_feature": "" }
      ],
      "recommendations": [],
      "final_verdict": {
        "decision": "Build / Iterate / Avoid",
        "reason": ""
      }
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert startup consultant and venture capitalist evaluator. You provide rigorous, honest, and actionable feedback in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API Error Details:', error);
    
    // DEMO MODE FALLBACK
    const isInvalidKey = error.code === 'invalid_api_key' || error.status === 401;
    const isPlaceholder = process.env.OPENAI_API_KEY?.includes('your_openai');
    const isMissing = !process.env.OPENAI_API_KEY;

    if (isInvalidKey || isPlaceholder || isMissing) {
      console.log('>>> Running in DEMO MODE with simulated data <<<');
      const ideaTitle = idea.length > 30 ? idea.substring(0, 30) + "..." : idea;
      
      return {
        idea: idea,
        classification: {
          industry: idea.toLowerCase().includes("drone") ? "Agriculture / Robotics" : "SaaS / AI",
          business_model_type: "Subscription / Enterprise",
          target_audience: "Large Scale Operations"
        },
        problem_analysis: {
          problem_clarity: "High - addressing specific efficiency gaps in the sector.",
          pain_level: "Critical - current manual processes are too slow.",
          existing_solutions: "Traditional labor-intensive methods."
        },
        market_breakdown: {
          target_customer: "Enterprise Clients",
          top_regions: ["Global"],
          market_size_estimate: "$10B+",
          growth_rate: "15% CAGR"
        },
        analysis: {
          strengths: [`Novel approach to ${ideaTitle}`, "High barrier to entry", "First-mover advantage"],
          weaknesses: ["Regulatory hurdles", "High R&D costs", "Sales cycle length"],
          opportunities: ["Global expansion", "Partnerships", "Data licensing"],
          threats: ["Incumbent response", "Rapid tech shifts", "Regulation"]
        },
        market_analysis: {
          tam: "$25 Billion",
          sam: "$5 Billion",
          som: "$500 Million",
          market_trends: ["Automation", "Sustainability", "AI-optimization"],
          entry_barriers: ["Technical complexity", "Capital requirement", "Specialized talent"],
          customer_personas: [
            { 
              title: "The Innovation Head", 
              description: `Responsible for upgrading ${ideaTitle} infrastructure.`, 
              pain_points: ["Cost transparency", "Reliability"] 
            }
          ]
        },
        competition: {
          competitors: [
            { "name": "Incumbent X", "strength": "Scale", "weakness": "Agility" },
            { "name": "Startup Y", "strength": "Specialized", "weakness": "Funding" }
          ],
          differentiation_strategy: "Proprietary algorithm and seamless UX."
        },
        monetization: {
          revenue_model: "Subscription / Implementation Fees",
          pricing_strategy: "Value-based pricing",
          revenue_potential: "High"
        },
        financials: {
          year1_revenue_estimate: "$1.2 Million",
          cost_drivers: ["Product dev", "Sales", "Cloud costs"],
          profitability_timeline: "24 months"
        },
        scores: {
          innovation: 9,
          feasibility: 6,
          market_size: 8,
          revenue_potential: 9,
          overall: 8.5
        },
        risks: {
          key_risks: ["Product-market fit", "Scaling"],
          regulatory_risks: "Compliance with international standards.",
          mitigation_strategies: ["Pilot programs", "Phased rollout"]
        },
        validation_plan: {
          experiments: ["User survey", "Beta testing"],
          metrics_to_track: ["NPS", "Conversion rate"],
          validation_methods: ["Direct outreach", "Ad campaign"]
        },
        execution_plan: {
          week_1_2: `Develop core proof-of-concept for ${ideaTitle}.`,
          week_3_4: "Design high-fidelity UI and brand language.",
          month_2_3: "Launch closed alpha with strategic partners."
        },
        founder_fit: {
          score: 9.5,
          reason: "Visionary approach to a difficult problem."
        },
        idea_improvements: {
          refined_idea: `Scalable ${ideaTitle} Platform with predictive AI.`,
          alternative_angles: ["Consumer focus", "API-only approach"],
          pivot_suggestions: ["White-labeling", "Vertical integration"]
        },
        branding: {
          name_suggestions: [ideaTitle.split(' ')[0] + "ly", "Nova" + ideaTitle.split(' ')[0], "AeroPulse"],
          brand_colors: ["#6366f1", "#0ea5e9", "#f8fafc"],
          brand_voice: "Confident, High-tech, Clean",
          logo_concept: "Minimalist geometric abstraction representing movement and precision."
        },
        pitch_deck: [
          { slide: 1, title: "The Vision", content: `Transforming how the world interacts with ${ideaTitle}.`, visual_suggestion: "Inspiring cinematic wide-shot." },
          { slide: 2, title: "The Problem", content: "Existing solutions are fragmented, slow, and expensive.", visual_suggestion: "Comparison chart showing inefficiencies." },
          { slide: 3, title: "Our Solution", content: "A frictionless, AI-driven platform built for scale.", visual_suggestion: "Clean product interface shot." }
        ],
        competitor_matrix: [
          { competitor: "Market Leader", price_point: "High", target_segment: "Traditional", main_feature: "Legacy systems" },
          { competitor: "New Entrant", price_point: "Low", target_segment: "Budget", main_feature: "Core tools only" }
        ],
        recommendations: [
          "Validate the technical feasibility first.",
          "Secure an IP portfolio early.",
          "Hire a dedicated GTM strategist."
        ],
        final_verdict: {
          decision: "Build",
          reason: "Strong strategic value and significant market gap."
        }
      };
    }
    
    throw new Error('Failed to evaluate startup idea.');
  }
};

export const chatContext = async (message, context) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a Senior Startup Consultant. You are discussing a specific startup evaluation with a founder.
          
          CONTEXT OF EVALUATION:
          ${JSON.stringify(context || {})}
          
          Your goal is to provide deep, actionable advice based on this context. Be professional, direct, and helpful.`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Chat API Error:', error);
    if (!process.env.OPENAI_API_KEY) {
      return "I'm in Demo Mode, but if I were connected to OpenAI, I would give you tailored advice about your " + (context?.classification?.industry || "startup") + " idea!";
    }
    throw new Error('Consultant is currently unavailable.');
  }
};
