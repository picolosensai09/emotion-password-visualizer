# 🔐 Emotion-Based Password Strength Visualizer

A responsive, interactive password strength checker that uses **emotional feedback** instead of traditional progress bars. The interface features a custom-built CSS animated face that reacts in real-time to the complexity of the user's input.

> **Live Demo:** [Insert Link Here (e.g., GitHub Pages)]  
> *(If you haven't set up GitHub Pages yet, you can remove this line or add it later)*

## 💡 Core Concept
Standard password checkers use boring green bars. This project aims to improve **User Experience (UX)** by humanizing the feedback loop.
- **Weak passwords** make the face nervous, sweating, or sad.
- **Strong passwords** make the face confident, happy, and eventually "Heroic."

## 🚀 Features
- **Zero Dependencies:** Built entirely with Vanilla JavaScript, HTML5, and CSS3.
- **CSS-Only Graphics:** The face is drawn using CSS shapes and `border-radius` manipulation (no images/SVGs), ensuring fast load times and smooth morphing animations.
- **Weighted Scoring Algorithm:** Uses Regex to analyze:
  - Length & Character Diversity (Upper, Lower, Number, Symbol).
  - Penalty Patterns (Sequential inputs like `123`, `abc`, repeated chars).
- **6 Emotional States:** Neutral, Very Weak (Shake/Sweat), Weak (Sad), Medium (Thinking), Strong (Happy), Heroic (Bounce/Glow).
- **Accessibility:** Semantic HTML and ARIA labels.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Variables, Flexbox, Keyframes)
- **Logic:** JavaScript (ES6+)
- **Tools:** Git, Eclipse

## 📂 Project Structure
```text
/emotion-password-visualizer
│
├── index.html      # Semantic structure & DOM elements
├── style.css       # CSS Variables, Face drawing, Animations
├── script.js       # Scoring logic (Regex) & DOM manipulation
└── README.md       # Project documentation
