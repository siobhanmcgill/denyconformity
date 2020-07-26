# Denyconformity

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Setting up the database

<!-- Remember to start the cloud sql proxy ~

```
gcloud init
gcloud auth login
./cloud_sql_proxy -instances=denyconformity-staging:us-central1:denyconformity=tcp:3306
``` -->

Connect locally with:
`mysql -u denyconf -p -h 162.241.24.146`


## Setup

Install Django (python3-django), `libmysqlclient-dev`, Python 3, and the Angular CLI.

```
pip3 install virtualenv
```

Set up the virtual environment.

```
virtualenv venv
source venv/bin/activate
pip3 install -r ./requirements.txt
```

Make sure to set up a service account credential file as documented [here](https://cloud.google.com/secret-manager/docs/reference/libraries#client-libraries-install-python)

Create a .env file inside server/denyconformity that includes the keys `DB_PASSWORD`, `DB_NAME`, `DB_USER`, and `DB_HOST`.

## Startup

Enter the virtual environment with `source venv/bin/activate`.

Start the server with `python3 server/manage.py runserver`

Start the angular front-end server with `ng serve`


## Deploy

```
npm run build
```

### Google Cloud

```
gcloud app deploy app.yaml ./server/app.yaml
```

May need to add the new server IP (x.x.x.%) to the MySQL hosts [here](https://cpanel-box5878.bluehost.com/cpsess6011082395/frontend/bluehost/sql/managehost.html);

[This](https://cloud.google.com/appengine/kb#static-ip) page discusses how to find the App Enging IP.

### Heroku

Make sure that both `denyconformity` and `denyconformity-server` are set up as git upstreams.

This is currently not used, because Heroku is no cheaper than Google Cloud.

`git push denyconformity; git push denyconformity-server`

### Bluehost

This is the cheapest solution, which works for both the front-end and the database. To get a VPS that can run Django, it's actually more expensive than Heroku. It seems the best strategy for now is to run the server on Google Cloud and the Frontend on Bluehost using PHP.

Anyway, you have to add the Bluehost DenyConformity Git URL:

```
git remote add bluehost ssh://denyconf@denyconformity.com/home1/denyconf/public_html/denyconformity
```

You will also need to make sure that you have an SSH key set up on Bluehost.

To deploy, push the repo to there.

```
git push bluehost
```

## TODO

* ~~Make url slugs for posts.~~
* ~~Create URLs that match legacy URLs so old links will still work.~~
* Allow setting an image to a post for sharing purposes.
* Unit tests (which may or may not be possible through Bash on Windows).
* Test that posts that aren't published won't be fetched.
* Fix some bugs around switching series posts and returning home.
* Fix some issues with formatting on the reading view.
* Paginate comments.
