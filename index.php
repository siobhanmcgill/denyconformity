<?php
/*
This is the PHP version of the standalone DenyConformity front-end app.
This is the same as frontend.py, to run on the cheapest possible
place - bluehost.

To deploy the front-end to a PHP only server, deploy:
* This file
* .htaccess
* The entire dist/ directory

Oh boy. I hate PHP.
*/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once './vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$DB_HOST = $_ENV['DB_HOST'];
$DB_USER = $_ENV['DB_USER'];
$DB_NAME = $_ENV['DB_NAME'];
$DB_PASSWORD = $_ENV['DB_PASSWORD'];

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$default_title = 'DenyConformity.com - a very interesting website place.';
$default_description = 'DenyConformity.com is your source for cool original content that is really quite interesting. Comedy, stories, pictures, technology, and more search engine optimization can all be found right here. Drop by very occasionally for cool new stuff, all moderated and mostly written by one very tall lady, Siobhan.';
$keywords_base = 'Shauvon, McGill, siobhan, interesting, unique, original, content, conformity, non-conformity, website';
$default_keywords = $keywords_base.', comedy, fiction, stories, blog, photography, technology, Torres, funny, originality, sci-fi';
$image = 'https://storage.googleapis.com/denyconformity_assets/111webassets/site%20image%203%20-%20fb.jpg';

$url_path = $_SERVER['REQUEST_URI'];
$host = $_SERVER['HTTP_HOST'];

$Parsedown = new Parsedown();
$posts = array();

if (preg_match('/\/(p|posts)\/([a-z0-9\-]+)/', $url_path, $matches) ||
    preg_match('/\/series\/([a-z0-9\-]+);post=([a-z0-9\-]+)/', $url_path, $matches)) {
  $slug = $matches[2];
  $sql = "SELECT
            p.*, GROUP_CONCAT(t.text SEPARATOR ', ') AS tags
          FROM posts_post AS p
          LEFT JOIN posts_post_tags AS pt
            ON pt.post_id=p.id
          LEFT JOIN posts_tag AS t
            ON t.id=pt.tag_id
          WHERE p.slug='".$slug."'
          GROUP BY p.id";
  $result = $conn->query($sql) or die('WHAT '.$conn->error);
  if ($result->num_rows > 0) {
    $post = $result->fetch_assoc();
    $post['mdtext'] = $Parsedown->text($post['text']);
    $keywords = $keywords_base.', '.$post['tags'];
    $list = false;
    $title = $post['title'].' - original content from DenyConformity.com';
    $desc = $post['summary'];
    if ($post['image']) {
      $image = $post['image'];
    }
  }
} else {
  // Get latest posts.
  $sql = "SELECT
            p.*, GROUP_CONCAT(t.text) AS tags
          FROM posts_post AS p
          LEFT JOIN posts_post_tags AS pt
            ON pt.post_id=p.id
          LEFT JOIN posts_tag AS t
            ON t.id=pt.tag_id
          WHERE p.pub=1
          GROUP BY p.id ORDER BY p.time DESC LIMIT 5";
  $result = $conn->query($sql) or die('WHAT '.$conn->error);
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      if($row && $row['markdown']) {
        $row['mdsummary'] = $Parsedown->text($row['summary']);
      }
      $row['firsttag'] = explode(',', $row['tags'])[0];
      array_push($posts, $row);
    }
  }
  $title = $default_title;
  $desc = $default_description;
  $keywords = $default_keywords;
  $list = true;
  $post = null;
}

// Render the template.
$loader = new \Twig\Loader\FilesystemLoader('./dist');
$twig = new \Twig\Environment($loader, [
    // 'cache' => './compilation_cache',
]);
$template = $twig->load('index.html');
echo $template->render([
  'title' => $title,
  'description' => strip_tags($desc),
  'keywords' => $keywords,
  'list' => $list,
  'posts' => $posts,
  'post' => $post,
  'image' => $image,
  'url' => 'http://'.$host.$url_path,
  'prod' => strpos($host, 'denyconformity.com') != false
]);

?>
