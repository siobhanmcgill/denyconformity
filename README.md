# Denyconformity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Install Django, Python 3, and the Angular CLI.

```
pip3 install virtualenv
```

Set up the virtual environment.

```
virtualenv venv
source venv/bin/activate
```

```
pip3 install django-cors-headers
```

Start the cloudsql proxy:

```
cloud_sql_proxy -instances=denyconformity-staging:us-central1:denyconformity=tcp:3306 -credential_file=<PATH_TO_KEY_FILE>.json
```

Start the server with `python3 server/manage.py runserver`

Start the angular front-end server with `ng serve`


## TODO

* Mobile layout.
* Unit tests (which may or may not be possible through Bash on Windows).
* Test that posts that aren't published won't be fetched.
* Fix formatting on recent posts.
