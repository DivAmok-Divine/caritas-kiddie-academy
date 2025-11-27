# Caritas Kiddie Academy - Database Schema

## Suggested Database Tables

**System Type:** Daycare/Nursery Management System for Infants and Toddlers (6 months - 2 years)

Based on research and best practices for daycare and nursery management systems for very young children, here are the recommended tables:

---

## 1. Core Entity Tables

### `users`
- `user_id` (PK, UUID)
- `user_name` 
- `email` (unique)
- `password_hash`
- `role` (enum: admin, teacher, parent)
- `is_active` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `children`
- `child_id` (PK, UUID)
- `user_id` (FK → users)
- `child_enrollment_code` (unique, CK001A - format of code: Generated randomly based on creation -  cannot be reused)
- `first_name`
- `last_name`
- `date_of_birth`
- `age_in_months` (calculated field - from date of birth automatic)
- `gender` (enum: male, female)
- `photo_url` 
- `address`
- `allergies` (text, nullable - critical for infants/toddlers)
- `medical_conditions` (text, nullable)
- `medications` (text, nullable)
- `special_care_instructions` (text, nullable)
- `emergency_contact_name`
- `emergency_contact_phone`
- `enrollment_date`
- `enrollment_age_months` (integer - age when enrolled)
- `status` (enum: active, graduated, transferred, inactive, waitlisted)
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
- `relationship_to_child` (enum: mother, father, guardian, other) -  option to type if other selected.
- `is_primary_contact` (boolean)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `child_parent_relationships`
- `relationship_id` (PK, UUID)
- `child_id` (FK → children)
- `parent_id` (FK → parents_guardians)
- `relationship_type` (enum: mother, father, guardian, other)
- `is_primary` (boolean)
- `is_authorized_pickup` (boolean - who can pick up the child)
- `created_at` (timestamp)

