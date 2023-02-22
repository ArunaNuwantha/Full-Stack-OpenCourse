```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant SPA

    User->>+Browser: Access https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>+SPA: Request single-page app version
    SPA->>+Browser: Serve single-page app version
    Browser->>+SPA: Load single-page app version
    SPA->>+Browser: Load notes from API
    Browser->>+SPA: Display notes
```