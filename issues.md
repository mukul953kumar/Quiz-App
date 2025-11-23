---
YOUR MISSION: CHOOSE YOUR TASKS
---

This is a points-based challenge. You get points for any task you complete.

Choose your tasks from the list below.

== BUG FIXING TASKS (15-20 min.) ==

TASK 1: Page is Unclickable
    * The page seems to be freezed, no option can be clicked.
    * FIX: Fix the properties of the elements to rectify the UI based issue.

TASK 2: No question loaded
    * The page just shows failed to load question after showing loading question.
    * FIX: The questions are fetched via OpenTrivia Database API, check the function.

TASK 3: Red/Green Glitch 
    * Some of the questions show no green correct answer or the quiz crashes in the middle.
    * FIX: All of the questions are fetched and stored temporarily then displayed on the page one by one. Check how they are stored and accessed.

== FEATURE BUILDING TASKS (30-35 min.) ==

TASK 4: Display the score alongside the question
    * The score is not displayed side by side and only at the end.
    * Add the section where score is displayed alongside the question and is updated depending on the score.

TASK 5: Dark/Light Mode Toggle
    * The quiz is displayed only in light mode.
    * Create a button that would toggle the mode of the page; if light change it to dark and if dark change it to light.

TASK 6: Add a timer of 10s to each question 
    * After 10s the next question should be automatically displayed.
    * HINT 1: Think about using a function that runs repeatedly every second. A variable that decreases on each tick.
    * HINT 2: When a new question loads or when an answer is clicked, make sure the previous timer is fully stopped before starting the next one.