### `employees`
- `employee_id` (PK, UUID)
- `user_id` (FK → users)
- `employee_code` (unique, e.g., CAR-2024-001, NUR-2024-001)
- `employee_type` (enum: caregiver, lead_caregiver, nurse, administrator, secretary, accountant, security, cleaner, cook, other)
- `first_name`
- `last_name`
- `date_of_birth` (nullable)
- `gender` (enum: male, female, other, nullable)
- `email` (unique)
- `phone_number`
- `address`
- `hire_date`
- `qualifications` (text, nullable - childcare certifications, CPR training, etc.)
- `specialization` (text, nullable - infant care, toddler care, special needs)
- `position` (text, nullable - for non-caregiving staff)
- `cpr_certified` (boolean)
- `first_aid_certified` (boolean)
- `background_check_date` (date)
- `status` (enum: active, on_leave, terminated, suspended, probation, retired, contract_ended)
- `photo_url` (nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 2. Room & Group Structure Tables

### `rooms`
- `room_id` (PK, UUID)
- `room_name` (e.g., "Infant Room A", "Toddler Room B", "Crawler Room")
- `room_code` (unique, e.g., "INF-A", "TOD-B")
- `room_type` (enum: infant, crawler, toddler, mixed_age)
- `age_range_min_months` (integer, e.g., 6)
- `age_range_max_months` (integer, e.g., 12)
- `capacity` (integer - based on child-to-caregiver ratios)
- `current_enrollment` (integer, default 0)
- `lead_caregiver_id` (FK → employees, where employee_type = 'lead_caregiver')
- `room_number` (text)
- `status` (enum: active, inactive, maintenance)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `activities`
- `activity_id` (PK, UUID)
- `activity_name` (e.g., "Tummy Time", "Sensory Play", "Story Time", "Music & Movement")
- `activity_code` (unique)
- `description` (text)
- `age_appropriate_min_months` (integer)
- `age_appropriate_max_months` (integer)
- `activity_type` (enum: physical, cognitive, social, sensory, creative, music, story, outdoor)
- `duration_minutes` (integer)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `daily_schedules`
- `schedule_id` (PK, UUID)
- `room_id` (FK → rooms)
- `activity_id` (FK → activities)
- `schedule_day` (enum: monday, tuesday, wednesday, thursday, friday)
- `start_time` (time)
- `end_time` (time)
- `caregiver_id` (FK → employees, where employee_type IN ('caregiver', 'lead_caregiver'))
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 3. Enrollment & Registration Tables

### `enrollments`
- `enrollment_id` (PK, UUID)
- `child_id` (FK → children)
- `room_id` (FK → rooms)
- `enrollment_date` (date)
- `enrollment_status` (enum: pending, approved, rejected, withdrawn, waitlisted)
- `enrollment_type` (enum: full_time, part_time, drop_in)
- `schedule_days` (array of days: monday, tuesday, wednesday, thursday, friday)
- `start_time` (time)
- `end_time` (time)
- `previous_care` (text, optional - previous daycare/nursery)
- `notes` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 4. Attendance & Daily Care Tables

### `daily_check_in_out`
- `check_in_out_id` (PK, UUID)
- `child_id` (FK → children)
- `room_id` (FK → rooms)
- `check_in_date` (date)
- `check_in_time` (timestamp)
- `check_out_time` (timestamp, nullable)
- `checked_in_by` (FK → parents_guardians)
- `checked_out_by` (FK → parents_guardians, nullable)
- `authorized_pickup_person` (text, nullable - if different from parent)
- `notes` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `daily_care_logs`
- `care_log_id` (PK, UUID)
- `child_id` (FK → children)
- `room_id` (FK → rooms)
- `log_date` (date)
- `caregiver_id` (FK → employees, where employee_type IN ('caregiver', 'lead_caregiver'))
- `feeding_times` (json array - time, type, amount, notes)
- `diaper_changes` (json array - time, type, notes)
- `nap_times` (json array - start_time, end_time, duration_minutes)
- `activities_participated` (json array - activity_id, duration, notes)
- `mood` (enum: happy, content, fussy, crying, sleepy, playful)
- `health_notes` (text, nullable - temperature, symptoms, etc.)
- `special_notes` (text, nullable - any concerns or observations)
- `parent_notified` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `attendance_summary`
- `summary_id` (PK, UUID)
- `child_id` (FK → children)
- `room_id` (FK → rooms)
- `month` (integer, 1-12)
- `year` (integer)
- `total_days_enrolled` (integer)
- `days_present` (integer)
- `days_absent` (integer)
- `attendance_percentage` (decimal)
- `updated_at` (timestamp)

---

## 5. Developmental Milestones & Progress Tables

### `developmental_milestones`
- `milestone_id` (PK, UUID)
- `milestone_name` (e.g., "Sitting up", "Crawling", "First words", "Walking")
- `category` (enum: physical, cognitive, language, social, emotional)
- `typical_age_min_months` (integer)
- `typical_age_max_months` (integer)
- `description` (text)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `child_milestones`
- `child_milestone_id` (PK, UUID)
- `child_id` (FK → children)
- `milestone_id` (FK → developmental_milestones)
- `achieved_date` (date)
- `age_at_achievement_months` (integer)
- `notes` (text, optional)
- `observed_by` (FK → employees, where employee_type IN ('caregiver', 'lead_caregiver', 'nurse'))
- `created_at` (timestamp)

### `progress_reports`
- `progress_report_id` (PK, UUID)
- `child_id` (FK → children)
- `room_id` (FK → rooms)
- `report_period_start` (date)
- `report_period_end` (date)
- `physical_development` (text)
- `cognitive_development` (text)
- `language_development` (text)
- `social_development` (text)
- `emotional_development` (text)
- `strengths` (text)
- `areas_for_attention` (text)
- `caregiver_comments` (text)
- `parent_feedback` (text, nullable)
- `status` (enum: draft, published)
- `published_date` (date, nullable)
- `created_by` (FK → employees, where employee_type = 'lead_caregiver')
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
- `child_id` (FK → children)
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
- `child_id` (FK → children)
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
- `target_audience` (enum: all, parents, caregivers, staff, specific_room)
- `room_id` (FK → rooms, nullable)
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
- `related_entity_type` (enum: attendance, care_log, milestone, fee, announcement, daily_report, photo)
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
- `event_type` (enum: holiday, parent_meeting, open_house, special_activity, field_trip, photo_day, other)
- `start_date` (date)
- `end_date` (date)
- `start_time` (time, nullable)
- `end_time` (time, nullable)
- `location` (text, optional)
- `target_audience` (enum: all, parents, caregivers, staff, specific_room)
- `room_id` (FK → rooms, nullable)
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
- `holiday_type` (enum: public_holiday, daycare_holiday, special_event)
- `is_recurring` (boolean)
- `created_at` (timestamp)

---

## 10. Additional Tables (Optional but Recommended)

### `daily_photos`
- `photo_id` (PK, UUID)
- `child_id` (FK → children, nullable - can be group photos)
- `room_id` (FK → rooms)
- `photo_url` (text)
- `photo_date` (date)
- `caption` (text, nullable)
- `activity_description` (text, nullable)
- `uploaded_by` (FK → employees, where employee_type IN ('caregiver', 'lead_caregiver'))
- `parent_visible` (boolean, default true)
- `created_at` (timestamp)

### `meal_plans`
- `meal_plan_id` (PK, UUID)
- `meal_name` (e.g., "Breakfast", "Morning Snack", "Lunch", "Afternoon Snack")
- `meal_time` (time)
- `description` (text)
- `age_appropriate_min_months` (integer)
- `age_appropriate_max_months` (integer)
- `allergen_info` (text, nullable)
- `status` (enum: active, inactive)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `child_meal_logs`
- `meal_log_id` (PK, UUID)
- `child_id` (FK → children)
- `meal_plan_id` (FK → meal_plans)
- `meal_date` (date)
- `meal_time` (time)
- `amount_consumed` (enum: all, most, half, little, none)
- `notes` (text, nullable)
- `logged_by` (FK → employees, where employee_type IN ('caregiver', 'lead_caregiver'))
- `created_at` (timestamp)

### `medical_records`
- `medical_record_id` (PK, UUID)
- `child_id` (FK → children)
- `record_type` (enum: vaccination, illness, injury, medication, checkup, emergency)
- `record_date` (date)
- `description` (text)
- `doctor_name` (text, nullable)
- `clinic_hospital` (text, nullable)
- `medication_name` (text, nullable)
- `medication_dosage` (text, nullable)
- `medication_frequency` (text, nullable)
- `notes` (text, nullable)
- `document_url` (text, nullable - for medical certificates, prescriptions)
- `recorded_by` (FK → employees, where employee_type IN ('nurse', 'lead_caregiver', 'administrator'))
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `authorized_pickup_persons`
- `authorized_person_id` (PK, UUID)
- `child_id` (FK → children)
- `first_name`
- `last_name`
- `relationship` (text, e.g., "Aunt", "Grandmother", "Family Friend")
- `phone_number`
- `email` (nullable)
- `photo_url` (nullable - for identification)
- `id_document_url` (text, nullable)
- `is_active` (boolean, default true)
- `authorized_by` (FK → parents_guardians)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## Summary

**Total Recommended Tables: ~35-40 tables**

### Core Categories:
1. **User Management** (users, children, parents_guardians, employees)
2. **Room & Activity Structure** (rooms, activities, daily_schedules)
3. **Enrollment** (enrollments)
4. **Daily Care & Attendance** (daily_check_in_out, daily_care_logs, attendance_summary)
5. **Developmental Progress** (developmental_milestones, child_milestones, progress_reports)
6. **Financial** (fee_structure, fee_payments, fee_arrears)
7. **Communication** (announcements, notifications, messages)
8. **Events** (events, holidays)
9. **Settings** (school_settings)
10. **Additional Features** (daily_photos, meal_plans, child_meal_logs, medical_records, authorized_pickup_persons)

### Key Features for Infant/Toddler Care:
- **Daily Care Logs**: Track feeding, diaper changes, naps, activities, and mood
- **Developmental Milestones**: Monitor physical, cognitive, language, social, and emotional development
- **Medical Records**: Track vaccinations, illnesses, medications, and health information
- **Meal Planning**: Age-appropriate meal plans and consumption tracking
- **Photo Sharing**: Daily photos for parents to see their child's activities
- **Authorized Pickup**: Secure system for managing who can pick up children
- **Real-time Updates**: Parents receive notifications about daily activities, care logs, and milestones

This schema provides a comprehensive foundation for managing all aspects of Caritas Kiddie Academy daycare/nursery for infants and toddlers (6 months - 2 years).

