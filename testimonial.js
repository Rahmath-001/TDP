class VideoTestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 18;
        this.slidesPerView = 4;
        this.videoTrack = document.getElementById('videoTrack');
        this.dotsContainer = document.getElementById('dotsContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');

        if (!this.videoTrack || !this.dotsContainer || !this.prevBtn || !this.nextBtn) {
            console.error("One or more DOM elements could not be found.");
            return;
        }

        this.init();
        this.bindEvents();
        this.updateResponsiveSlides();
    }

    init() {
        console.log("Initializing VideoTestimonialSlider...");
        this.createVideoSlides();
        this.createDots();
        this.updateSlider();
    }

    createVideoSlides() {
        const testimonials = [
            { name: "Sarah Johnson", title: "Marketing Director" },
            { name: "Mike Chen", title: "Small Business Owner" },
            { name: "Emily Rodriguez", title: "Freelance Designer" },
            { name: "David Kim", title: "Tech Entrepreneur" },
            { name: "Lisa Thompson", title: "E-commerce Manager" },
            { name: "Alex Wilson", title: "Startup Founder" },
            { name: "Maria Garcia", title: "Creative Director" },
            { name: "James Brown", title: "Digital Marketer" },
            { name: "Anna Lee", title: "Product Manager" },
            { name: "Chris Taylor", title: "Business Consultant" },
            { name: "Sarah Johnson", title: "Marketing Director" },
            { name: "Mike Chen", title: "Small Business Owner" },
            { name: "Emily Rodriguez", title: "Freelance Designer" },
            { name: "David Kim", title: "Tech Entrepreneur" },
            { name: "Lisa Thompson", title: "E-commerce Manager" },
            { name: "Alex Wilson", title: "Startup Founder" },
            { name: "Maria Garcia", title: "Creative Director" },
            { name: "James Brown", title: "Digital Marketer" },
        ];

        testimonials.forEach((testimonial, index) => {
            const videoPath = `${BASE_URL}videos/video${index}.mp4`;

            const slide = document.createElement('div');
            slide.className = 'video-slide';
            slide.innerHTML = `
                <video loop preload="metadata">
                    <source src="${videoPath}" type="video/mp4" loading="lazy">
                    Your browser does not support the video tag.
                </video>
                            <div class="logo-button-wrapper">
                <img src="${BASE_URL}images/TDPlogosquare.png" alt="Logo" class="slide-logo" loading="lazy" />
                <button class="play-button"></button>
            </div>
                <div class="video-overlay">
                </div>
            `;

            const video = slide.querySelector('video');
            video.onerror = () => {
                console.warn(`Video not found: ${videoPath}`);
                slide.remove();
            };

            this.videoTrack.appendChild(slide);
        });

        console.log("Slides created:", this.videoTrack.innerHTML);
    }

    createDots() {
        const maxDots = Math.ceil(this.totalSlides / this.slidesPerView);
        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => this.goToSlide(i);
            this.dotsContainer.appendChild(dot);
        }

        console.log("Dots created:", this.dotsContainer.innerHTML);
    }

    toggleVideo(video, slide) {
        const playButton = slide.querySelector('.play-button');
        if (video.paused) {
            this.pauseAllVideos();
            video.play();
            slide.classList.add('playing');
            playButton.classList.add('playing');
        } else {
            video.pause();
            slide.classList.remove('playing');
            playButton.classList.remove('playing');
        }
    }

    pauseAllVideos() {
        const videos = this.videoTrack.querySelectorAll('video');
        const slides = this.videoTrack.querySelectorAll('.video-slide');
        videos.forEach((video) => video.pause());
        slides.forEach((slide) => slide.classList.remove('playing'));
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        const playButtons = this.videoTrack.querySelectorAll('.play-button');
        playButtons.forEach((btn, index) => {
            const slide = this.videoTrack.children[index];
            const video = slide.querySelector('video');
            btn.addEventListener('click', () => this.toggleVideo(video, slide));
        });

        console.log("Event bindings complete.");
    }

updateSlider() {
  if (window.innerWidth <= 768) {
    // On mobile, let scroll handle it
    this.videoTrack.style.transform = 'none';
    return;
  }

  const slideWidth = this.videoTrack.children[0]?.offsetWidth || 280;
  const offset = -this.currentSlide * slideWidth * this.slidesPerView;
  this.videoTrack.style.transform = `translateX(${offset}px)`;

  const dots = this.dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === this.currentSlide);
  });

  const maxSlides = Math.ceil(this.totalSlides / this.slidesPerView) - 1;
  this.prevBtn.disabled = this.currentSlide === 0;
  this.nextBtn.disabled = this.currentSlide >= maxSlides;
}

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlider();
            console.log(`Moved to previous slide: ${this.currentSlide}`);
        }
    }

    nextSlide() {
        const maxSlides = Math.ceil(this.totalSlides / this.slidesPerView) - 1;
        if (this.currentSlide < maxSlides) {
            this.currentSlide++;
            this.updateSlider();
            console.log(`Moved to next slide: ${this.currentSlide}`);
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
        console.log(`Jumped to slide: ${this.currentSlide}`);
    }

    updateResponsiveSlides() {
        const updateSlides = () => {
            const width = window.innerWidth;
            if (width <= 480) {
                this.slidesPerView = 1;
            } else if (width <= 768) {
                this.slidesPerView = 2;
            } else if (width <= 1024) {
                this.slidesPerView = 3;
            } else {
                this.slidesPerView = 4;
            }

            this.dotsContainer.innerHTML = '';
            this.createDots();
            this.updateSlider();

            console.log(`Responsive update: Slides per view = ${this.slidesPerView}`);
        };

        window.addEventListener('resize', updateSlides);
        updateSlides();
    }
}

// Initialize the slider when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VideoTestimonialSlider();
});
