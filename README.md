This project implements a Log Ingestor and Query Interface, providing a system to efficiently handle vast volumes of log data and a simple interface for querying this data using full-text search or specific field filters.

## Setup

Before running the application, ensure you have set up a local PostgreSQL database. Follow the steps below:

1. **Create a .env File:**
   Create a file named `.env` in the project root and add the following line, replacing `"your_database_url"` with your actual PostgreSQL connection URL:

   ```env
   DATABASE_URL=your_database_url

#### API Endpoints
Insert Logs:

1. Endpoint: http://localhost:3000/insert-log
Method: POST
Parameters:
json
Copy code
{
  "level": "version info 2",
  "message": "Testing Log version 1 Ingestor",
  "resourceId": "server-231",
  "traceId": "abc23",
  "spanId": "span56",
  "commit": "Commit for 56789",
  "metadata": {
    "parentResourceId": "server-789"
  }
}

All Logs:

2. Endpoint: http://localhost:3000/logs
Method: GET
Search Log with Any Field:

3. Endpoint: http://localhost:3000/logs?message=Testing Log Ingestor
Method: GET
Note: Replace message with any field for search.
Search Between Selected Date Range:

4. Endpoint: http://localhost:3000/logs/date-range?start=2023-11-18T08:46:55.660Z&end=2023-11-18T13:13:49.116Z
Method: GET
CLI Commands
Insert Logs:

##### Command: log-cli insert-log
Note: Customize the data to insert in the script (bin/index.js).

1. Get All Logs:
Command: log-cli get-logs
Search Log with Any Field:

2. Command: log-cli get-logs
Note: Customize the endpoint in the script for specific field search.
Search Log with Date Range:

3. Command: log-cli search-date-range <startDate> <endDate>
Note: Replace <startDate> and <endDate> with the desired date range.


Running the API
Clone the repository.
Install dependencies: npm install.
Run the API: node index.js.

Running the CLI
Ensure the CLI script is executable: chmod +x bin/index.js.
Run CLI commands as mentioned above.
