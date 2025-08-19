// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Benefit cards functionality
document.querySelectorAll('.card-animated-border').forEach(card => {
    card.addEventListener('click', function () {
        // Remove active class from all cards
        document.querySelectorAll('.card-animated-border').forEach(c =>
            c.classList.remove('active')
        );

        // Add active class to clicked card
        this.classList.add('active');

        let contentHTML = '';
        const benefitType = this.dataset.benefit;

        if (benefitType === "expand") {
            contentHTML = `
                        <div id="expand-chart-section" class="fade-in bg-white max-w-4xl mx-auto p-0 mt-4">
                            <h3 class="text-3xl font-bold text-center mb-4 text-[#1e293b]">Grow Your Practice</h3>
                            <p class="text-gray-700 text-center mb-8 text-lg">
                                Connect with a wider patient base looking for your specific expertise.<br>
                                Our platform helps new patients find you easily, leading to steady practice growth.
                            </p>
                            <div class="overflow-x-auto flex justify-center">
                                <canvas id="expandBarChart" width="750" height="340"></canvas>
                            </div>
                        </div>
                    `;
        } else if (benefitType === "streamline") {
            contentHTML = `
                        <div id="streamline-section" class="fade-in bg-white max-w-4xl mx-auto p-0 mt-4">
                            <h3 class="text-3xl font-bold text-center mb-4 text-[#1e293b]">Effortless Scheduling</h3>
                            <p class="text-gray-700 text-center mb-8 text-lg">
                                Say goodbye to chaotic scheduling. Our intuitive digital calendar allows patients to book appointments seamlessly,<br>
                                while you maintain full control.
                            </p>
                            <div class="flex flex-col md:flex-row gap-6 justify-center mb-8">
                                <div class="flex-1 bg-red-50 border border-red-200 rounded-xl flex flex-col items-center justify-center p-8 text-center mx-2">
                                    <div class="font-bold text-2xl md:text-2xl mb-2 text-red-600">Before DOCARE</div>
                                    <div class="text-lg text-red-600">Manual bookings, phone tag, and scheduling conflicts.</div>
                                </div>
                                <div class="flex-1 bg-green-50 border border-green-200 rounded-xl flex flex-col items-center justify-center p-8 text-center mx-2">
                                    <div class="font-bold text-2xl md:text-2xl mb-2 text-green-600">After DOCARE</div>
                                    <div class="text-lg text-green-600">Automated, organized, and conflict-free scheduling.</div>
                                </div>
                            </div>
                        </div>
                    `;
        } else if (benefitType === "enhance") {
            contentHTML = `
                        <div id="enhance-section" class="fade-in bg-white max-w-6xl mx-auto p-0 mt-4">
                            <h3 class="text-3xl font-bold text-center mb-4 text-[#1e293b]">The Seamless Patient Journey</h3>
                            <p class="text-gray-700 text-center mb-12 text-lg">
                                DOCARE provides a user-friendly experience from start to finish, building patient trust and loyalty in your practice.
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-4 text-center gap-8 mb-12">
                                <div>
                                    <div class="text-4xl font-bold mb-2">1.</div>
                                    <div class="font-semibold mb-1">Register &amp; Find</div>
                                    <div class="text-gray-500">Patient registers and finds your profile.</div>
                                </div>
                                <div>
                                    <div class="text-4xl font-bold mb-2">2.</div>
                                    <div class="font-semibold mb-1">Book Easily</div>
                                    <div class="text-gray-500">Books an appointment in seconds.</div>
                                </div>
                                <div>
                                    <div class="text-4xl font-bold mb-2">3.</div>
                                    <div class="font-semibold mb-1">Get Notified</div>
                                    <div class="text-gray-500">Receives timely reminders.</div>
                                </div>
                                <div>
                                    <div class="text-4xl font-bold mb-2">4.</div>
                                    <div class="font-semibold mb-1">Smooth Visit</div>
                                    <div class="text-gray-500">Arrives prepared for a smooth visit.</div>
                                </div>
                            </div>
                        </div>
                    `;
        }

        document.getElementById('benefit-content').innerHTML = contentHTML;

        // Handle chart rendering if needed
        if (benefitType === "expand") {
            setTimeout(() => {
                if (window.expandBarChartInstance) {
                    window.expandBarChartInstance.destroy();
                }

                const ctx = document.getElementById('expandBarChart').getContext('2d');
                window.expandBarChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [
                            {
                                label: 'Before DOCARE',
                                data: [15, 20, 18, 24, 21, 30],
                                backgroundColor: '#cbd5e1'
                            },
                            {
                                label: 'With DOCARE',
                                data: [25, 35, 40, 55, 60, 75],
                                backgroundColor: '#34d399'
                            }
                        ]
                    },
                    options: {
                        responsive: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: { font: { size: 15 } }
                            },
                            title: {
                                display: true,
                                text: 'Simulated New Patients Per Month',
                                font: { size: 17, weight: 'bold' }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (ctx) {
                                        return ctx.dataset.label + ': ' + ctx.parsed.y;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Number of New Patients',
                                    font: { size: 15 }
                                },
                                beginAtZero: true,
                                ticks: { stepSize: 10 },
                                grid: { color: '#e5e7eb' }
                            },
                            x: {
                                grid: { color: '#e5e7eb' }
                            }
                        }
                    }
                });

                // Scroll to the chart section
                const chartSec = document.getElementById('expand-chart-section');
                if (chartSec) {
                    chartSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 150);
        } else {
            // Scroll to the relevant section
            const sectionId = benefitType + '-section';
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Initialize Barchart on page load
window.addEventListener("DOMContentLoaded", function () {
    const chartCanvas = document.getElementById("expandBarChart");
    if (chartCanvas) {
        const ctx = chartCanvas.getContext("2d");
        window.expandBarChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    { label: "Before DOCARE", data: [15, 20, 18, 24, 21, 30], backgroundColor: "#cbd5e1" },
                    { label: "With DOCARE", data: [25, 35, 40, 55, 60, 75], backgroundColor: "#34d399" }
                ]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: { display: true, position: "top", labels: { font: { size: 15 } } },
                    title: { display: true, text: "Simulated New Patients Per Month", font: { size: 17, weight: "bold" } },
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                return ctx.dataset.label + ": " + ctx.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: { display: true, text: "Number of New Patients", font: { size: 15 } },
                        beginAtZero: true,
                        ticks: { stepSize: 10 },
                        grid: { color: "#e5e7eb" }
                    },
                    x: { grid: { color: "#e5e7eb" } }
                }
            }
        });
    }
});



