(function($) {
'use strict';
$(document).ready(function() {
  $('body').on('click', '.dc-text-format-button', e => {});
  $('body').on('click', '.dc-text-unformat-button', e => {
    const textarea = $('#id_text');
    let text = textarea.val();

    text = text.replace(/\&rsquo;/gi, '’');
    text = text.replace(/\&lsquo;/gi, '‘');
    text = text.replace(/\&ldquo;/gi, '“');
    text = text.replace(/\&rdquo;/gi, '”');

    textarea.val(text);
  });

  $('body').on('click', '.dc-link-to-doc-button', e => {
    if (window.authorizeForPicker && window.authApiLoaded &&
        window.pickerApiLoaded) {
      authorizeForPicker();
    }
  });
});
})(django.jQuery);
