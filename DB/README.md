# DB DriveXport

### Want to run the DB?
- Make sure you have docker installed and running
- Duplicate the file `compose-variables-template.env` to `compose-variables.env`
- Fill the variables to match your container variables.
- run 
  - `
      docker-compose up -d
    `
- This will create the containers of `MySql:8.1.0` and `PhPMyAdmin`