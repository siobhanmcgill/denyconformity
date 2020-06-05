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

# Copy prod to staging...
rm ~/dc.sql
mysqldump -u denyconf -p -h 162.241.24.146 denyconf_2020 > ~/dc.sql
mysql -u denyconf -p -h 162.241.24.146 denyconf_2020-staging < ~/dc.sql
