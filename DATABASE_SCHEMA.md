# Caritas Kiddie Academy - Database Schema

## Suggested Database Tables

Based on research and best practices for school management systems, especially for pre-school/elementary levels, here are the recommended tables:

---

## 1. Core Entity Tables

### `users`
- `user_id` (PK, UUID)
- `user_name` 
- `email` (unique)
- `password_hash`
- `role` (enum: admin, teacher, parent, student)
- `is_active` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `students`
- `student_id` (PK, UUID)
- `user_id` (FK → users)
- `student_code` (unique, e.g., STU-2024-001)
- `first_name`
- `last_name`
- `date_of_birth`
- `gender` (enum: male, female, other)
- `photo_url` 
- `address`
- `emergency_contact_name`
- `emergency_contact_phone`
- `enrollment_date`
- `status` (enum: active, graduated, transferred, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `parents_guardians`
- `phone_number` (PK)
- `user_id` (FK → users)
- `first_name`
- `last_name`
- `email` (unique)
- `occupation`
- `address`
- `relationship_to_student` (enum: mother, father, guardian, other) -  option to type if other selected.
- `is_primary_contact` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `student_parent_relationships`
- `relationship_id` (PK, UUID)
- `student_id` (FK → students)
- `parent_id` (FK → parents_guardians)
- `relationship_type` (enum: mother, father, guardian, other)
- `is_primary` (boolean)
- `created_at` (timestamp)

### `employees`
- `employee_id` (PK, UUID)
- `user_id` (FK → users)
- `employee_code` (unique, e.g., TCH-2024-001, STF-2024-001)
- `employee_type` (enum: teacher, principal, vice_principal, secretary, accountant, nurse, security, cleaner, other)
- `first_name`
- `last_name`
- `date_of_birth` (nullable)
- `gender` (enum: male, female, other, nullable)
- `email` (unique)
- `phone_number`
- `address`
- `hire_date`
- `qualifications` (text, nullable - mainly for teachers)
- `specialization` (text, nullable - mainly for teachers)
- `position` (text, nullable - for non-teaching staff, can be used if employee_type is "other")
- `status` (enum: active, on_leave, terminated, suspended, probation, retired, contract_ended)
- `photo_url` (nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 2. Academic Structure Tables

### `academic_years`
- `academic_year_id` (PK, UUID)
- `year_name` (e.g., "2024-2025")
- `start_date` (date)
- `end_date` (date)
- `is_current` (boolean)
- `status` (enum: upcoming, active, completed)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `terms_semesters`
- `term_id` (PK, UUID)
- `academic_year_id` (FK → academic_years)
- `term_name` (e.g., "First Term", "Second Term", "Third Term")
- `start_date` (date)
- `end_date` (date)
- `is_current` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `classes`
- `class_id` (PK, UUID)
- `class_name` (e.g., "Nursery A", "Kindergarten 1", "Grade 1")
- `class_code` (unique, e.g., "NUR-A", "KG-1")
- `grade_level` (integer, e.g., 0 for nursery, 1 for KG1)
- `capacity` (integer)
- `current_enrollment` (integer, default 0)
- `academic_year_id` (FK → academic_years)
- `class_teacher_id` (FK → employees, where employee_type = 'teacher')
- `room_number` (optional)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `subjects`
- `subject_id` (PK, UUID)
- `subject_name` (e.g., "Mathematics", "English", "Art", "Music")
- `subject_code` (unique)
- `description` (text, optional)
- `grade_level` (integer, nullable - null means all levels)
- `is_core` (boolean)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `class_subjects`
- `class_subject_id` (PK, UUID)
- `class_id` (FK → classes)
- `subject_id` (FK → subjects)
- `teacher_id` (FK → employees, where employee_type = 'teacher')
- `academic_year_id` (FK → academic_years)
- `term_id` (FK → terms_semesters)
- `schedule_day` (enum: monday, tuesday, wednesday, thursday, friday)
- `start_time` (time)
- `end_time` (time)
- `created_at` (timestamp)

---

## 3. Enrollment & Registration Tables

### `enrollments`
- `enrollment_id` (PK, UUID)
- `student_id` (FK → students)
- `class_id` (FK → classes)
- `academic_year_id` (FK → academic_years)
- `enrollment_date` (date)
- `enrollment_status` (enum: pending, approved, rejected, withdrawn)
- `previous_school` (text, optional)
- `notes` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 4. Attendance Tables

### `attendance`
- `attendance_id` (PK, UUID)
- `student_id` (FK → students)
- `class_id` (FK → classes)
- `attendance_date` (date)
- `status` (enum: present, absent, late, excused, sick)
- `check_in_time` (timestamp, nullable)
- `check_out_time` (timestamp, nullable)
- `notes` (text, optional)
- `marked_by` (FK → employees, where employee_type = 'teacher')
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `attendance_summary`
- `summary_id` (PK, UUID)
- `student_id` (FK → students)
- `class_id` (FK → classes)
- `academic_year_id` (FK → academic_years)
- `term_id` (FK → terms_semesters)
- `total_days` (integer)
- `present_days` (integer)
- `absent_days` (integer)
- `late_days` (integer)
- `attendance_percentage` (decimal)
- `updated_at` (timestamp)

---

## 5. Academic Performance Tables

### `assignments`
- `assignment_id` (PK, UUID)
- `class_id` (FK → classes)
- `subject_id` (FK → subjects)
- `teacher_id` (FK → employees, where employee_type = 'teacher')
- `title`
- `description` (text)
- `due_date` (date)
- `total_marks` (decimal)
- `assignment_type` (enum: homework, project, quiz, test, exam)
- `academic_year_id` (FK → academic_years)
- `term_id` (FK → terms_semesters)
- `status` (enum: draft, published, completed)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `grades`
- `grade_id` (PK, UUID)
- `student_id` (FK → students)
- `assignment_id` (FK → assignments)
- `class_id` (FK → classes)
- `subject_id` (FK → subjects)
- `marks_obtained` (decimal)
- `total_marks` (decimal)
- `grade_letter` (enum: A+, A, B+, B, C+, C, D, F)
- `remarks` (text, optional)
- `graded_by` (FK → employees, where employee_type = 'teacher')
- `graded_date` (date)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `report_cards`
- `report_card_id` (PK, UUID)
- `student_id` (FK → students)
- `class_id` (FK → classes)
- `academic_year_id` (FK → academic_years)
- `term_id` (FK → terms_semesters)
- `overall_average` (decimal)
- `class_position` (integer, nullable)
- `total_students` (integer)
- `teacher_comments` (text)
- `principal_comments` (text, optional)
- `status` (enum: draft, published)
- `published_date` (date, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 6. Financial Tables

### `fee_structure`
- `fee_structure_id` (PK, UUID)
- `class_id` (FK → classes)
- `academic_year_id` (FK → academic_years)
- `fee_type` (enum: tuition, registration, uniform, books, transport, other)
- `fee_name` (e.g., "Tuition Fee", "Registration Fee")
- `amount` (decimal)
- `due_date` (date)
- `is_required` (boolean)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `fee_payments`
- `payment_id` (PK, UUID)
- `student_id` (FK → students)
- `fee_structure_id` (FK → fee_structure)
- `amount_paid` (decimal)
- `payment_date` (date)
- `payment_method` (enum: cash, bank_transfer, cheque, mobile_money, other)
- `transaction_reference` (text, optional)
- `receipt_number` (unique)
- `paid_by` (FK → parents_guardians)
- `received_by` (FK → employees, where employee_type = 'accountant')
- `notes` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `fee_arrears`
- `arrear_id` (PK, UUID)
- `student_id` (FK → students)
- `fee_structure_id` (FK → fee_structure)
- `amount_due` (decimal)
- `amount_paid` (decimal, default 0)
- `balance` (decimal)
- `due_date` (date)
- `status` (enum: pending, partially_paid, paid, overdue)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 7. Communication & Notifications Tables

### `announcements`
- `announcement_id` (PK, UUID)
- `title`
- `content` (text)
- `target_audience` (enum: all, students, parents, teachers, staff, specific_class)
- `class_id` (FK → classes, nullable)
- `priority` (enum: low, normal, high, urgent)
- `publish_date` (date)
- `expiry_date` (date, nullable)
- `created_by` (FK → users)
- `status` (enum: draft, published, archived)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `notifications`
- `notification_id` (PK, UUID)
- `user_id` (FK → users)
- `title`
- `message` (text)
- `type` (enum: info, warning, error, success)
- `related_entity_type` (enum: attendance, grade, fee, announcement, assignment)
- `related_entity_id` (UUID, nullable)
- `is_read` (boolean, default false)
- `read_at` (timestamp, nullable)
- `created_at` (timestamp)

### `messages`
- `message_id` (PK, UUID)
- `sender_id` (FK → users)
- `receiver_id` (FK → users)
- `subject`
- `content` (text)
- `is_read` (boolean, default false)
- `read_at` (timestamp, nullable)
- `created_at` (timestamp)

---

## 8. Events & Activities Tables

### `events`
- `event_id` (PK, UUID)
- `event_name`
- `description` (text)
- `event_type` (enum: holiday, exam, sports_day, cultural_day, parent_meeting, field_trip, other)
- `start_date` (date)
- `end_date` (date)
- `start_time` (time, nullable)
- `end_time` (time, nullable)
- `location` (text, optional)
- `target_audience` (enum: all, students, parents, teachers, staff, specific_class)
- `class_id` (FK → classes, nullable)
- `created_by` (FK → users)
- `status` (enum: scheduled, ongoing, completed, cancelled)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 9. Settings & Configuration Tables

### `school_settings`
- `setting_id` (PK, UUID)
- `setting_key` (unique, e.g., "school_name", "school_logo", "academic_year")
- `setting_value` (text)
- `setting_type` (enum: string, number, boolean, json)
- `description` (text, optional)
- `updated_by` (FK → users)
- `updated_at` (timestamp)

### `holidays`
- `holiday_id` (PK, UUID)
- `holiday_name`
- `holiday_date` (date)
- `holiday_type` (enum: public_holiday, school_holiday, special_event)
- `academic_year_id` (FK → academic_years)
- `is_recurring` (boolean)
- `created_at` (timestamp)

---

## 10. Additional Tables (Optional but Recommended)

### `library_books`
- `book_id` (PK, UUID)
- `isbn` (unique, optional)
- `title`
- `author`
- `publisher`
- `category`
- `total_copies` (integer)
- `available_copies` (integer)
- `status` (enum: available, borrowed, lost, damaged)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `book_borrowings`
- `borrowing_id` (PK, UUID)
- `book_id` (FK → library_books)
- `student_id` (FK → students)
- `borrow_date` (date)
- `due_date` (date)
- `return_date` (date, nullable)
- `status` (enum: borrowed, returned, overdue, lost)
- `fine_amount` (decimal, default 0)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `transport_routes`
- `route_id` (PK, UUID)
- `route_name`
- `description` (text)
- `pickup_location`
- `dropoff_location`
- `driver_id` (FK → employees, where employee_type IN ('security', 'other'))
- `vehicle_number`
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `student_transport`
- `student_transport_id` (PK, UUID)
- `student_id` (FK → students)
- `route_id` (FK → transport_routes)
- `pickup_time` (time)
- `dropoff_time` (time)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## Summary

**Total Recommended Tables: ~35-40 tables**

### Core Categories:
1. **User Management** (users, students, parents_guardians, employees)
2. **Academic Structure** (academic_years, terms, classes, subjects)
3. **Enrollment** (enrollments)
4. **Attendance** (attendance, attendance_summary)
5. **Academic Performance** (assignments, grades, report_cards)
6. **Financial** (fee_structure, fee_payments, fee_arrears)
7. **Communication** (announcements, notifications, messages)
8. **Events** (events, holidays)
9. **Settings** (school_settings)
10. **Optional Features** (library, transport)

This schema provides a comprehensive foundation for managing all aspects of Caritas Kiddie Academy.

