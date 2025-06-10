// Industry configuration
const industryConfig = {
    tech: {
        name: 'Technology',
        volatility: 'high',
        recommendedCadence: 'biweekly',
        reasoning: 'Technology is a fast-moving industry where information becomes outdated quickly. AI models prioritize recent, authoritative content in this field.'
    },
    finance: {
        name: 'Finance',
        volatility: 'high',
        recommendedCadence: 'biweekly',
        reasoning: 'Financial information needs to be current to maintain accuracy and relevance. AI models favor up-to-date financial content.'
    },
    health: {
        name: 'Healthcare',
        volatility: 'high',
        recommendedCadence: 'biweekly',
        reasoning: 'Healthcare information must be current to ensure accuracy and safety. AI models prioritize recent medical content.'
    },
    marketing: {
        name: 'Marketing',
        volatility: 'medium',
        recommendedCadence: 'monthly',
        reasoning: 'Marketing trends evolve at a moderate pace. Monthly updates help maintain relevance while being manageable.'
    },
    education: {
        name: 'Education',
        volatility: 'medium',
        recommendedCadence: 'monthly',
        reasoning: 'Educational content benefits from regular updates but doesn\'t require the same frequency as high-volatility industries.'
    },
    legal: {
        name: 'Legal',
        volatility: 'low',
        recommendedCadence: 'quarterly',
        reasoning: 'Legal information changes more slowly, but regular updates help maintain accuracy and authority.'
    },
    architecture: {
        name: 'Architecture',
        volatility: 'low',
        recommendedCadence: 'quarterly',
        reasoning: 'Architectural principles and practices evolve gradually. Quarterly updates are sufficient to maintain relevance.'
    }
};

// AI Tips for different industries
const aiTips = {
    high: [
        'LLMs prioritize recent content in fast-moving industries',
        'Regular updates signal authority and expertise',
        'Fresh content is more likely to be cited in AI responses',
        'Structured, well-formatted content improves AI comprehension'
    ],
    medium: [
        'Balance between freshness and depth of content',
        'Focus on comprehensive updates rather than frequent minor changes',
        'Use clear headings and structure for better AI understanding',
        'Include relevant statistics and data to improve authority'
    ],
    low: [
        'Focus on comprehensive, in-depth content',
        'Quality over quantity in slower-moving industries',
        'Ensure content is well-structured for AI comprehension',
        'Include expert citations and references'
    ]
};

// DOM Elements
const industrySelect = document.getElementById('industry');
const otherIndustryInput = document.getElementById('otherIndustryInput');
const customIndustry = document.getElementById('customIndustry');
const cadenceSelect = document.getElementById('cadence');
const generateBtn = document.getElementById('generateBtn');
const results = document.getElementById('results');
const recommendationText = document.getElementById('recommendationText');
const toggleTipsBtn = document.getElementById('toggleTipsBtn');
const aiTipsDiv = document.getElementById('aiTips');
const tipsList = document.getElementById('tipsList');

// Event Listeners
industrySelect.addEventListener('change', handleIndustryChange);
generateBtn.addEventListener('click', generateRecommendation);
toggleTipsBtn.addEventListener('click', toggleTips);

// Handle industry selection change
function handleIndustryChange() {
    if (industrySelect.value === 'other') {
        otherIndustryInput.classList.remove('hidden');
    } else {
        otherIndustryInput.classList.add('hidden');
    }
}

// Generate recommendation based on inputs
function generateRecommendation() {
    const industry = industrySelect.value === 'other' ? customIndustry.value.toLowerCase() : industrySelect.value;
    const currentCadence = cadenceSelect.value;

    if (!industry || !currentCadence) {
        alert('Please select both industry and current cadence');
        return;
    }

    const industryInfo = industryConfig[industry] || {
        volatility: 'medium',
        recommendedCadence: 'monthly',
        reasoning: 'Regular updates help maintain content relevance and authority.'
    };

    // Show results section
    results.classList.remove('hidden');

    // Generate recommendation
    const recommendation = generateRecommendationText(industryInfo, currentCadence);
    recommendationText.textContent = recommendation;

    // Generate AI tips
    generateAITips(industryInfo.volatility);
}

// Generate recommendation text
function generateRecommendationText(industryInfo, currentCadence) {
    const cadenceMap = {
        weekly: 'weekly',
        biweekly: 'every two weeks',
        monthly: 'monthly',
        quarterly: 'quarterly'
    };

    const currentCadenceText = cadenceMap[currentCadence];
    const recommendedCadenceText = cadenceMap[industryInfo.recommendedCadence];

    return `${industryInfo.reasoning} Based on your current ${currentCadenceText} cadence, we recommend updating your content ${recommendedCadenceText} to maintain optimal visibility in AI search results.`;
}

// Generate AI tips
function generateAITips(volatility) {
    tipsList.innerHTML = '';
    const tips = aiTips[volatility];
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
}

// Toggle AI tips visibility
function toggleTips() {
    aiTipsDiv.classList.toggle('hidden');
} 