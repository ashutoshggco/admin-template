# Next.js Admin Project Template

This is a Next.js admin project template that provides a starting point for building a web application with authentication, a dashboard with table functionality, and a main branch that combines both features. The project structure includes three branches: `auth`, `dashboard`, and `main`.

## Branches

### Auth Branch

The `auth` branch contains the authentication functionality, including login, signup, and forgot password features. This branch serves as the foundation for user authentication in the application.

#### SignUp Component

The `SignUp` component handles the user sign up functionality. Here's a breakdown of what the code does:

- Defines a component named `SignUp` that accepts an `apiURL` prop.
- Initializes state variables using the `useState` hook: `formData` (stores form data), `loading` (indicates if form submission is in progress), and `errors` (stores validation errors).
- Defines a function named `handleSubmit` that handles form submission:
  - Validates the form data using the `validateFormData` function.
  - Sets the validation errors in the `errors` state variable.
  - If there are no validation errors, it logs the form data to the console.
- Defines a function named `handleChange` that updates the `formData` state variable when form fields change.
- Sets up an effect using the `useEffect` hook:
  - Runs the `validateFormData` function whenever `formData` or `errors` change.
  - Updates the `errors` state variable with the new validation errors.
- Defines a function named `validateFormData` that validates the form fields and returns an object containing any validation errors.
- Renders the component:
  - Displays a loader component when `loading` is `true`.
  - Renders a form with input fields for first name, last name, email, password, and confirm password.
  - Displays any validation errors for each field.
  - Provides a submit button to sign up.
  - Includes a link to the login page.

#### Login Component

The `Login` component handles the user sign up functionality. Here's a breakdown of what the code does:

- It uses React hooks (`useState`, `useEffect`) and Next.js router (`useRouter`).
- State variables: `email`, `password`, `wrongCred` (incorrect credentials), `errorText`, `loading`.
- The `handleLogin` function processes the login:
  - Constructs an object with email and password.
  - Sends a login request using the `login` function from the network API.
  - If successful (status code 200), stores the token and redirects to the home page.
  - If failed (status code >= 400), sets the error message based on the response and displays it.
- The component renders a login form with email and password inputs.
- It includes "Forgot Password?" and "Sign Up" links.
- A loader component is shown during login if `loading` is true.


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

1. Clone the repository.
2. Switch to the desired branch (`auth`, `dashboard`, or `main`).
3. Install dependencies.
4. Set up the API URL:
   - Open the project in your preferred code editor.
   - Locate the API URL configuration file (e.g., `config.js` or similar).
   - Update the environment variable `API_URL` with the actual URL of your API.
5. Start the development server.
6. Access the application in your web browser: http://localhost:3000/