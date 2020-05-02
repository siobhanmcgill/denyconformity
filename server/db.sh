echo "Resetting database schema..."
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete

# mysqladmin -u staging_root --password=temporary --host 127.0.0.1 drop denyconformity_staging --force
# mysqladmin -u staging_root --password=temporary --host 127.0.0.1 create denyconformity_staging --force

mysqladmin -u root -p --host 127.0.0.1 drop denyconformity --force
mysqladmin -u root -p --host 127.0.0.1 create denyconformity --force

python3 manage.py makemigrations
python3 manage.py migrate

echo "Creating the SUPERUSER"
python3 manage.py createsuperuser

echo "Posts..."
python3 manage.py loaddata posts

echo "Tags..."
python3 manage.py loaddata tags

echo "Post tags . . ."
python3 manage.py loaddata post_tags

echo "Comments..."
python3 manage.py loaddata comments

echo "Series..."
python3 manage.py loaddata series
