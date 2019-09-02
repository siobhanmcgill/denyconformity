# Denyconformity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Development server

Start the Python virtualenv:

```
> . .\venv\Scripts\activate
```

Start the Cloud SQL proxy in another shell:

```
> cloud_sql_proxy -instances=denyconformity-staging:us-central1:denyconformity=tcp:3306 -credential_file=<PATH_TO_KEY_FILE>.json
```

Start the Django server:

```
> py server/manage.py runserver
OR
> npm run server
```

Start the angular server in another shell:

```
> ng serve
OR
> npm start
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
