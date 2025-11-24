document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    
    if (burger && menu) {
        burger.addEventListener('click', function() {
            this.classList.toggle('header__burger--active');
            menu.classList.toggle('header__menu--active');
        });

        document.querySelectorAll('.header__menu-item').forEach(item => {
            item.addEventListener('click', function() {
                burger.classList.remove('header__burger--active');
                menu.classList.remove('header__menu--active');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    const track = document.querySelector('.products__track');
    if (track) {
        const indicators = document.querySelectorAll('.products__indicator');
        const prevBtn = document.querySelector('.products__nav--prev');
        const nextBtn = document.querySelector('.products__nav--next');
        const productCards = document.querySelectorAll('.products__card');
        
        const cardWidth = 285 + 20;
        let currentIndex = 0;
        const totalCards = productCards.length;

        function updateCarousel() {
            if (window.innerWidth > 767) {
                const translateX = -currentIndex * cardWidth;
                track.style.transform = `translateX(${translateX}px)`;
                
                indicators.forEach((indicator, index) => {
                    const targetIndex = parseInt(indicator.getAttribute('data-index'));
                    indicator.classList.toggle('products__indicator--active', currentIndex === targetIndex);
                });
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalCards - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        indicators.forEach((indicator) => {
            indicator.addEventListener('click', () => {
                currentIndex = parseInt(indicator.getAttribute('data-index'));
                updateCarousel();
            });
        });

        let autoSlideInterval;
        if (window.innerWidth > 767) {
            autoSlideInterval = setInterval(() => {
                if (currentIndex < totalCards - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            }, 5000);
        }

        const carousel = document.querySelector('.products__carousel');
        if (carousel && window.innerWidth > 767) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            carousel.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    if (currentIndex < totalCards - 1) {
                        currentIndex++;
                    } else {
                        currentIndex = 0;
                    }
                    updateCarousel();
                }, 5000);
            });
        }

        updateCarousel();
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            
            if (!name || !phone) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    document.querySelectorAll('.btn--color-wb, .btn--color-ozon').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });

    document.querySelectorAll('.footer__social').forEach(social => {
        social.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const hero = document.querySelector('.hero');
        
        if (header && hero) {
            const heroHeight = hero.offsetHeight;
            
            if (window.pageYOffset > heroHeight - 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.advantages__card, .reviews__card, .products__card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    setTimeout(animateOnScroll, 500);
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const track = document.querySelector('.products__track');
            if (track && window.innerWidth > 767) {
                updateCarousel();
            }
        }, 250);
    });
});