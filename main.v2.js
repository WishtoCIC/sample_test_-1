
const generatorBtn = document.getElementById('generator-btn');
const resultsContainer = document.getElementById('lotto-results-container');
const bonusCheckbox = document.getElementById('bonus-checkbox');
const themeBtn = document.getElementById('theme-btn');

// Theme Management
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeBtn.textContent = theme === 'light' ? '☀️' : '🌙';
}

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

generatorBtn.addEventListener('click', () => {
    // Clear previous results
    resultsContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        
        const sortedNumbers = generateLottoNumbers();
        
        sortedNumbers.forEach((num, index) => {
            const numEl = document.createElement('div');
            numEl.className = 'number';
            numEl.textContent = num;
            numEl.style.animationDelay = `${(i * 100) + (index * 50)}ms`;
            row.appendChild(numEl);
        });

        if (bonusCheckbox.checked) {
            const numbersSet = new Set(sortedNumbers);
            let bonusNumber;
            do {
                bonusNumber = Math.floor(Math.random() * 45) + 1;
            } while (numbersSet.has(bonusNumber));

            const bonusLabel = document.createElement('span');
            bonusLabel.className = 'bonus-label';
            bonusLabel.textContent = '+';
            row.appendChild(bonusLabel);

            const bonusEl = document.createElement('div');
            bonusEl.className = 'number bonus-number';
            bonusEl.textContent = bonusNumber;
            bonusEl.style.animationDelay = `${(i * 100) + (6 * 50)}ms`;
            row.appendChild(bonusEl);
        }

        resultsContainer.appendChild(row);
    }
});
