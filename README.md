# Visual Course Planner

The Visual Course Planner is a web application that allows students to visually organize their courses for the upcoming year(s) for a specific degree or program offered at the University of British Columbia Okanagan.


## Client: Dr. Abdallah Mohammed

### Scope and Charter Document

https://docs.google.com/document/d/1EulJgTtqNE2kb4zPltSDRTXZDvub2RHAyxv1OXzHOlY/edit

### Team Members
- Project Manager: Noman Mohammed
- Technical Lead: Taylor Siemens
- Integration Lead: Mackenzie Salloum
- Client Liaison: Herraj Luhano
- Developer: Jaskaran Lidher

## Installation Steps

1. Clone this repository
2. Ensure a MySQL instance is running on port 3306.
3. Create a database user with username `vcpUser` and no password.
4. Run
```bash
npm install && (cd client && npm install)
npm run dev
```
to start the app.  
5. localhost:3000 should open in your browser.

## Builds

Builds are sent to TravisCI automatically. Build setup is located in the `.travis.yml` file.