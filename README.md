# Denyconformity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Setting up the database

Remember to start the cloud sql proxy ~

```
gcloud init
gcloud auth login
./cloud_sql_proxy -instances=denyconformity-staging:us-central1:denyconformity=tcp:3306
```

Connect locally with:
`mysql -u staging_root -p --host 127.0.0.1`


## Setup

Install Django, Python 3, and the Angular CLI.

```
pip3 install virtualenv
```

Set up the virtual environment.

```
virtualenv venv
source venv/bin/activate
```

Install the pip packages in requirements.txt.

Make sure to set up a service account credential file as documented [here](https://cloud.google.com/secret-manager/docs/reference/libraries#client-libraries-install-python)

## Startup

Enter the virtual environment with `source venv/bin/activate`.

Start the server with `python3 server/manage.py runserver`

Start the angular front-end server with `ng serve`


## TODO

* Mobile layout.
* Unit tests (which may or may not be possible through Bash on Windows).
* Test that posts that aren't published won't be fetched.
* Fix some bugs around switching series posts and returning home.
* Fix some issues with formatting on the reading view.
