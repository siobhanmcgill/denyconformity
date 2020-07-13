release: ng build --prod
web: gunicorn -b :$PORT frontend:app
api: python3 server/manage.py runserver
