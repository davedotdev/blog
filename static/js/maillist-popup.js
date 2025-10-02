(function() {
    'use strict';

    // Configuration
    const CACHE_KEY = 'maillist_popup_dismissed';
    const CACHE_DURATION_DAYS = 30;
    const RECAPTCHA_SITE_KEY = 'YOUR_RECAPTCHA_SITE_KEY'; // Replace with your actual site key
    const API_ENDPOINT = 'https://formail.metrics.gmbh/maillist?domain=dave.dev&action=subscribe';

    // Check if popup should be shown
    function shouldShowPopup() {
        const dismissedTime = localStorage.getItem(CACHE_KEY);
        if (!dismissedTime) return true;

        const dismissedDate = new Date(parseInt(dismissedTime));
        const now = new Date();
        const daysDiff = (now - dismissedDate) / (1000 * 60 * 60 * 24);

        return daysDiff >= CACHE_DURATION_DAYS;
    }

    // Mark popup as dismissed
    function dismissPopup() {
        localStorage.setItem(CACHE_KEY, Date.now().toString());
    }

    // Create popup HTML
    function createPopup() {
        const popupHTML = `
            <div id="maillist-overlay" class="maillist-overlay">
                <div id="maillist-popup" class="maillist-popup">
                    <button id="maillist-close" class="maillist-close" aria-label="Close popup">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div class="maillist-content">
                        <div class="maillist-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ff813f" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>

                        <h2 class="maillist-title">Stay in the Loop</h2>
                        <p class="maillist-description">
                            Get notified about new blog posts and podcasts. No spam, unsubscribe anytime.
                            Your data is never shared or sold.
                        </p>

                        <form id="maillist-form" class="maillist-form">
                            <div class="maillist-form-row">
                                <div class="maillist-form-group">
                                    <label for="firstName" class="maillist-label">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        class="maillist-input"
                                        required
                                        autocomplete="given-name"
                                    >
                                </div>
                                <div class="maillist-form-group">
                                    <label for="lastName" class="maillist-label">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        class="maillist-input"
                                        required
                                        autocomplete="family-name"
                                    >
                                </div>
                            </div>

                            <div class="maillist-form-group">
                                <label for="email" class="maillist-label">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    class="maillist-input"
                                    required
                                    autocomplete="email"
                                >
                            </div>

                            <div id="recaptcha-container" class="recaptcha-container"></div>

                            <div id="maillist-error" class="maillist-error"></div>
                            <div id="maillist-success" class="maillist-success"></div>

                            <button type="submit" id="maillist-submit" class="maillist-submit">
                                <span class="maillist-submit-text">Subscribe</span>
                                <span class="maillist-submit-loader" style="display: none;">
                                    <svg class="maillist-spinner" width="20" height="20" viewBox="0 0 50 50">
                                        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                                    </svg>
                                </span>
                            </button>
                        </form>

                        <p class="maillist-privacy">
                            By subscribing, you agree to receive email updates. We respect your privacy.
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    // reCAPTCHA widget ID
    let recaptchaWidgetId = null;

    // Render reCAPTCHA challenge
    function renderRecaptcha() {
        if (typeof grecaptcha === 'undefined' || !grecaptcha.enterprise) {
            console.error('reCAPTCHA not loaded');
            return;
        }

        const container = document.getElementById('recaptcha-container');
        if (!container) return;

        grecaptcha.enterprise.ready(function() {
            recaptchaWidgetId = grecaptcha.enterprise.render('recaptcha-container', {
                'sitekey': RECAPTCHA_SITE_KEY,
                'action': 'subscribe',
                'theme': 'light'
            });
        });
    }

    // Get reCAPTCHA response
    function getRecaptchaToken() {
        if (recaptchaWidgetId === null) {
            throw new Error('reCAPTCHA not initialized');
        }

        const token = grecaptcha.enterprise.getResponse(recaptchaWidgetId);
        if (!token) {
            throw new Error('Please complete the reCAPTCHA challenge');
        }

        return token;
    }

    // Submit form
    async function submitForm(formData) {
        const recaptchaToken = getRecaptchaToken();

        const payload = {
            county: '',
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            message: '',
            phone: '',
            recaptchaToken: recaptchaToken,
            recaptchaAction: 'subscribe'
        };

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Subscription failed. Please try again.');
        }

        return await response.json();
    }

    // Show error message
    function showError(message) {
        const errorEl = document.getElementById('maillist-error');
        const successEl = document.getElementById('maillist-success');

        errorEl.textContent = message;
        errorEl.style.display = 'block';
        successEl.style.display = 'none';
    }

    // Show success message
    function showSuccess(message) {
        const errorEl = document.getElementById('maillist-error');
        const successEl = document.getElementById('maillist-success');

        successEl.textContent = message || 'Thank you for subscribing! Check your email to confirm.';
        successEl.style.display = 'block';
        errorEl.style.display = 'none';
    }

    // Close popup with animation
    function closePopup() {
        const overlay = document.getElementById('maillist-overlay');
        const popup = document.getElementById('maillist-popup');

        if (popup) {
            popup.classList.add('maillist-popup-exit');
        }

        setTimeout(() => {
            if (overlay) {
                overlay.remove();
            }
        }, 300);

        dismissPopup();
    }

    // Initialize popup
    function initPopup() {
        // Check if we should show the popup
        if (!shouldShowPopup()) {
            return;
        }

        // Wait a bit before showing popup (3 seconds after page load)
        setTimeout(() => {
            createPopup();

            // Trigger entrance animation
            setTimeout(() => {
                const popup = document.getElementById('maillist-popup');
                if (popup) {
                    popup.classList.add('maillist-popup-enter');
                }

                // Render reCAPTCHA after popup is visible
                renderRecaptcha();
            }, 10);

            // Close button handler
            const closeBtn = document.getElementById('maillist-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closePopup);
            }

            // Overlay click handler
            const overlay = document.getElementById('maillist-overlay');
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay) {
                        closePopup();
                    }
                });
            }

            // Form submit handler
            const form = document.getElementById('maillist-form');
            if (form) {
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    const submitBtn = document.getElementById('maillist-submit');
                    const submitText = submitBtn.querySelector('.maillist-submit-text');
                    const submitLoader = submitBtn.querySelector('.maillist-submit-loader');

                    // Disable submit button
                    submitBtn.disabled = true;
                    submitText.style.display = 'none';
                    submitLoader.style.display = 'inline-block';

                    const formData = {
                        firstName: document.getElementById('firstName').value.trim(),
                        lastName: document.getElementById('lastName').value.trim(),
                        email: document.getElementById('email').value.trim()
                    };

                    try {
                        await submitForm(formData);
                        showSuccess();

                        // Close popup after 3 seconds
                        setTimeout(() => {
                            closePopup();
                        }, 3000);
                    } catch (error) {
                        showError(error.message || 'An error occurred. Please try again.');

                        // Re-enable submit button
                        submitBtn.disabled = false;
                        submitText.style.display = 'inline';
                        submitLoader.style.display = 'none';

                        // Reset reCAPTCHA
                        if (recaptchaWidgetId !== null) {
                            grecaptcha.enterprise.reset(recaptchaWidgetId);
                        }
                    }
                });
            }

            // ESC key handler
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closePopup();
                }
            });
        }, 3000);
    }

    // Load reCAPTCHA script
    function loadRecaptcha() {
        if (typeof grecaptcha !== 'undefined') {
            return;
        }

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadRecaptcha();
            initPopup();
        });
    } else {
        loadRecaptcha();
        initPopup();
    }
})();
