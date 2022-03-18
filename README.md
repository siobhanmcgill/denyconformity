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

Install Python 3, pip3, `libmysqlclient-dev`, Node, NPM, Git, and Gcloud.

`libssl-dev` may also be required on Linux.

### Server setup

```
pip3 install virtualenv
```

Set up the virtual environment.

```
virtualenv venv
source venv/bin/activate
pip3 install -r ./server/requirements.txt
```

Make sure to set up a service account credential file as documented [here](https://cloud.google.com/secret-manager/docs/reference/libraries#client-libraries-install-python)

Create a .env file inside server/denyconformity that includes the keys `DB_PASSWORD`, `DB_NAME`, `DB_USER`, and `DB_HOST`.

### Frontend setup

```
npm install
```

## Startup

Enter the virtual environment with `source venv/bin/activate`.

Start the server with `python3 server/manage.py runserver`

Start the angular front-end server with `ng serve`

To test the PHP front-end, you might need to start up apache. `sudo service apache2 restart`


## Deploy

The Angular project should be built first:

```
npm run build
```

### Bluehost with Google Cloud API

This is the cheapest solution, which works for both the front-end and the database. To get a VPS that can run Django, it's actually more expensive than Heroku. It seems the best strategy for now is to run the server on Google Cloud and the Frontend on Bluehost using PHP.

Anyway, you have to add the Bluehost DenyConformity Git URL:

```
git remote add bluehost ssh://denyconf@denyconformity.com/home1/denyconf/public_html/denyconformity
```

You will also need to make sure that you have an SSH key set up on Bluehost.

It's also possible you need to update your git-receive-pack setting (if pushing gets a weird error)

```
git config remote.bluehost.receivepack /usr/local/cpanel/3rdparty/lib/path-bin/git-receive-pack
```

To deploy, push the repo to there.

```
git push bluehost
```

Then the server can be deployed to Google AppEngine:

```
gcloud app deploy ./server/server-as-default.yaml
```

May need to add the new server IP (x.x.x.%) to the MySQL hosts [here](https://cpanel-box5878.bluehost.com/cpsess6011082395/frontend/bluehost/sql/managehost.html);

[This](https://cloud.google.com/appengine/kb#static-ip) page discusses how to find the App Enging IP.


### Deprecated: Fully Google Cloud

Both services can be deployed to Google Cloud as python packages. However, running two Python services on AppEngine can get expensive.

```
gcloud app deploy app.yaml ./server/app-server.yaml
```

### Deprecated: Heroku

Make sure that both Heroku projects (`denyconformity` and `denyconformity-server`) are set up as git upstreams.

This is currently not used, because Heroku is no cheaper than Google Cloud.

`git push denyconformity; git push denyconformity-server`

## TODO

* ~~Make url slugs for posts.~~
* ~~Create URLs that match legacy URLs so old links will still work.~~
* ~~Allow setting an image to a post for sharing purposes.~~
* Unit tests (which may or may not be possible through Bash on Windows).
* ~~Test that posts that aren't published won't be fetched.~~
* Fix some bugs around switching series posts and returning home.
* Fix some issues with formatting on the reading view.
* Paginate comments.
* Finish survey functionality.
* Implement better system for finding older posts.
* Strip HTML tags from meta tags so they don't get shared.