// <!-- JavaScript to handle contact form  -->
document.addEventListener('DOMContentLoaded', function () {
    // Get all elements needed for the modal
    const contactBtns = document.querySelectorAll('#contact-btn, #contact-btn-mobile');
    const contactModal = document.getElementById('contact-modal');
    const contactFormContainer = document.getElementById('contact-form-container');
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalContent = contactModal.querySelector('.relative');

    // Function to open the modal with animation
    const openModal = () => {
        contactModal.classList.remove('hidden');
        // Trigger a reflow to restart the animation
        void modalContent.offsetWidth;
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
        // Hide any success message from previous use
        successMessage.classList.add('hidden');
        contactFormContainer.classList.remove('hidden');
    };

    // Function to close the modal with animation
    const closeModal = () => {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            contactModal.classList.add('hidden');
        }, 300); // Wait for the transition to finish
    };

    // Open modal when any contact button is clicked
    contactBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Close modal when the 'X' button is clicked
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the form content
    contactModal.addEventListener('click', function (e) {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally

        // Simulate sending data to a server
        // In a real application, you would send this data via AJAX (Fetch API or similar)
        console.log('Form submitted. Simulating data processing...');

        // Hide the form and show the success message
        contactFormContainer.classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Automatically close the modal after 3 seconds
        setTimeout(() => {
            closeModal();
            // Reset the form for the next use
            contactForm.reset();
            contactFormContainer.classList.remove('hidden');
        }, 3000); // 3000ms = 3 seconds
    });
});


