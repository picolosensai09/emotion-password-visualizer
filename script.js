document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordInput = document.getElementById('password-input');
    const toggleBtn = document.getElementById('toggle-password');
    const face = document.getElementById('face');
    const emotionTitle = document.getElementById('emotion-title');
    const emotionDesc = document.getElementById('emotion-desc');
    const tipsContainer = document.getElementById('tips-container');

    // State Constants
    const STATES = {
        NEUTRAL: { class: 'state-neutral', title: 'Waiting', desc: 'I am ready to judge.' },
        VERY_WEAK: { class: 'state-very-weak', title: 'Oh no...', desc: 'This is terrifyingly weak! 😱' },
        WEAK: { class: 'state-weak', title: 'Worried', desc: 'I think we can do better. 😟' },
        MEDIUM: { class: 'state-medium', title: 'Hmm...', desc: 'It is okay, but not great. 🤔' },
        STRONG: { class: 'state-strong', title: 'Good!', desc: 'Now we are talking! 🙂' },
        HEROIC: { class: 'state-heroic', title: 'Heroic!', desc: 'Unbreakable! You are a legend! 🛡️' }
    };

    /**
     * Logic: Calculate Password Score
     * Returns object { score: number, tips: array }
     */
    function calculateStrength(password) {
        let score = 0;
        let tips = [];

        if (!password) return { score: 0, tips: [] };

        // 1. Length Check (Base Score)
        if (password.length > 4) score += 10;
        if (password.length > 8) score += 20;
        if (password.length >= 12) score += 20;
        
        if (password.length < 8) tips.push("Use at least 8 characters.");

        // 2. Diversity Checks
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (hasLower) score += 5;
        if (hasUpper) score += 10;
        if (hasNumber) score += 10;
        if (hasSpecial) score += 15;

        // Diversity Tips
        if (!hasUpper) tips.push("Add uppercase letters.");
        if (!hasNumber) tips.push("Add numbers.");
        if (!hasSpecial) tips.push("Add symbols (!@#$).");

        // 3. Penalty Patterns
        // Check for sequential patterns (e.g., "123", "abc")
        const sequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)+/i;
        if (sequential.test(password)) {
            score -= 20;
            tips.push("Avoid sequences like 'abc' or '123'.");
        }

        // Check for repeated characters (e.g., "aaa")
        if (/(.)\1{2,}/.test(password)) {
            score -= 10;
            tips.push("Don't repeat characters excessively.");
        }

        // Check common keyboard patterns (basic check)
        if (/qwerty|asdfgh|zxcvbn/i.test(password)) {
            score -= 30;
            tips.push("Avoid keyboard patterns like 'qwerty'.");
        }

        // Clamp score between 0 and 100
        return { score: Math.max(0, Math.min(100, score)), tips };
    }

    /**
     * UI Logic: Determine State based on Score
     */
    function getEmotionState(score) {
        if (score === 0) return STATES.NEUTRAL;
        if (score < 30) return STATES.VERY_WEAK;
        if (score < 50) return STATES.WEAK;
        if (score < 75) return STATES.MEDIUM;
        if (score < 90) return STATES.STRONG;
        return STATES.HEROIC;
    }

    /**
     * Renderer: Update DOM
     */
    function updateUI(state, tips, passwordLength) {
        // Remove all previous state classes
        Object.values(STATES).forEach(s => face.classList.remove(s.class));
        
        // Add new state class
        if(passwordLength === 0) {
             face.classList.add(STATES.NEUTRAL.class);
             emotionTitle.textContent = STATES.NEUTRAL.title;
             emotionDesc.textContent = STATES.NEUTRAL.desc;
             emotionTitle.style.color = 'var(--text-main)';
             tipsContainer.innerHTML = '';
             return;
        }

        face.classList.add(state.class);
        
        // Text Updates
        emotionTitle.textContent = state.title;
        emotionDesc.textContent = state.desc;

        // Dynamic Color for Title
        // Note: In a real app we might map this cleaner, but this works nicely
        const computedColor = getComputedStyle(face).getPropertyValue('--face-color');
        emotionTitle.style.color = computedColor;

        // Tips Update
        if (state === STATES.HEROIC) {
             tipsContainer.innerHTML = ''; // No tips needed for perfection
        } else {
            // Show max 2 relevant tips to avoid clutter
            const visibleTips = tips.slice(0, 2);
            tipsContainer.innerHTML = visibleTips.map(t => `<span class="tip-item">💡 ${t}</span>`).join('');
        }
    }

    // Event Listeners
    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        const result = calculateStrength(password);
        const emotion = getEmotionState(result.score);
        updateUI(emotion, result.tips, password.length);
    });

    toggleBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleBtn.style.opacity = type === 'text' ? '1' : '0.6';
    });
});