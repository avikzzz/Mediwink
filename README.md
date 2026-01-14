# Mediwink
A Web based application for Doctor-Patient communication and Prescription maintenance.
Mediwink is a web-based application designed to improve doctor–patient communication by digitizing prescriptions and medication tracking.
The application allows doctors to create structured prescriptions and enables patients to view and track their medication history digitally, eliminating the limitations of handwritten prescriptions.

Tech Stack :

Backend: .NET Core (Web API)

Frontend: React JS

Database: SQL Server

Tools: Visual Studio, Visual Studio Code, SQL Server Management Studio


Features :

* Doctor and Patient role-based access
* Digital prescription creation
* Medication history tracking
* Centralized data storage for future reference
* REST-based backend API
* Modern frontend using React


Local Setup Instructions :

Follow the steps below to run the project on your local machine.

1. Database Setup

* The project uses SQL Server as the database.
* Open SQL Server Management Studio (SSMS).
* Connect to your SQL Server instance.
* Navigate to the Mediwink_Database folder.
* Execute the provided SQL scripts:
         * Database creation script
         * Table creation scripts




2. Backend Setup (.NET Core)

* Open the backend solution from the Mediwink folder using Visual Studio.
* Restore NuGet packages (this happens automatically in most cases).
* Update the database connection string in the configuration file (appsettings.json) if required.
* Run the project using Visual Studio.
The backend API will start running locally.



3. Frontend Setup (React)
   
* Open the Mediwink_App folder in Visual Studio Code.
* npm install
* npm run dev

This will run the full application in the localhost.



Important Notes :

The backend API should be running before accessing frontend features.
Environment-specific configurations (such as connection strings) may need adjustment based on your local setup.


Author :

Avik Roy Chowdhury
.NET Developer | Backend-focused Full Stack Developer
