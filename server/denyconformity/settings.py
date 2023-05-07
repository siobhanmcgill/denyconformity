"""
Django settings for denyconformity project.

Generated by 'django-admin startproject' using Django 2.2.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
from google.cloud import secretmanager

# GCP Project containing the DELICIOUS SECRETS.
project_id = 'denyconformity'


# The main admin username is siobhan

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

DEBUG_PROPAGATE_EXCEPTIONS = True

if os.getenv('PROD', '') == 'true':
    # Production
    DEBUG = False
    # Secret Manager client.
    secret_client = secretmanager.SecretManagerServiceClient()

    key_name = secret_client.secret_version_path(
        project_id, 'django_secret_key_prod', 1)
    key_response = secret_client.access_secret_version(key_name)
    SECRET_KEY = key_response.payload.data.decode('UTF-8')

    db_password_name = secret_client.secret_version_path(
        project_id, 'db_password_prod', 2)
    db_password_response = secret_client.access_secret_version(
        db_password_name)
    DB_PASSWORD = db_password_response.payload.data.decode('UTF-8')
else:
    from dotenv import load_dotenv
    load_dotenv()
    DEBUG = True
    SECRET_KEY = '8*6^z)tj*^go@m#8ks0rytjvxhv2lf=ech8^_bg1uxjw1$#%vc'
    DB_PASSWORD = os.environ['DB_PASSWORD']


ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.denyconformity.com',
    'denyconformity.uc.r.appspot.com',
    'server-dot-denyconformity.uc.r.appspot.com'
]

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'posts.apps.PostsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'denyconformity.urls'

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False

# CORS_ORIGIN_WHITELIST = {
#     'http://localhost:4200',
# }

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates', 'server/templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'denyconformity.wsgi.application'


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'posts': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases


# TODO: DB Password for staging is 'temporary'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'STORAGE_ENGINE': 'InnoDB',
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': DB_PASSWORD,
        'HOST': os.environ['DB_HOST'],
        'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME':
        'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME':
        'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME':
        'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME':
        'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'US/Pacific'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
# STATIC_ROOT = 'server/static'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES':
    ['rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'],
    'DEFAULT_PAGINATION_CLASS':
    'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE':
    5
}
