# Bright Learning Hub

PROJECT: BELIGHT TECH E-LEARNING PLATFORM

IMPORTANT: READ ALL REQUIREMENTS BEFORE MAKING CHANGES.

We are building the BELIGHT TECH E-Learning Platform in multiple phases.

This is PHASE 1.

Do NOT attempt to build the complete platform in this phase.

==================================================

1. BACKEND REQUIREMENT

==================================================

The backend for this project MUST use SUPABASE.

I am NOT using Lovable Cloud.

DO NOT use Lovable Cloud as the backend.

DO NOT create a Lovable Cloud database.

DO NOT migrate or replace Supabase with Lovable Cloud.

Supabase will eventually handle:

- PostgreSQL database

- Authentication

- User accounts

- User roles

- Row Level Security

- Storage

- Course data

- Student enrollments

- Learning progress

- Quizzes

- Assessments

- Project submissions

- Certificates

- Payment records

- Other application data

For Phase 1, focus on the frontend foundation and UI.

Do not implement the actual Supabase functionality yet.

Prepare the project architecture so Supabase can be connected cleanly in later phases.

==================================================

2. PROJECT INFORMATION

==================================================

Platform name:

BELIGHT TECH E-Learning Platform

Education brand:

BELIGHT TECH

Technology partner:

RSWEB

BELIGHT TECH is an interactive educational platform designed to provide modern, practical, and engaging technology education.

The platform will eventually allow students to:

- Enroll in courses

- Access course materials

- Study structured lessons

- Complete quizzes

- Complete assessments

- Complete practical projects

- Track learning progress

- Submit projects

- Earn certificates

- Receive personalized learning recommendations

==================================================

3. BRANDING & COLOUR SYSTEM

==================================================

Create a professional blue-and-white visual identity.

The primary colour should be a clean, soft, modern light blue.

Use a blue similar in feel to a modern light-blue action/send button.

Do NOT make dark navy the primary colour.

Use:

Primary:

Soft modern light blue

Secondary:

Slightly stronger blue for important actions

Background:

White

Secondary background:

Very light blue

Text:

Dark charcoal or dark navy

Borders:

Very light neutral/blue-gray

The design should feel:

- Modern

- Clean

- Professional

- Educational

- Friendly

- Technology-focused

- Trustworthy

- Premium

Use:

- Rounded cards

- Clean typography

- Generous spacing

- Subtle shadows

- Professional icons

- Tasteful hover effects

- Smooth but restrained animations

Do not overuse animations.

Do not make the interface look like a generic AI-generated template.

==================================================

4. RESPONSIVE DESIGN

==================================================

The application MUST be fully responsive.

It must work correctly on:

- Mobile phones

- Tablets

- Laptops

- Desktop computers

- Large screens

Support both portrait and landscape layouts where appropriate.

Use ONE responsive application.

Do NOT create a separate mobile website.

All components must adapt appropriately to different screen sizes.

Pay special attention to:

- Navigation

- Course cards

- Forms

- Tables

- Dashboards

- Buttons

- Modals

- Sidebars

- Typography

- Images

- Spacing

Nothing should overflow horizontally on smaller screens.

==================================================

5. PROGRESSIVE WEB APP (PWA)

==================================================

The application MUST be built as a Progressive Web App.

Prepare the project for proper PWA functionality.

Include or prepare:

- Web App Manifest

- Application name: BELIGHT TECH

- Appropriate application icons

- Theme colour using the brand blue

- Proper viewport configuration

- Service worker

- Installable PWA experience on supported devices

- App-like mobile experience

- Appropriate caching architecture

The PWA should be structured so future phases can expand its offline capabilities safely.

Do not cache sensitive information insecurely.

Authentication, payments, protected student information, and other sensitive data must remain properly secured.

==================================================

6. TWA REQUIREMENT

==================================================

The PWA should also be structured to support a future Android Trusted Web Activity (TWA).

IMPORTANT:

TWA is NOT the primary application.

The primary application is the PWA.

For Phase 1, prepare the PWA correctly so that it can later be packaged as an Android Trusted Web Activity.

Ensure the application has the appropriate foundations for future TWA compatibility, including:

- HTTPS deployment requirement

- Valid web app manifest

- Proper application name

- Proper icons

- Appropriate start URL

- Appropriate display mode

- Theme colour

- Responsive mobile interface

- Stable production web URL

- PWA installability

Do NOT create a separate Android application in Phase 1.

Do NOT create an Android Studio project yet.

The TWA packaging will be handled in a later phase after the PWA is working correctly.

==================================================

7. PUBLIC NAVIGATION

==================================================

Create a professional responsive navigation bar.

Navigation:

Home

About

Courses

Services

Contact

Include:

- BELIGHT TECH branding/logo area

- Login button

- Register button

On mobile:

Use a clean hamburger navigation menu.

The navigation should remain easy to use on all screen sizes.

==================================================

8. HOME PAGE

==================================================

Create a strong professional hero section.

The hero should communicate that BELIGHT TECH helps learners develop practical technology skills.

Use a strong headline.

Supporting text should explain that BELIGHT TECH combines:

- Structured lessons

- Visual learning

- Quizzes

- Assessments

- Practical projects

- Progress tracking

Hero CTA buttons:

"Explore Courses"

