sequenceDiagram
    participant browser
    participant server
    participant user

    user->>browser: fill the form content
    user->>browser: click the save button
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    browser->>server: { "content": "HTML is easy", "date": "2023-1-1" }
    activate server 
    server->>browser: 201 Created (response) 
    deactivate server    


    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes 