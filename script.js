document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const magnifier = document.querySelector('.magnifying-glass');
    const artwork = document.querySelector('.artwork');
    const revealBtn = document.querySelector('.reveal-btn');
    const inputs = document.querySelectorAll('.magic-input');
    const plusBtn = document.getElementById('plusBtn');
    const bioPopup = document.getElementById('bioPopup');
    const plusPopup = document.getElementById('tooltipText');
    const overlay = document.getElementById('overlay');
    const closeButtons = document.querySelectorAll('.close-btn');
    const tooltipText = document.querySelector('.tooltip-text');
    const artistName = document.querySelector('.semibold');

    function updateZoom(e) {
        const rect = artwork.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const maxX = rect.width - magnifier.offsetWidth;
        const maxY = rect.height - magnifier.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(maxX, x - magnifier.offsetWidth / 2));
        const boundedY = Math.max(0, Math.min(maxY, y - magnifier.offsetHeight / 2));
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            magnifier.style.display = 'block';
            magnifier.style.left = `${boundedX}px`;
            magnifier.style.top = `${boundedY}px`;
            magnifier.style.backgroundImage = `url(${artwork.src})`;
            magnifier.style.backgroundPosition = `${-x * 2 + magnifier.offsetWidth/2}px ${-y * 2 + magnifier.offsetHeight/2}px`;
            magnifier.style.backgroundSize = `${artwork.width * 2}px`;
        } else {
            magnifier.style.display = 'none';
        }
    }

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    function getRandomColor() {
        const colors = [
            '#b5f0de',
            '#fab8a1',
            '#faf7ba',
            '#c2b2ff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function showAnswerPopup(answer, index) {
        overlay.style.display = 'block';
        const popup = document.getElementById(`answer${index + 1}Popup`);
        popup.querySelector('.answer-text').textContent = answer;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
    }

    function handleReveal() {
        inputs.forEach((input, index) => {
            if (input.value.trim()) {
                showAnswerPopup(input.value, index);
            }
        });
    }

    // Event Listeners
    artwork.addEventListener('mousemove', updateZoom);
    artwork.addEventListener('mouseleave', () => {
        magnifier.style.display = 'none';
    });

    // Bio icon opens bio
    bioBtn.addEventListener('click', () => {
        overlay.style.display = 'block';
        bioPopup.style.display = 'block';
    });
      // Plus icon opens bio
  plusBtn.addEventListener('click', () => {
    if (tooltipText.style.visibility === 'visible') {
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.display = 'none';
    } else {
        tooltipText.style.visibility = 'visible';
        tooltipText.style.display = 'block';
    }
});

    artistName.addEventListener('click', () => {
    overlay.style.display = 'block';
    bioPopup.style.display = 'block';
});
    // Close functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            if (popup.classList.contains('transport-popup')) {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                }, 500);
            } else {
                overlay.style.display = 'none';
                popup.style.display = 'none';
            }
        });
    });

    // Close on overlay click
 closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        if (popup.classList.contains('transport-popup')) {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
                overlay.style.display = 'none';
            }, 500);
        } else {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        }
    });
});

    document.addEventListener('click', (e) => {
    if (!e.target.matches('#plusBtn') && !e.target.closest('.tooltip-text')) {
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.display = 'none';
    }
});

    revealBtn.addEventListener('click', handleReveal);
    
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleReveal();
            }
        });
    });
});
