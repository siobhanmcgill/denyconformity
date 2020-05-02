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
