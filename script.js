$(document).ready(function() {
    // Course data
    const courseData = [
        {
            id: 1,
            title: "Introduction to Computers",
            subtitle: "Understanding what computers are and how they work",
            videoId: "8l5BGrqj2UI",
            description: "In this lesson, you'll discover what computers are, how they work, and how they can make your daily life easier and more convenient.",
            keyPoints: [
                "Understanding computer components",
                "How computers process information", 
                "Benefits of using computers",
                "Basic computer terminology"
            ]
        },
        {
            id: 2,
            title: "Mouse Skills",
            subtitle: "Learning to navigate and click with confidence",
            videoId: "EFuI7FRw0gc",
            description: "Master the art of using a mouse to navigate your computer screen, click on items, and perform basic operations.",
            keyPoints: [
                "Moving the mouse cursor",
                "Left-clicking and right-clicking",
                "Double-clicking techniques",
                "Scrolling and navigation"
            ]
        },
        {
            id: 3,
            title: "Keyboard Basics",
            subtitle: "Typing letters, numbers, and basic commands",
            videoId: "0rhQT1rFszA",
            description: "Learn to use the keyboard effectively for typing, shortcuts, and communicating with your computer.",
            keyPoints: [
                "Letter and number keys",
                "Special keys and functions",
                "Typing techniques",
                "Keyboard shortcuts"
            ]
        },
        {
            id: 5,
            title: "Desktop Navigation",
            subtitle: "Understanding icons, menus, and programs",
            videoId: "ioXRs1gQ_bM",
            description: "Navigate your computer's desktop environment, understand icons, and learn to open and close programs.",
            keyPoints: [
                "Understanding desktop icons",
                "Using the Start menu",
                "Opening and closing programs",
                "Managing windows"
            ]
        },
        {
            id: 6,
            title: "File Management",
            subtitle: "Saving, organizing, and finding your files",
            videoId: "m1F3F-_z36M",
            description: "Learn to organize your digital life by creating folders, saving files, and keeping everything tidy.",
            keyPoints: [
                "Creating folders and files",
                "Naming and organizing files",
                "Finding saved documents",
                "File management best practices"
            ]
        },
        {
            id: 7,
            title: "Internet & Email",
            subtitle: "Safe browsing and communication online",
            videoId: "Efx8SB1IyxY",
            description: "Discover the internet safely, learn to browse websites, and communicate through email.",
            keyPoints: [
                "Safe internet browsing",
                "Understanding websites",
                "Creating and using email",
                "Online safety tips"
            ]
        },
        {
            id: 8,
            title: "Safe Shutdown",
            subtitle: "Properly turning off your computer",
            videoId: "GIkwkBJk8UQ",
            description: "Learn the proper way to shut down your computer to protect your files and maintain system health.",
            keyPoints: [
                "Why proper shutdown matters",
                "Step-by-step shutdown process",
                "Protecting your work",
                "Computer maintenance basics"
            ]
        }
    ];

    let currentLesson = 0;
    let completedLessons = [];
    let isPracticeScreen = false;

    // Initialize the application
    function init() {
        bindEvents();
        updateProgress();
        loadProgress();
        console.log('Senior Computer Course - FINAL VERSION initialized');
    }

    // Bind event handlers
    function bindEvents() {
        // Welcome screen
        $('#intro-video-btn').on('click', startCourse);
        $('#start-course-btn').on('click', startCourse);
        $('#preview-course-btn').on('click', previewCourse);

        // Lesson navigation
        $('#prev-lesson-btn').on('click', previousLesson);
        $('#next-lesson-btn').on('click', nextLesson);

        // Practice screen
        $('#open-practice-btn').on('click', openPractice);
        $('#continue-course-btn').on('click', continueAfterPractice);

        // Completion screen
        $('#restart-course-btn').on('click', restartCourse);

        // Help modal
        $('#help-btn').on('click', showHelpModal);
        $('#close-help-btn').on('click', closeHelpModal);
        $('#help-modal').on('click', function(e) {
            if (e.target === this) {
                closeHelpModal();
            }
        });

        // Logo click - go back to homepage
        $('#nav-brand').on('click', function() {
            showWelcomeScreen();
        });

        // Module navigation - Click on module cards
        $('.module-card').on('click', function() {
            const moduleId = $(this).data('module');
            if (moduleId === 4) {
                showPracticeScreen();
            } else {
                const lessonIndex = courseData.findIndex(lesson => lesson.id === moduleId);
                if (lessonIndex !== -1) {
                    currentLesson = lessonIndex;
                    showLesson(currentLesson);
                }
            }
        });

        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeHelpModal();
            }
            if (e.key === 'ArrowLeft' && !isPracticeScreen) {
                previousLesson();
            }
            if (e.key === 'ArrowRight' && !isPracticeScreen) {
                nextLesson();
            }
        });
    }

    // Start the course
    function startCourse() {
        showLesson(0);
        trackProgress('course_started');
    }

    // Preview the course
    function previewCourse() {
        showLesson(0);
        trackProgress('course_previewed');
    }

    // Show lesson
    function showLesson(lessonIndex) {
        if (lessonIndex < 0 || lessonIndex >= courseData.length) return;

        const lesson = courseData[lessonIndex];
        currentLesson = lessonIndex;
        isPracticeScreen = false;

        // Hide all screens
        $('.screen').removeClass('active');
        $('#lesson-screen').addClass('active');

        // Update lesson content
        $('#current-lesson-num').text(lesson.id);
        $('#current-lesson-title').text(lesson.title);
        $('#current-lesson-subtitle').text(lesson.subtitle);
        $('#lesson-description').text(lesson.description);
        
        // Update key points
        const keyPointsList = $('#lesson-key-points');
        keyPointsList.empty();
        lesson.keyPoints.forEach(point => {
            keyPointsList.append(`<li>${point}</li>`);
        });

        // Update video
        const videoUrl = `https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0&modestbranding=1`;
        $('#lesson-video').attr('src', videoUrl);

        // Update navigation buttons
        updateNavigationButtons();

        // Update module cards
        updateModuleCards(lesson.id);

        // Mark lesson as completed
        if (!completedLessons.includes(lesson.id)) {
            completedLessons.push(lesson.id);
            saveProgress();
        }

        // Update progress
        updateProgress();

        // Track progress
        trackProgress(`lesson_${lesson.id}_viewed`);
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        const prevBtn = $('#prev-lesson-btn');
        const nextBtn = $('#next-lesson-btn');

        // Previous button
        if (currentLesson === 0) {
            prevBtn.prop('disabled', true);
        } else {
            prevBtn.prop('disabled', false);
        }

        // Next button
        if (currentLesson === courseData.length - 1) {
            nextBtn.html('<span>Finish Course</span><i class="fas fa-check"></i>');
        } else if (currentLesson === 2) {
            nextBtn.html('<span>Go to Practice</span><i class="fas fa-dumbbell"></i>');
        } else {
            nextBtn.html('<span>Next Lesson</span><i class="fas fa-chevron-right"></i>');
        }
    }

    // Update module cards
    function updateModuleCards(activeModuleId) {
        $('.module-card').removeClass('active');
        if (activeModuleId === 'completed') {
            $('.module-card').addClass('completed');
        } else {
            $(`.module-card[data-module="${activeModuleId}"]`).addClass('active');
        }
    }

    // Previous lesson
    function previousLesson() {
        if (currentLesson > 0) {
            currentLesson--;
            showLesson(currentLesson);
        }
    }

    // Next lesson
    function nextLesson() {
        if (currentLesson === courseData.length - 1) {
            showCompletionScreen();
        } else if (currentLesson === 2) {
            showPracticeScreen();
        } else {
            currentLesson++;
            showLesson(currentLesson);
        }
    }

    // Show practice screen
    function showPracticeScreen() {
        $('.screen').removeClass('active');
        $('#practice-screen').addClass('active');
        isPracticeScreen = true;
        updateModuleCards(4);
        trackProgress('practice_viewed');
    }

    // Open practice platform
    function openPractice() {
        window.open('https://elderlearn.knowhalim.com', '_blank');
        showNotification('Practice platform opened! Complete the exercises and return here to continue.', 'success');
        trackProgress('practice_opened');
    }

    // Continue after practice
    function continueAfterPractice() {
        currentLesson = 4; // Skip to desktop navigation
        showLesson(currentLesson);
    }

    // Show completion screen
    function showCompletionScreen() {
        $('.screen').removeClass('active');
        $('#completion-screen').addClass('active');
        updateModuleCards('completed');
        trackProgress('course_completed');
    }

    // Restart course
    function restartCourse() {
        currentLesson = 0;
        completedLessons = [];
        saveProgress();
        updateProgress();
        showLesson(0);
        trackProgress('course_restarted');
    }

    // Update progress
    function updateProgress() {
        const totalLessons = courseData.length + 1; // +1 for practice
        const completedCount = completedLessons.length;
        const percentage = Math.round((completedCount / totalLessons) * 100);
        
        $('#progress-percentage').text(percentage + '%');
        $('#progress-fill').css('width', percentage + '%');
    }

    // Show help modal
    function showHelpModal() {
        $('#help-modal').addClass('active');
        trackProgress('help_opened');
    }

    // Close help modal
    function closeHelpModal() {
        $('#help-modal').removeClass('active');
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `);

        // Add to page
        $('body').append(notification);

        // Show notification
        setTimeout(() => {
            notification.addClass('show');
        }, 100);

        // Hide notification
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Save progress to localStorage
    function saveProgress() {
        const progress = {
            currentLesson: currentLesson,
            completedLessons: completedLessons,
            timestamp: Date.now()
        };
        localStorage.setItem('seniorCourseProgress', JSON.stringify(progress));
    }

    // Load progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem('seniorCourseProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                currentLesson = progress.currentLesson || 0;
                completedLessons = progress.completedLessons || [];
                updateProgress();
            } catch (e) {
                console.log('Error loading progress:', e);
            }
        }
    }

    // Track progress (analytics)
    function trackProgress(event) {
        console.log('Progress tracked:', event);
        // Here you would typically send data to an analytics service
    }

    // Initialize the application
    init();
});

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: #1e1e1e;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    border-left: 4px solid #3b82f6;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 400px;
    border: 1px solid #333333;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: #10b981;
}

.notification-success i {
    color: #10b981;
}

.notification-info {
    border-left-color: #3b82f6;
}

.notification-info i {
    color: #3b82f6;
}

.notification span {
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: 500;
}
`;

// Add notification styles to head
$('head').append(`<style>${notificationStyles}</style>`);
