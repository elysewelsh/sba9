# 📋 Task Dashboard

A dashboard application to manage tasks

## 💻 Technologies Used

* **React:** Frontend library for building the user interface.
* **TypeScript:** For static typing of data objects and component props.
* **Tailwind CSS:** Utility-first framework for styling.

## ✨ Features

* **Create Tasks:** User can create new tasks.
* **View Tasks:** Displays a list of all relevant tasks, including descriptions, priorities, and deadlines.
* **Summarize Tasks:** Displays a summary of all tasks, aggregated by priorities, status, and deadlines.
* **Filter Tasks:** Sort the tasks by current status, priority level, or a combination of both.
* **Update Status:** Change the current phase of any task (e.g., from pending to completed).
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

* **Project References:** References and code citations within components
* **To Format README:** These templates gave me formatting advice and inspiration:
     - [Scrimba README template](https://github.com/elysewelsh/lab2.1/blob/main/README.md)
     - [Frontend Mentor README template](https://github.com/elysewelsh/sba3/blob/main/README-template.md)
     - [asciiflow.com](https://asciiflow.com/#/) made the flow diagram for the architecture

## 💖 Acknowledgements

Anyone in the list below has full access to this code and can fork or clone it because they directly contributed to it in some way. Permission has been given to use my repository as reference material to anyone else in class as well. (Monique shared her repository with me. I didn't visit it, but I do want to give a special acknowledgment for that!)

* **TBD**


## 🧘 Reflections

1. How did you implement React and TypeScript features?
    >
1. What challenges did you encounter and how did you overcome them?
    >
1. Explain your approach to component composition and state management.
    >