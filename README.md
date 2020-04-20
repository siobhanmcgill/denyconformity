# Denyconformity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Setup

Install dependencies:
```
> sudo npm install -g @angular/cli
> npm install
> sudo apt install default-libmysqlclient-dev
> sudo pip3 install virtualenv
```

Set up virtualenv in the project:

```
> cd [path to project]
> virtualenv venv
```

Start the Python virtualenv:

Windows:
```
> . .\venv\Scripts\activate
```

Linux/bash:
```
> source venv/bin/activate
```

Install Dependencies
```
> pip3 install django
> pip3 install django-cors-headers
> pip3 install mysqlclient
```


## Development server

Make sure you are inside the virtualenv.


Start the [Cloud SQL proxy](https://cloud.google.com/sql/docs/mysql/connect-admin-proxy) in another shell:

```
> cloud_sql_proxy -dir=/cloudsql -instances=denyconformity-staging:us-central1:denyconformity=tcp:3306 -credential_file=<PATH_TO_KEY_FILE>.json
```

Start the Django server:

```
> python3 server/manage.py runserver
```

Start the angular server in another shell:

```
> ng serve
OR
> npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## TODO

* Post series functionality.
* Deep linking to a post.
* Saving comments.
* Admin tools.
* Bug fixes and tests.
* Build and deploy process for production.
* Production set up and URL mapping, etc.

