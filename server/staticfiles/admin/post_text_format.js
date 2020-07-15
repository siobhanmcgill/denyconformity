function post_text_format() {

  const textarea = document.getElementById('id_text');

  const text = textarea.value
    .replace(/’/g, "&rsquo;")
    .replace(/“/g, "&ldquo;")
    .replace(/”/g, "&rdquo;")
    .replace(/‘/g, "&lsquo;");

  textarea.value = text;

}

function auto_summary() {
  const textarea = document.getElementById('id_summary');

  textarea.value = 'auto';
}
