
const generatorBtn = document.getElementById('generator-btn');
const numberPlaceholders = document.querySelectorAll('.lotto-numbers .number-placeholder');
const bonusPlaceholder = document.getElementById('bonus-placeholder');
const bonusCheckbox = document.getElementById('bonus-checkbox');

generatorBtn.addEventListener('click', () => {
    // Reset styles
    [...numberPlaceholders, bonusPlaceholder].forEach(placeholder => {
        placeholder.textContent = '';
        placeholder.classList.remove('number');
    });

    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const placeholder = numberPlaceholders[index];
            placeholder.textContent = number;
            placeholder.classList.add('number');
        }, index * 200); // Stagger the animation
    });

    if (bonusCheckbox.checked) {
        let bonusNumber;
        do {
            bonusNumber = Math.floor(Math.random() * 45) + 1;
        } while (numbers.has(bonusNumber));

        setTimeout(() => {
            bonusPlaceholder.textContent = bonusNumber;
            bonusPlaceholder.classList.add('number');
        }, 6 * 200); // Stagger the animation
    }
});
