# echo "Resetting database schema..."
# find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
# find . -path "*/migrations/*.pyc"  -delete

# mysqladmin -u staging_root --password=temporary --host 127.0.0.1 drop denyconformity_staging --force
# mysqladmin -u staging_root --password=temporary --host 127.0.0.1 create denyconformity_staging --force

# mysqladmin -u root -p --host 127.0.0.1 drop denyconformity --force
# mysqladmin -u root -p --host 127.0.0.1 create denyconformity --force

# python3 manage.py makemigrations
# python3 manage.py migrate

#

if [ -f ../.env ]
then
  export $(cat ../.env | sed 's/#.*//g' | xargs)
fi

# Copy prod to staging...
rm ~/dc.sql

mysqldump --column-statistics=0 -u $DB_USER --password=$DB_PASSWORD -h $DB_HOST denyconf_2020 > ~/dc.sql
mysql -u $DB_USER --password=$DB_PASSWORD -h $DB_HOST denyconf_2020-staging < ~/dc.sql

# Update staging admin password to Beebaw123.
mysql -u $DB_USER --password=$DB_PASSWORD -h $DB_HOST denyconf_2020-staging \
 -e 'UPDATE auth_user SET password="pbkdf2_sha256$180000$SgbgdQfGdzDv$g7sZa7b7m7R3oX2Pvz7dFT9FM7Giw20HttVh3x0o5mQ=" WHERE username="shauvon";'
