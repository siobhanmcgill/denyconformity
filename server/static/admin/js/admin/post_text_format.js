
(function($) {
'use strict';
$(document).ready(function() {
  $('body').on('click', '.dc-text-format-button', e => {
  });
  $('body').on('click', '.dc-text-unformat-button', e => {
    const textarea = $('#id_text');
    let text = textarea.val();

    text = text.replace(/\&rsquo;/gi, '’');
    text = text.replace(/\&lsquo;/gi, '‘');
    text = text.replace(/\&ldquo;/gi, '“');
    text = text.replace(/\&rdquo;/gi, '”');

    textarea.val(text);
  });
  $('body').on('click', '.dc-text-double-linebreak-button', e => {
    const textarea = $('#id_text');
    console.log('hi');
    let text = textarea.val();

    // Replace single linebreaks with doubles.
    text = text.replace(/(?<!\n)\n(?!\n)/g, '\n\n');
    console.log({ text });

    textarea.val(text);
  });
});
})(django.jQuery);
