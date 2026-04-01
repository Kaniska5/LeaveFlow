**LeaveFlow - HRIS Leave Management System**
**Overview**

LeaveFlow is a role-based Leave Management System built as part of an HRIS (Human Resource Information System). This project demonstrates how design thinking can be translated into a functional product by implementing a core feature from a multi-persona dashboard.

The application supports three user roles: Employee, Manager, and HR, each with a customized interface and functionality.

**Problem Context**

This project is built as a solution to Problem 2: Build It from the HRIS design challenge

The focus is on implementing one key feature from the overall system:

**Leave Management System**

**Features**
**Employee**
View leave balances (Casual, Sick, Earned)
Apply for leave with date range, leave type, and reason
Track leave history and request status (Approved, Pending, Rejected)
**Manager**
View team leave requests
Approve or reject requests
Add comments to decisions
View team leave history
**HR**
View organization-wide leave statistics (total, pending, approved, rejected)
Filter leave records by status, department, and leave type
**Tech Stack**
HTML for structure
CSS for styling and responsive design
JavaScript (Vanilla) for logic and dynamic rendering
**How It Works**
Role-Based Rendering

The application dynamically switches between Employee, Manager, and HR views using a role-switching function.

**Data Handling**

All leave data is stored in-memory using JavaScript arrays. Each leave request contains employee details, leave type, dates, status, and comments.

**Leave Calculation**

Leave duration is calculated dynamically based on selected dates.

**Real-Time Updates**

The UI updates instantly after actions such as submitting a leave request or approving or rejecting a request. No backend is required.

**Design Thinking**

This implementation reflects the UX decisions from the HRIS dashboard design:

Employee: Action-focused interface with quick leave application and balance visibility
Manager: Decision-focused interface with priority on pending requests
HR: Insight-focused interface with aggregated data and filtering capabilities
Navigation Flow

The system follows a simple and intuitive navigation structure. Users start from a home screen and are redirected to relevant sections based on their role and selected actions. Each dashboard provides clear entry points to key features. Signing out brings the user back to the home screen, ensuring a complete and consistent user flow.

**Project Structure**

**LeaveFlow**

index.html - Application structure
styles.css - Styling and layout
app.js - Application logic
README.md - Documentation
How to Run
Download or clone the repository
Open index.html in a browser

No additional setup is required.

**Future Improvements**
Add backend support for persistent data storage
Implement authentication and role-based login
Integrate with real employee database
Add calendar-based leave visualization
Improve mobile responsiveness
Add notification system
Key Learning

This project demonstrates:

Converting UX design into a working application
Building role-based user interfaces
Managing state using vanilla JavaScript
Prioritizing features based on user roles
**Conclusion**

LeaveFlow is a simplified but effective implementation of a Leave Management System that highlights how thoughtful design can lead to meaningful functionality. It focuses on clarity, usability, and role-specific workflows within an HR system.