"Get Started"

Include an attractive technology/education visual.

Avoid generic stock imagery.

==================================================

9. ABOUT BELIGHT TECH

==================================================

Create an About section introducing BELIGHT TECH.

Include:

Mission

Vision

Purpose

Explain that BELIGHT TECH aims to bridge the gap between theoretical knowledge and practical technology application.

Keep the content professional and concise.

==================================================

10. COURSES SECTION

==================================================

Create a professional Courses section.

Use course cards containing:

- Course thumbnail

- Course title

- Short description

- Level

- Category

- Number of modules

- CTA button

Use realistic placeholder course data for Phase 1.

Do NOT implement actual enrollment functionality yet.

==================================================

11. SERVICES

==================================================

Create a Services section containing:

- Online Technology Training

- Practical Web Development Training

- AI & Automation Training

- Digital Skills Development

- Project-Based Learning

Use concise professional descriptions.

==================================================

12. LEARNING EXPERIENCE

==================================================

Create a visual section explaining how learning works.

Show the following process:

1. Choose a Course

2. Learn Through Structured Lessons

3. Complete Quizzes & Assessments

4. Work on Practical Projects

5. Track Your Progress

6. Earn Your Certificate

Use attractive icons and a clean layout.

This is visual only during Phase 1.

==================================================

13. RSWEB TECHNOLOGY PARTNER

==================================================

Create a dedicated section:

"Powered by RSWEB"

Explain that RSWEB is the technology partner responsible for the platform's design, development, and digital innovation.

Do NOT invent:

- Awards

- Clients

- Company size

- Years of experience

- Certifications

- Other unsupported claims

==================================================

14. CONTACT SECTION

==================================================

Create a professional contact section.

Fields:

Name

Email

Message

Button:

"Send Message"

Also provide space for:

- Email

- Phone/WhatsApp

- Social links

This is frontend UI only during Phase 1.

Do NOT implement contact backend processing yet.

==================================================

15. AUTHENTICATION UI

==================================================

Create professional frontend screens for:

- Login

- Register

- Forgot Password

IMPORTANT:

These are UI screens only in Phase 1.

Do NOT implement real authentication yet.

Real authentication will be implemented using SUPABASE in Phase 2.

==================================================

16. STUDENT DASHBOARD UI

==================================================

Create the visual structure of a professional student dashboard.

Include:

- My Courses

- Overall Progress

- Completed Lessons

- Pending Lessons

- Quiz Scores

- Projects

- Certificates

- Recommended Courses

- Profile

- Settings

Use realistic placeholder data.

Do NOT connect this to Supabase yet.

==================================================

17. ADMIN DASHBOARD UI

==================================================

Create the visual structure of a professional admin dashboard.

Include statistics cards for:

- Total Students

- Total Courses

- Enrollments

- Revenue

- Completed Courses

- Pending Submissions

Admin navigation:

Dashboard

Students

Courses

Lessons

Quizzes

Projects

Certificates

Payments

Settings

Use placeholder data.

Do NOT implement CRUD functionality yet.

==================================================

18. FOOTER

==================================================

Create a professional footer containing:

BELIGHT TECH

Short description

Quick Links:

Home

About

Courses

Services

Contact

Technology Partner:

RSWEB

Also include:

Privacy Policy

Terms & Conditions

Copyright

==================================================

19. FUTURE PLATFORM STRUCTURE

==================================================

Keep the application architecture clean and scalable.

Future phases will implement:

PHASE 2:

Supabase authentication, user accounts, roles and permissions.

PHASE 3:

Courses, chapters, modules, lessons, learning materials, quizzes and progress tracking.

PHASE 4:

Practical projects, submissions, payments, enrollments and certificates.

PHASE 5:

Admin functionality, testing, optimization, production deployment and final PWA/TWA preparation.

Do NOT implement these features now.

==================================================

20. IMPORTANT DEVELOPMENT RULES

==================================================

This is ONLY PHASE 1.

Do not attempt to build the entire backend.

Do not use Lovable Cloud.

Use Supabase as the planned backend.

Do not create duplicate backend systems.

Do not add unnecessary technologies.

Use reusable components.

Keep the code organized and scalable.

Do not destroy existing work unnecessarily.

Make the UI consistent across all pages.

Prioritize:

- Responsiveness

- Accessibility

- Clean UI

- Good component structure

- Maintainability

- PWA readiness

- Future Supabase integration

- Future TWA compatibility

==================================================

21. FINAL QUALITY CHECK

==================================================

Before completing Phase 1, verify:

- Mobile responsiveness

- Tablet responsiveness

- Laptop responsiveness

- Desktop responsiveness

- Large-screen responsiveness

- Navigation

- Buttons

- Forms

- Course cards

- Student dashboard UI

- Admin dashboard UI

- Blue/white colour consistency

- Typography

- Spacing

- Accessibility

- PWA foundation

- Manifest

- Icons

- Service worker

- No horizontal overflow

- No obvious UI errors

- Clean reusable components

Again:

SUPABASE = BACKEND

LOVABLE CLOUD = NOT USED

PWA = REQUIRED

TWA COMPATIBILITY = REQUIRED

THIS IS ONLY PHASE 1.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bb187d38-1021-42c7-b211-04c1b3c01f1a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
