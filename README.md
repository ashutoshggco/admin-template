# Next.js Admin Project Template

This is a Next.js admin project template that provides a starting point for building a web application with authentication, a dashboard with table functionality, and a main branch that combines both features. The project structure includes three branches: `auth`, `dashboard`, and `main`.

## Branches

### Auth Branch

The `auth` branch contains the authentication functionality, including login, signup, and forgot password features. This branch serves as the foundation for user authentication in the application.

### Dashboard Branch

The `dashboard` branch focuses on creating a dashboard with a table component that supports search, sort, and filter capabilities. The dashboard displays a table of users obtained from the API endpoint `${apiURL}/getUsers`, with parameters for pagination, sorting, searching, and filtering.

#### API Endpoint

The API endpoint for retrieving user data is:

`${apiURL}/getUsers?page=${pageNo}&pagesize=${itemsPerPage}&sortkey=${sortKey}&order=${order[sortKey]}&searchterm=${searchTerm}`

The value of `apiURL` is obtained from the environment variable `API_URL`.

### Main Branch

The `main` branch combines both the authentication and dashboard functionality. It integrates the authentication features from the `auth` branch and the dashboard features from the `dashboard` branch.

## How to Run the Project

To run the project, follow these steps:

1. Clone the repository:
