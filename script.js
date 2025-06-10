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
const calendar = document.getElementById('calendar');
const embedCode = document.getElementById('embedCode');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');

// Event Listeners
industrySelect.addEventListener('change', handleIndustryChange);
generateBtn.addEventListener('click', generateCalendar);
toggleTipsBtn.addEventListener('click', toggleTips);
copyCodeBtn.addEventListener('click', copyEmbedCode);
exportPdfBtn.addEventListener('click', exportToPDF);

// Handle industry selection change
function handleIndustryChange() {
    if (industrySelect.value === 'other') {
        otherIndustryInput.classList.remove('hidden');
    } else {
        otherIndustryInput.classList.add('hidden');
    }
}

// Generate calendar based on inputs
function generateCalendar() {
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
    const recommendation = generateRecommendation(industryInfo, currentCadence);
    recommendationText.textContent = recommendation;

    // Generate AI tips
    generateAITips(industryInfo.volatility);

    // Generate calendar
    generateCalendarView(industryInfo.recommendedCadence);

    // Generate embed code
    generateEmbedCode(industry);
}

// Generate recommendation text
function generateRecommendation(industryInfo, currentCadence) {
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

// Generate calendar view
function generateCalendarView(recommendedCadence) {
    const today = new Date();
    const months = [];
    
    // Generate 3 months of dates
    for (let i = 0; i < 3; i++) {
        const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
        months.push(month);
    }

    // Create calendar HTML
    let calendarHTML = '<div class="calendar-grid">';
    
    months.forEach(month => {
        calendarHTML += generateMonthView(month, recommendedCadence);
    });

    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;
}

// Generate month view
function generateMonthView(date, recommendedCadence) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    let html = `
        <div class="month">
            <h3>${monthNames[date.getMonth()]} ${date.getFullYear()}</h3>
            <div class="days">
                <div class="day-header">Sun</div>
                <div class="day-header">Mon</div>
                <div class="day-header">Tue</div>
                <div class="day-header">Wed</div>
                <div class="day-header">Thu</div>
                <div class="day-header">Fri</div>
                <div class="day-header">Sat</div>
    `;

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        html += '<div class="day empty"></div>';
    }

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        const isUpdateDay = isRecommendedUpdateDay(currentDate, recommendedCadence);
        
        html += `
            <div class="day ${isUpdateDay ? 'update-day' : ''}">
                ${day}
                ${isUpdateDay ? '<span class="update-marker">Update</span>' : ''}
            </div>
        `;
    }

    html += '</div></div>';
    return html;
}

// Check if a date is a recommended update day
function isRecommendedUpdateDay(date, recommendedCadence) {
    const day = date.getDay();
    const weekNumber = Math.floor((date.getDate() - 1) / 7);

    switch (recommendedCadence) {
        case 'weekly':
            return day === 2; // Tuesday
        case 'biweekly':
            return day === 2 && weekNumber % 2 === 0; // Every other Tuesday
        case 'monthly':
            return date.getDate() === 15; // 15th of each month
        case 'quarterly':
            return date.getDate() === 1 && date.getMonth() % 3 === 0; // First day of each quarter
        default:
            return false;
    }
}

// Generate embed code
function generateEmbedCode(industry) {
    const code = `<iframe src="https://sodapork.github.io/content_cadence_tool?industry=${industry}" width="100%" height="400"></iframe>`;
    embedCode.textContent = code;
}

// Copy embed code to clipboard
function copyEmbedCode() {
    const code = embedCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyCodeBtn.textContent = originalText;
        }, 2000);
    });
}

// Export calendar to PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Content Update Calendar', 20, 20);
    
    // Add recommendation
    doc.setFontSize(12);
    doc.text(recommendationText.textContent, 20, 30, { maxWidth: 170 });
    
    // Add calendar
    // Note: This is a simplified version. For a full implementation,
    // you would need to use html2canvas or similar to capture the calendar view
    doc.setFontSize(10);
    doc.text('Calendar view would be rendered here', 20, 50);
    
    // Save the PDF
    doc.save('content-calendar.pdf');
} 