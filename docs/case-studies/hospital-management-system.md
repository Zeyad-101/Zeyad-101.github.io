---
title: Hospital Management System
description: A desktop hospital-management application covering patient registration, appointment scheduling, medical records, billing, doctor scheduling and role-based workflows.
tags: [C++17, Qt 6, OOP, Data Structures]
---

# Hospital Management System

## The Context

Managing a hospital involves coordinating a massive amount of dynamic data: patient records, doctor schedules, billing, and real-time appointment booking. Traditional paper-based systems or disjointed digital tools lead to inefficiencies, lost records, and scheduling conflicts. 

For a major academic project, I led a 7-member team to build a comprehensive Hospital Management System from scratch. The goal was to deliver a robust, highly responsive desktop application that could handle all core hospital operations in a single, unified interface.

## The Approach

We chose to build a native desktop application using **C++17** and the **Qt 6** framework. This choice was driven by the need for high performance, strict memory management, and a responsive Graphical User Interface (GUI).

The system was architected around several core modules:
1.  **Patient Management**: Registration, medical history tracking, and ongoing record updates.
2.  **Scheduling**: A complex calendar system for booking patient appointments while respecting individual doctor availability and avoiding conflicts.
3.  **Billing**: Financial tracking for treatments, consultations, and generating invoices.
4.  **Role-Based Access Control (RBAC)**: Ensuring that receptionists, doctors, and administrators only had access to the data and actions relevant to their roles.

My specific role involved both project management and core technical implementation. I led the effort to translate our Figma designs into a functional Qt6 GUI, ensuring that the application was not only powerful but also intuitive for non-technical hospital staff to use.

## Technical Decisions and Trade-offs

*   **C++ and Qt6 vs. Web Technologies**: We debated whether to build a web app (e.g., React/Node.js) or a desktop app. We ultimately chose C++/Qt6 because it allowed us to deeply apply Object-Oriented Programming (OOP) principles and custom Data Structures, which were core requirements for the project. It also guaranteed sub-200ms UI response times across all CRUD operations without relying on network latency.
*   **Data Structures**: To handle fast lookups for patient records and scheduling, we implemented custom Hash Maps and Binary Search Trees. This was a deliberate choice over simply relying on standard library containers everywhere, as it allowed us to optimize specifically for our data access patterns.
*   **Figma-to-Qt6**: Bridging the gap between modern UI design (Figma) and a C++ framework (Qt) was challenging. We had to carefully map Figma styles to Qt Style Sheets (QSS) and ensure responsive layouts using Qt's layout managers.

## The Result

The project was a major success. We successfully delivered a full-featured desktop application that met all requirements. 

Key technical achievements included:
*   **High Performance**: The application maintained a **sub-200ms UI response time** across all Create, Read, Update, and Delete (CRUD) operations, ensuring a frictionless experience for users.
*   **Seamless GUI**: The final product closely mirrored our original Figma designs, proving that native C++ applications can still offer modern, polished user interfaces.
*   **Effective Teamwork**: Coordinating a 7-member team on a complex C++ codebase required strict adherence to Git workflows and modular design, which we successfully maintained throughout the development cycle.

## Retrospective

If we were to expand this project, the immediate next step would be migrating the local data storage to a robust, centralized relational database (like PostgreSQL) to support concurrent access from multiple terminals across a hospital network. We would also implement comprehensive unit testing from day one, as manually testing the complex scheduling logic became increasingly difficult as the project grew.
