# 📋 Task Dashboard

A dashboard application to manage tasks

## 💻 Technologies Used

* **React:** Frontend library for building the user interface.
* **TypeScript:** For static typing of data objects and component props.
* **Tailwind CSS:** Utility-first framework for styling.

## ✨ Features

* **Create Tasks:** User can create new tasks.
* **View Tasks:** Displays a list of all relevant tasks, including descriptions, priorities, and deadlines.
* **Filter Tasks:** Filter the tasks by current status, priority level, or a combination of both.
* **Update Status:** Change the current phase of any task (e.g., from pending to completed).
* **Edit Tasks:** Edit any task property.
* **Delete Items:** Permanently remove items from the dashboard.

## 🏛️ Component Architecture

The application relies on a top-down data flow. The root component (App.tsx) holds the main state (the master array of tasks and current states and filters) and passes that data down to child components. User interactions in child components (TaskFilter and TaskItem) trigger callback functions passed down as props, which send instructions back up to the root to update the state.

                     [ App ]                           
            (State: tasks, filterState)                            
              │                     │                  
              ▼                     ▼                  
        onFilterChange()    filteredTasks (data)  
              │               onStatusChange()    
              │                 onDelete()             
              │                     │             
              ▼                     ▼             
        [ TaskFilter ]          [TaskList]              
                                    │             
                                    ▼             
                                task (data)       
                              onStatusChange()    
                                 onDelete()       
                                    │             
                                    ▼             
                                [ TaskItem ]     

## ⚙️ Installation

To run this project locally, execute the following commands in your terminal:

```bash
# Clone the repository
git clone https://github.com/elysewelsh/sba9.git

# Navigate into the directory
cd task-dashboard

# Install dependencies (React, TypeScript, Tailwind, etc.)
npm install

# Start the local development server
npm run dev
```

## 📖 References

* **Project References:** Lab9.3, Module 9 lessons, React documentation, https://stackoverflow.com/questions/33188994/scroll-to-the-top-of-the-page-after-render-in-react-js, https://stackoverflow.com/questions/41058681/sort-array-by-dates-in-react-js, https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/, https://www.freecodecamp.org/news/how-to-count-objects-in-an-array/
* **To Format README:** These templates gave me formatting advice and inspiration:
     - [Scrimba README template](https://github.com/elysewelsh/lab2.1/blob/main/README.md)
     - [Frontend Mentor README template](https://github.com/elysewelsh/sba3/blob/main/README-template.md)
     - [asciiflow.com](https://asciiflow.com/#/) made the flow diagram for the architecture

## 💖 Acknowledgements

Permission has been given to use my repository as reference material to anyone in class.

* **Rita:** taught me the "if (!variable.trim())" shortcut
* **Monique:** offered her assistance several times

## 🧘 Reflections

1. How did you implement React and TypeScript features?
    >I used interfaces and types to keep data and props consistent.
    >
    >I used components to better control rendering of certain parts of the application.
    >
    >I used multiple states to control when components re-render.
    >
    >I was able to use one object to control many inputs in the form and one to control what items re-render via filters.
1. What challenges did you encounter and how did you overcome them?
    >When I added sorting functionality, it only worked sometimes. After adding and deleting about 50 lines of code and different functions, I discovered that my sorted state was not initialized the same as my overall tasks state. I copied the initial state for both and it started working.
    >
    >I failed to figure out how to do conditional styling with tailwind. I wanted to use it to input the percentages of tasks into the status bar, but I don't think it works like that. I had to use in-line styling.
    >
    >I have very, very weak form validation because I couldn't figure out how to pass values back to just one span by the inputs in the form.
    >
    >I didn't have enough time to do real date formatting for display, but I found a sort function that sorted by date, so I used that with a different date format than the input.
1. Explain your approach to component composition and state management.
    >For component composition, I started with the basics: what will each component return? Fortunately, I had a headstart because of Lab9.3, but I'll give an example of how I did the TaskForm component which was new:
    >Once I determined the form would return the form display, I knew that clearing the form and sending the input values would be prompted by the state of the inputs, that the inputs needed to be an object to pass between components, and that the object would take the shape of the Task interface. From there, I set up the functions to pass the props in the style of the existing Lab9.3 components that passed the event.target.value and then used the values within handler functions in the Dashboard component. I used the state again within the handler functions to clear the states so that the input form would be fresh and ready to accept new data.