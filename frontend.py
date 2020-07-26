# This script is a standalone python app to serve the DenyConformity front-end.
# It loads post data from the database to inject it into the page.
# So crawlers, facebook links, and etcetera will show the proper content without
# having to load the Angular app.

import logging
import os
import sqlalchemy
import markdown

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
# from google.cloud import secretmanager

app = Flask(__name__, template_folder="dist", static_folder="dist")


if os.getenv('PROD', '') == 'true':
    # # Secret Manager client.
    # secret_client = secretmanager.SecretManagerServiceClient()
    # project_id = 'denyconformity'

    # key_name = secret_client.secret_version_path(
    #     project_id, 'django_secret_key_prod', 1)
    # key_response = secret_client.access_secret_version(key_name)
    # SECRET_KEY = key_response.payload.data.decode('UTF-8')
    SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

    # db_password_name = secret_client.secret_version_path(
    #     project_id, 'db_password_prod', 2)
    # db_password_response = secret_client.access_secret_version(
    #     db_password_name)
    # DB_PASSWORD = db_password_response.payload.data.decode('UTF-8')
    DB_PASSWORD = os.environ['DB_PASSWORD']
else:
    from dotenv import load_dotenv
    load_dotenv()
    DB_PASSWORD = os.environ['DB_PASSWORD']

database_uri = 'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db}'.format(
    db_user=os.environ['DB_USER'],
    db_password=DB_PASSWORD,
    db_host=os.environ['DB_HOST'],
    db=os.environ['DB_NAME']
)

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

default_title = 'DenyConformity.com - a very interesting website place.'
default_description = 'DenyConformity.com is your source for cool original content that is really quite interesting. Comedy, stories, pictures, technology, and even more can all be found right here. Drop by all the time for cool new stuff, all moderated and mostly written by one tall person, Shauvon McGill.'
default_keywords = 'comedy, fiction, stories, blog, photography, technology, Shauvon, McGill, siobhan, Torres, funny, interesting, unique, original, content, conformity, non-conformity, originality, sci-fi, website'


class Post(db.Model):
    __tablename__ = 'posts_post'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime())
    title = db.Column(db.String())
    summary = db.Column(db.String())
    pub = db.Column(db.Boolean())
    slug = db.Column(db.String())
    text = db.Column(db.String())
    markdown = db.Column(db.Boolean())

# This will render HTML content so hotlinking (like Facebook or web crawlwers)
# will be able to have content to show.

# Show an entire post if the URL demands it.
@app.route('/posts/<slug>')
@app.route('/p/<slug>')
def post(slug):
    post = Post.query.filter_by(pub=True, slug=slug).first()
    title = '{} - original content from DenyConformity.com'.format(post.title)
    desc = post.summary
    keywords = default_keywords
    return render_template('index.html', post=post, markdown=markdown,
                           title=title, description=desc, keywords=keywords)

# Otherwise just load the latest posts.
@app.route('/')
@app.route('/posts')
@app.route('/<path>')
def posts(path=''):
    title = default_title
    posts = Post.query.filter_by(pub=True).order_by(
        sqlalchemy.desc(Post.time)).limit(10)
    desc = default_description
    keywords = default_keywords
    return render_template('index.html', list=True, posts=posts,
                           markdown=markdown, title=title, description=desc,
                           keywords=keywords)


@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500


if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
