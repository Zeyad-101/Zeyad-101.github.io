# Hospital Management System

A comprehensive desktop application designed to streamline hospital operations, including patient registration, scheduling, billing, and medical records.

## Overview

This project was built from the ground up by a 7-member team, which I led. We aimed to replace disjointed, legacy hospital tools with a single, highly responsive, native desktop application. 

The application features a modern GUI (designed in Figma and implemented in Qt6) and is powered by a high-performance C++ backend utilizing custom data structures for optimized data retrieval.

## Features

*   **Patient Registration & Records**: Complete CRUD operations for patient medical histories.
*   **Appointment Scheduling**: Conflict-free booking calendar for doctors and patients.
*   **Billing System**: Financial tracking and invoice generation.
*   **Role-Based Access**: Specialized views and permissions for Receptionists, Doctors, and Administrators.

## Technical Highlights

*   **Performance**: Achieved sub-200ms UI response times across all operations.
*   **Architecture**: Deep implementation of Object-Oriented Programming (OOP) principles.
*   **Data Structures**: Utilized custom Hash Maps and Binary Search Trees for optimized data lookups.
*   **GUI**: Pixel-perfect translation of Figma designs into Qt6.

## How to Build and Run

*(Note: This is a C++ project requiring a Qt6 environment)*

1. Ensure you have CMake and Qt6 installed on your system.
2. Clone this repository.
3. Create a build directory: `mkdir build && cd build`
4. Generate build files: `cmake ..`
5. Compile the project: `cmake --build .`
6. Run the executable generated in the build folder.

## Tech Stack

*   C++17
*   Qt 6
*   CMake
*   Custom Data Structures
