```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant SPA
    participant API

    User->>+Browser: Access https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>+SPA: Request single-page app version
    SPA->>+Browser: Serve single-page app version
    Browser->>+SPA: Load single-page app version
    User->>+SPA: Click "save" button
    SPA->>+API: Send POST request with new note data
    API->>+SPA: Return a Response
    SPA->>+Browser: Display new note
```