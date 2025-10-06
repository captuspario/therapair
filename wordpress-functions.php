<?php
/**
 * Therapair Widget Shortcode for WordPress
 * Add this code to your theme's functions.php file
 */

function therapair_widget_shortcode($atts = []) {
    // Shortcode attributes
    $atts = shortcode_atts([
        'container_class' => 'therapair-container',
        'max_width' => '6xl'
    ], $atts);

    // Start output buffering
    ob_start();
    ?>

    <!-- Therapair Widget Styles -->
    <style>
        .therapair-container {
            font-family: 'Open Sans', ui-sans-serif, system-ui, sans-serif;
            background-color: #F8F4FF;
            padding: 2rem 1rem;
            border-radius: 16px;
            margin: 2rem 0;
        }

        .therapair-container .chat-bubble {
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .therapair-container .progress-dot {
            transition: all 0.3s ease;
        }

        .therapair-container .progress-dot.active {
            background-color: #9B74B7;
            transform: scale(1.2);
        }

        .therapair-container .option-button {
            transition: all 0.2s ease;
            cursor: pointer;
            background-color: #9B74B7;
            color: white;
            border: none;
            border-radius: 25px;
            padding: 12px 20px;
            font-weight: 500;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            width: 100%;
            text-align: left;
            margin-bottom: 0.75rem;
        }

        .therapair-container .option-button:hover {
            background-color: #4F064F;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(155, 116, 183, 0.25);
        }

        .therapair-container .option-button.selected {
            background-color: #4F064F;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(155, 116, 183, 0.3);
        }

        .therapair-container .option-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .therapair-container .option-button:disabled.selected {
            opacity: 1;
            background-color: #4F064F;
        }

        .therapair-container .therapist-card {
            transition: all 0.3s ease;
            background: white;
            border-radius: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            margin-bottom: 1.5rem;
        }

        .therapair-container .therapist-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .therapair-container .therapist-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background-color: #f3f4f6;
            transition: all 0.3s ease;
        }

        .therapair-container .therapist-card img:hover {
            filter: brightness(1.05);
        }

        .therapair-container .chat-message {
            background-color: white;
            border-radius: 16px;
            padding: 16px 20px;
            margin: 8px 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .therapair-container .chat-message.bot {
            text-align: left;
            color: #374151;
            font-weight: 500;
        }

        .therapair-container .white-panel {
            background-color: white;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            margin: 24px auto;
            max-width: 48rem;
        }

        .therapair-container .results-container {
            background-color: white;
            border-radius: 16px;
            padding: 32px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .therapair-container .btn-primary {
            background-color: #9B74B7;
            color: white;
            padding: 1rem 2rem;
            border-radius: 16px;
            border: none;
            font-weight: 600;
            font-size: 1.125rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .therapair-container .btn-primary:hover {
            background-color: #4F064F;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(155, 116, 183, 0.25);
        }

        .therapair-container .therapist-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .therapair-container .specialty-tag {
            background-color: #9B74B7;
            color: white;
            padding: 0.375rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            margin: 0.25rem;
            display: inline-block;
        }

        .therapair-container .progress-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
        }

        .therapair-container .progress-dots {
            display: flex;
            gap: 0.5rem;
        }

        .therapair-container .progress-dot {
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            background-color: #d1d5db;
        }

        .therapair-container .text-center {
            text-align: center;
        }

        .therapair-container .hidden {
            display: none;
        }

        @media (max-width: 768px) {
            .therapair-container .therapist-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>

    <!-- Load required fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Therapair Widget HTML -->
    <div class="<?php echo esc_attr($atts['container_class']); ?>">
        <!-- Hero Section -->
        <div class="text-center" style="margin-bottom: 2rem;">
            <h2 style="color: #111827; margin-bottom: 1rem; font-size: 2.25rem; font-weight: 700; line-height: 1.2;">
                Let's find a therapist who's right for you
            </h2>
            <p style="color: #6b7280; margin-bottom: 2rem; font-size: 1.125rem; max-width: 36rem; margin-left: auto; margin-right: auto;">
                Answer a few quick questions — we'll guide you to someone who really gets it.
            </p>
            <button
                id="therapair-start-btn"
                onclick="therapairStartMatching()"
                class="btn-primary"
            >
                Start Matching
            </button>
        </div>

        <!-- Chat Interface -->
        <div id="therapair-chat-interface" class="hidden">
            <div class="white-panel">
                <!-- Progress Bar -->
                <div class="progress-container">
                    <div class="progress-dots">
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                    </div>
                    <span id="therapair-progress-text" style="font-size: 0.875rem; color: #6b7280;">1 of 5</span>
                </div>

                <!-- Chat Messages -->
                <div id="therapair-chat-messages" style="margin-bottom: 1.5rem;">
                    <!-- Messages will be added here dynamically -->
                </div>

                <!-- Options Container -->
                <div id="therapair-options-container">
                    <!-- Options will be added here dynamically -->
                </div>
            </div>
        </div>

        <!-- Results Section -->
        <div id="therapair-results-section" class="hidden">
            <div class="text-center" style="margin-bottom: 2rem;">
                <h3 style="color: #111827; margin-bottom: 1rem; font-size: 1.875rem; font-weight: 700;">Here are your matches</h3>
                <p style="color: #6b7280; font-size: 1.125rem;">Based on your responses, we think you'll connect well with:</p>
            </div>

            <div id="therapair-therapist-cards" class="therapist-grid">
                <!-- Therapist cards will be added here -->
            </div>

            <div class="text-center" style="margin-top: 2rem;">
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 1rem;">Not quite right?</p>
                <div>
                    <button onclick="therapairRestartQuiz()" style="color: #9B74B7; text-decoration: underline; background: none; border: none; cursor: pointer; margin-right: 1rem;">
                        Retake quiz
                    </button>
                    <button style="color: #9B74B7; text-decoration: underline; background: none; border: none; cursor: pointer;">
                        Explore all therapists
                    </button>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem;">
                Powered by Therapair for Unison
            </p>
            <p style="font-size: 0.75rem; color: #9ca3af;">
                Find mental health support that understands you
            </p>
        </div>
    </div>

    <!-- Therapair Widget JavaScript -->
    <script>
        // Only initialize if not already done
        if (typeof window.therapairInitialized === 'undefined') {
            window.therapairInitialized = true;

            // Therapist data
            const therapairTherapists = [
                {
                    name: "Nicki Nelis",
                    gender: "female",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/nicki-nelis-therapair-counsellor.jpg",
                    tagline: "Gestalt therapist with nearly 20 years' experience, specializing in LGBTQI+, trauma survivors, and kink/ENM communities",
                    specialties: ["LGBTQI+ affirming", "Trauma survivors", "Kink community", "ENM relationships", "Sexual assault survivors"],
                    availability: "In-person Windsor (Thursdays 10am–7pm)",
                    tags: ["lgbtq", "trauma", "kink", "enm", "identity"],
                    accepting: true
                },
                {
                    name: "Adam Forman",
                    gender: "male",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/adam-forman-therapair-counsellor.jpg",
                    tagline: "Counsellor & Mediator with two decades experience, specializing in ethically non-monogamous relationships",
                    specialties: ["ENM relationships", "Opening relationships", "Relationship dynamics", "Attachment healing", "Mediation"],
                    availability: "Online & in-person Fitzroy North (Flexible)",
                    tags: ["enm", "relationship", "mediation"],
                    accepting: true
                },
                {
                    name: "Natasha Lama",
                    gender: "female",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/natasha-lama-therapair-sex-therapist.jpg",
                    tagline: "Counsellor & Sex Therapist with cultural sensitivity, specializing in sex-positive approaches and cultural identity",
                    specialties: ["Sex therapy", "Cultural sensitivity", "Sexual health", "Cultural identity", "CBT", "Mindfulness"],
                    availability: "Online and in-person Windsor (Mondays noon–7pm, Saturdays 9am–2pm)",
                    tags: ["sexual_health", "cultural", "sex_positive"],
                    accepting: true
                },
                {
                    name: "Genevieve Autret",
                    gender: "female",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/genevieve-autret-therapair-psychotherapist.jpg",
                    tagline: "Psychotherapist with 15 years experience, specializing in psychedelic integration and trauma-informed therapy",
                    specialties: ["Psychedelic integration", "Trauma therapy", "DBT", "Art therapy", "Harm reduction", "Couples therapy"],
                    availability: "Online (Tuesdays 4:30–6:30pm, Wednesdays noon–6pm)",
                    tags: ["psychedelic", "trauma", "art_therapy"],
                    accepting: true
                },
                {
                    name: "Emma Steains",
                    gender: "female",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/emma-steains-therapair-clinical-psychologist.jpg",
                    tagline: "Clinical Psychologist specializing in veterans/ADF personnel, EMDR, ACT, and trauma recovery",
                    specialties: ["EMDR", "ACT", "CBT", "Veteran support", "ADF families", "Trauma recovery", "Internal Family Systems"],
                    availability: "Online (Wednesdays 2–6pm, Fridays 9am–5pm)",
                    tags: ["emdr", "veterans", "trauma", "cbt"],
                    accepting: true
                },
                {
                    name: "Michael Spurrier",
                    gender: "male",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/michael-spurrier-therapair-clinical-psychologist.jpg",
                    tagline: "Clinical Psychologist providing warm, grounded therapy for trauma, relationships, neurodivergence, mood, and addiction",
                    specialties: ["Trauma therapy", "Relationship work", "Neurodivergent support", "Mood disorders", "Addiction", "Schema therapy"],
                    availability: "Online (Mondays 9am–3pm)",
                    tags: ["trauma", "relationship", "addiction", "neurodivergent"],
                    accepting: true
                },
                {
                    name: "Meg Wilson",
                    gender: "female",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/meg-wilson-therapair-psychotherapist.jpg",
                    tagline: "Founder & Psychotherapist with over a decade experience in art psychotherapy, DBT, and relationship therapy",
                    specialties: ["Art psychotherapy", "DBT", "Mindfulness", "Relationship therapy", "Non-traditional relationships"],
                    availability: "Online/in-person Windsor (Not currently accepting new clients)",
                    tags: ["art_therapy", "relationship", "founder"],
                    accepting: false
                },
                {
                    name: "Joe Stark",
                    gender: "male",
                    image: "<?php echo get_template_directory_uri(); ?>/images/therapair/joe-stark-therapair-psychiatrist.jpg",
                    tagline: "Psychiatrist & Psychotherapist, pioneer in psychedelic-assisted therapy and mindfulness teacher",
                    specialties: ["Psychiatry", "Psychedelic therapy", "Mindfulness", "Chronic pain", "Trauma", "Anxiety"],
                    availability: "Not accepting new clients; medication-assisted treatments by enquiry",
                    tags: ["psychedelic", "psychiatry", "mindfulness"],
                    accepting: false
                }
            ];

            // Questions data
            const therapairQuestions = [
                {
                    id: "concerns",
                    text: "What brings you to therapy?",
                    options: [
                        "Relationship challenges",
                        "Anxiety or depression",
                        "Trauma or PTSD",
                        "Personal growth/self-exploration",
                        "Identity exploration",
                        "Sexual health concerns",
                        "Addiction recovery",
                        "Psychedelic integration"
                    ]
                },
                {
                    id: "relationship",
                    text: "Which relationship structure applies to you?",
                    options: [
                        "Monogamous relationship",
                        "Non-monogamous/ENM relationship",
                        "Single/dating",
                        "Not relevant to my needs"
                    ]
                },
                {
                    id: "approach",
                    text: "Do you have preferences regarding therapeutic approaches?",
                    options: [
                        "Art-based therapy",
                        "CBT/DBT skills-focused",
                        "Mindfulness/acceptance-based",
                        "Trauma-specific approaches (EMDR)",
                        "No preference/unsure"
                    ]
                },
                {
                    id: "community",
                    text: "Are any of these community experiences relevant to you?",
                    options: [
                        "LGBTQI+ community",
                        "Cultural/ethnic minority",
                        "Veterans/ADF personnel or family",
                        "Kink community",
                        "None of these apply"
                    ]
                },
                {
                    id: "gender",
                    text: "Therapist gender preference?",
                    options: [
                        "Prefer female therapist",
                        "Prefer male therapist",
                        "No preference"
                    ]
                }
            ];

            let therapairCurrentQuestion = 0;
            let therapairResponses = {};

            // Global functions for WordPress
            window.therapairStartMatching = function() {
                therapairCurrentQuestion = 0;
                therapairResponses = {};

                document.getElementById('therapair-chat-messages').innerHTML = '';
                document.getElementById('therapair-options-container').innerHTML = '';

                const progressDots = document.querySelectorAll('.therapair-container .progress-dot');
                progressDots.forEach(dot => dot.classList.remove('active'));

                document.getElementById('therapair-progress-text').textContent = '1 of 5';
                document.getElementById('therapair-start-btn').style.display = 'none';
                document.getElementById('therapair-chat-interface').classList.remove('hidden');

                therapairShowQuestion(0);
            };

            window.therapairRestartQuiz = function() {
                therapairCurrentQuestion = 0;
                therapairResponses = {};

                document.getElementById('therapair-chat-messages').innerHTML = '';
                document.getElementById('therapair-options-container').innerHTML = '';

                const progressDots = document.querySelectorAll('.therapair-container .progress-dot');
                progressDots.forEach(dot => dot.classList.remove('active'));

                document.getElementById('therapair-progress-text').textContent = '1 of 5';
                document.getElementById('therapair-results-section').classList.add('hidden');
                document.getElementById('therapair-chat-interface').classList.remove('hidden');
                document.getElementById('therapair-start-btn').style.display = 'none';

                const therapistCards = document.getElementById('therapair-therapist-cards');
                if (therapistCards) {
                    therapistCards.innerHTML = '';
                }

                therapairShowQuestion(0);
            };

            function therapairShowQuestion(index) {
                therapairCurrentQuestion = index;
                const question = therapairQuestions[index];

                therapairUpdateProgress(index);

                document.getElementById('therapair-chat-messages').innerHTML = '';
                document.getElementById('therapair-options-container').innerHTML = '';

                therapairAddChatBubble(question.text, 'bot');

                setTimeout(() => {
                    question.options.forEach((option, i) => {
                        setTimeout(() => {
                            therapairAddOptionButton(option);
                        }, i * 100);
                    });
                }, 500);
            }

            function therapairUpdateProgress(index) {
                const dots = document.querySelectorAll('.therapair-container .progress-dot');
                const progressText = document.getElementById('therapair-progress-text');

                dots.forEach((dot, i) => {
                    if (i <= index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                progressText.textContent = `${index + 1} of ${therapairQuestions.length}`;
            }

            function therapairAddChatBubble(message, sender) {
                const chatMessages = document.getElementById('therapair-chat-messages');
                const bubble = document.createElement('div');

                if (sender === 'bot') {
                    bubble.className = 'chat-message bot';
                    bubble.innerHTML = message;
                } else {
                    bubble.className = 'chat-bubble';
                    bubble.style.display = 'flex';
                    bubble.style.justifyContent = 'flex-end';
                    bubble.innerHTML = `
                        <div style="max-width: 20rem; padding: 0.75rem 1rem; border-radius: 1rem; color: white; background-color: #9B74B7;">
                            ${message}
                        </div>
                    `;
                }

                chatMessages.appendChild(bubble);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            function therapairAddOptionButton(option) {
                const container = document.getElementById('therapair-options-container');
                const button = document.createElement('button');

                button.className = 'option-button';
                button.textContent = option;

                button.onclick = () => therapairSelectOption(option, button);

                container.appendChild(button);
            }

            function therapairSelectOption(option, buttonElement) {
                buttonElement.classList.add('selected');
                buttonElement.disabled = true;

                therapairResponses[therapairQuestions[therapairCurrentQuestion].id] = option;

                const allOptions = document.querySelectorAll('.therapair-container .option-button');
                allOptions.forEach(opt => opt.disabled = true);

                setTimeout(() => {
                    if (therapairCurrentQuestion < therapairQuestions.length - 1) {
                        therapairShowQuestion(therapairCurrentQuestion + 1);
                    } else {
                        therapairShowResults();
                    }
                }, 1000);
            }

            function therapairShowResults() {
                document.getElementById('therapair-chat-interface').classList.add('hidden');
                document.getElementById('therapair-results-section').classList.remove('hidden');

                const matchedTherapists = therapairGetMatchedTherapists();
                therapairDisplayTherapistCards(matchedTherapists);
            }

            function therapairGetMatchedTherapists() {
                const genderPreference = therapairResponses.gender;
                const acceptingTherapists = therapairTherapists.filter(t => t.accepting);

                let eligibleTherapists = acceptingTherapists;
                if (genderPreference === 'Prefer male therapist') {
                    eligibleTherapists = acceptingTherapists.filter(t => t.gender === 'male');
                } else if (genderPreference === 'Prefer female therapist') {
                    eligibleTherapists = acceptingTherapists.filter(t => t.gender === 'female');
                }

                const matches = [];
                const concerns = therapairResponses.concerns;
                const relationship = therapairResponses.relationship;
                const approach = therapairResponses.approach;
                const community = therapairResponses.community;

                // Matching logic
                if (concerns === 'Relationship challenges') {
                    if (relationship === 'Non-monogamous/ENM relationship') {
                        matches.push(...eligibleTherapists.filter(t => t.tags.includes('enm')));
                    } else {
                        matches.push(...eligibleTherapists.filter(t => t.tags.includes('relationship')));
                    }
                }

                if (relationship === 'Non-monogamous/ENM relationship') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('enm') || t.tags.includes('kink')));
                }

                if (community === 'LGBTQI+ community' || community === 'Kink community') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('lgbtq') || t.tags.includes('kink')));
                }

                if (concerns === 'Psychedelic integration') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('psychedelic')));
                }

                if (community === 'Veterans/ADF personnel or family') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('veterans')));
                }

                if (concerns === 'Sexual health concerns') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('sexual_health')));
                }

                if (concerns === 'Trauma or PTSD' || approach === 'Trauma-specific approaches (EMDR)') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('trauma') || t.tags.includes('emdr')));
                }

                if (community === 'Cultural/ethnic minority') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('cultural')));
                }

                if (concerns === 'Identity exploration') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('identity') || t.tags.includes('lgbtq')));
                }

                if (approach === 'Art-based therapy') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('art_therapy')));
                }

                if (concerns === 'Addiction recovery') {
                    matches.push(...eligibleTherapists.filter(t => t.tags.includes('addiction')));
                }

                const uniqueMatches = matches.filter((therapist, index, self) =>
                    index === self.findIndex(t => t.name === therapist.name)
                );

                let finalMatches = uniqueMatches;
                if (finalMatches.length === 0) {
                    finalMatches = eligibleTherapists.slice(0, 3);
                }

                return finalMatches.slice(0, 3);
            }

            function therapairDisplayTherapistCards(therapists) {
                const container = document.getElementById('therapair-therapist-cards');

                therapists.forEach((therapist, index) => {
                    setTimeout(() => {
                        const card = therapairCreateTherapistCard(therapist);
                        container.appendChild(card);
                    }, index * 200);
                });
            }

            function therapairCreateTherapistCard(therapist) {
                const card = document.createElement('div');
                card.className = 'therapist-card';

                card.innerHTML = `
                    <div style="position: relative;">
                        <img
                            src="${therapist.image}"
                            alt="${therapist.name} - Therapist at Therapair"
                            style="width: 100%; height: 200px; object-fit: cover;"
                            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUIzQ040IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'"
                        />
                    </div>

                    <div style="padding: 1.5rem;">
                        <div style="margin-bottom: 1rem;">
                            <h4 style="color: #111827; margin-bottom: 0.5rem; font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5rem 0;">${therapist.name}</h4>
                            <p style="color: #6b7280; font-size: 0.875rem; line-height: 1.5; margin: 0;">${therapist.tagline}</p>
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.75rem; font-weight: 500; margin-top: 0;">Specializes in:</p>
                            <div>
                                ${therapist.specialties.slice(0, 3).map(specialty => `
                                    <span class="specialty-tag">${specialty}</span>
                                `).join('')}
                                ${therapist.specialties.length > 3 ? `
                                    <span style="background-color: #f9fafb; color: #6b7280; border: 1px solid #e5e7eb; padding: 0.375rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; margin: 0.25rem; display: inline-block;">
                                        +${therapist.specialties.length - 3} more
                                    </span>
                                ` : ''}
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <button style="width: 100%; background: white; border: 2px solid #9B74B7; color: #374151; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">
                                View Profile
                            </button>
                            <button style="width: 100%; background-color: #9B74B7; color: white; border: none; border-radius: 12px; padding: 0.75rem 1.5rem; font-weight: 600; cursor: pointer; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); transition: all 0.2s ease;">
                                Book Now
                            </button>
                        </div>
                    </div>
                `;

                return card;
            }
        }
    </script>

    <?php
    return ob_get_clean();
}

// Register the shortcode
add_shortcode('therapair_widget', 'therapair_widget_shortcode');

/**
 * Enqueue Google Fonts for Therapair widget
 */
function therapair_enqueue_fonts() {
    wp_enqueue_style('therapair-google-fonts', 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
}
add_action('wp_enqueue_scripts', 'therapair_enqueue_fonts');

?>