// Doctor modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const doctorCards = document.querySelectorAll('.doctor-card');
    const doctorModal = document.getElementById('doctorModal');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Open modal with doctor data
    doctorCards.forEach(card => {
        card.addEventListener('click', function () {
            const doctorData = JSON.parse(this.getAttribute('data-doctor'));

            // Populate modal
            document.getElementById('modalDoctorImage').src = doctorData.image;
            document.getElementById('modalDoctorName').textContent = doctorData.name;
            document.getElementById('modalDoctorSpecialty').textContent = doctorData.specialty;
            document.getElementById('modalDoctorHospital').textContent = doctorData.hospital;
            document.getElementById('modalDoctorAddress').textContent = doctorData.address;
            document.getElementById('modalDoctorExperience').textContent = doctorData.experience;
            document.getElementById('modalDoctorQualification').textContent = doctorData.qualification;
            document.getElementById('modalDoctorContact').textContent = doctorData.contact;
            document.getElementById('modalDoctorFees').textContent = doctorData.fees;

            // Set appointment URL
            const appointmentBtn = document.getElementById('bookAppointmentBtn');
            appointmentBtn.href = `/appointment?doctor=${encodeURIComponent(doctorData.name)}`;

            // Show modal
            doctorModal.classList.remove('hidden');
        });
    });

    // Close modal handlers
    closeModal.addEventListener('click', () => doctorModal.classList.add('hidden'));
    closeModalBtn.addEventListener('click', () => doctorModal.classList.add('hidden'));
    doctorModal.addEventListener('click', (e) => {
        if (e.target === doctorModal) {
            doctorModal.classList.add('hidden');
        }
    });

    // Carousel functionality
    const slides = document.getElementById('doctorSlides');
    const leftBtn = document.getElementById('carouselLeft');
    const rightBtn = document.getElementById('carouselRight');
    const slideCount = document.querySelectorAll('#doctorSlides > div').length;
    let currentIndex = 0;

    function updateCarousel() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    leftBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slideCount - 1;
        updateCarousel();
    });

    rightBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slideCount - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
});
// Improved Carousel functionality with proper infinite loop
const slides = document.getElementById('doctorSlides');
const leftBtn = document.getElementById('carouselLeft');
const rightBtn = document.getElementById('carouselRight');
const slideItems = document.querySelectorAll('#doctorSlides > div');
let currentIndex = 0;

// Calculate how many slides are visible based on screen width
function getVisibleSlides() {
    return window.innerWidth < 640 ? 1 : 3;
}

// Update carousel position
function updateCarousel() {
    const slideWidth = 100 / getVisibleSlides();
    slides.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    slides.style.transition = 'transform 0.5s ease-in-out';
}

// Handle left button click
function moveLeft() {
    currentIndex--;
    if (currentIndex < 0) {
        // Jump to the end without animation
        slides.style.transition = 'none';
        currentIndex = slideItems.length - getVisibleSlides();
        updateCarousel();
        // Force reflow to make the transition work
        void slides.offsetWidth;
    }
    slides.style.transition = 'transform 0.5s ease-in-out';
    updateCarousel();
}

// Handle right button click
function moveRight() {
    currentIndex++;
    if (currentIndex > slideItems.length - getVisibleSlides()) {
        // Jump to the beginning without animation
        slides.style.transition = 'none';
        currentIndex = 0;
        updateCarousel();
        // Force reflow to make the transition work
        void slides.offsetWidth;
    }
    slides.style.transition = 'transform 0.5s ease-in-out';
    updateCarousel();
}

// Event listeners
leftBtn.addEventListener('click', moveLeft);
rightBtn.addEventListener('click', moveRight);

// Handle window resize
window.addEventListener('resize', () => {
    updateCarousel();
});

// Initialize carousel
updateCarousel();
// Filter button styling
// const filterButtons = document.querySelectorAll('.filter-btn');
// filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         // Remove active styles from all buttons
//         filterButtons.forEach(btn => {
//             btn.classList.remove(
//                 'bg-gradient-to-r', 'from-[#3acfd5]', 'to-[#3a9dd5]', 'text-white'
//             );
//             btn.classList.add(
//                 'bg-gray-200', 'text-gray-700'
//             );
//         });

//         // Add active styles to clicked button
//         button.classList.remove('bg-gray-200', 'text-gray-700');
//         button.classList.add('bg-gradient-to-r', 'from-[#3acfd5]', 'to-[#3a9dd5]', 'text-white');
//     });
// });
