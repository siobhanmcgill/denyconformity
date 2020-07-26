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

include('./env.php');


$DB_HOST = getenv('DB_HOST');
$DB_USER = getenv('DB_USER');
$DB_NAME = getenv('DB_NAME');
$DB_PASSWORD = getenv('DB_PASSWORD');

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$default_title = 'DenyConformity.com - a very interesting website place.';
$default_description = 'DenyConformity.com is your source for cool original content that is really quite interesting. Comedy, stories, pictures, technology, and even more can all be found right here. Drop by all the time for cool new stuff, all moderated and mostly written by one tall person, Shauvon McGill.';
$keywords_base = 'Shauvon, McGill, siobhan, interesting, unique, original, content, conformity, non-conformity, website';
$default_keywords = $keywords_base.', comedy, fiction, stories, blog, photography, technology, Torres, funny, originality, sci-fi';

$url_path = $_SERVER['REQUEST_URI'];

$Parsedown = new Parsedown();
$posts = array();

if (preg_match('/\/(p|posts)\/([a-z0-9\-]+)/', $url_path, $matches)) {
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
  'description' => $desc,
  'keywords' => $keywords,
  'list' => $list,
  'posts' => $posts,
  'post' => $post
]);

// $html = file_get_contents('./dist/index.html');
// $html = str_replace('{{ title }}', $title, $html);
// $html = str_replace('{{ description }}', $desc, $html);
// $html = str_replace('{{ keywords }}', $keywords, $html);

// if (!$list) {
//   $html = preg_replace('/\{\% if list \%\}.*\{\% endif \%\}/', '', $html);
// }

// print_r($html);

?>
