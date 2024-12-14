// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});


// Adding interactivity to books
const books = document.querySelectorAll('.book');
books.forEach((book, index) => {
    book.addEventListener('mouseover', () => {
        book.style.transform = 'scale(1.2) rotateY(360deg)';
        book.style.transition = 'transform 0.6s';
    });

    book.addEventListener('mouseout', () => {
        book.style.transform = 'scale(1)';
    });
});
// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.round(current) + '+';
        }, 20);
    });
}

// Trigger stats animation when section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

const missionSection = document.querySelector('.mission-section');
if (missionSection) {
    observer.observe(missionSection);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});