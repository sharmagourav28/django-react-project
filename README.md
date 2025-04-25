# Django-React Result Management App 🎓📊

This is a **full-stack web application** built with **Django** (backend) and **React** (frontend). The app enables users to:

- Input marks for **8 subjects** ✏️
- **Calculate overall results** and visualize them with **pie** and **bar charts** 📈
- **Download results as a PDF** 📄

## 🛠 Tech Stack

- **Backend**: Django 5.2, Django REST Framework, django-cors-headers
- **Frontend**: React, React-Router-dom
- **Database**: SQLite (for development), MySQL
- **Environment**: Python 3.11 with Virtualenv

## 🌟 Features

- User Registration & Authentication 🔐: Users can register, log in, and log out to manage their marks securely.

- Mark Entry Submission 📝: Users can submit marks for all 8 subjects, and the app calculates the overall result based on pre-defined criteria.

- Results Display 📊: After submission, the results are displayed on a Record Page, showing each student's performance, eligibility status (Eligible/Not Eligible), and a Download Button to save their results.

- Result Eligibility ✅❌: Automatically evaluates if the student is eligible or not based on the entered marks and displays the result in green (Eligible) or red (Not Eligible).

- Result Download 📥: Users can download their results as a PDF document.

- Pie and Bar Charts 📊: Visual representation of the marks and results using pie and bar charts, giving users a better understanding of their performance.

- Database Integration 💾: Marks and results are stored in a MySQL database, allowing the app to maintain and retrieve records for users.

## 🚀 Usage

- Submit Marks: Navigate to the Marks Page, where you can input marks for each subject.

- View Results: After submitting the marks, your overall result will be calculated and displayed, along with a visual representation in the form of pie and bar charts.

- Download Result: If your result is eligible, you can download your result as a PDF file.

- Record Page: View the records of all submitted entries along with eligibility status, with a button to download the result for each entry.
