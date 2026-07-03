# 2024SE Project - Student Teacher Selection System

This repository is used as the ChangeGuard defense demo sample.

## Main Modules

- `Backend/app.py`: Flask API gateway for student and teacher workflows.
- `Backend/stu_*.py`: student search, selection, chosen-course and evaluation services.
- `Backend/tea_*.py`: teacher publish, confirmation, profile and course record services.
- `Backend/select_.py`, `insert_.py`, `update_.py`, `delete_.py`: MySQL data access layer.
- `Frontend/`: login, student recommendation, course progress and admin pages.

## Demo Change

The demo branch optimizes the student course selection flow:

- add pending selection capacity control before creating a bidirectional record;
- validate student rating score range on the backend;
- show course capacity status on the student recommendation page;
- add dependency documentation for repeatable deployment.

## Review Focus

ChangeGuard should inspect cross-module impact between frontend pages, Flask APIs, student workflow, data access and deployment configuration.
