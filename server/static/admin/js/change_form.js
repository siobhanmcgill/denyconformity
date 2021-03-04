/*global showAddAnotherPopup, showRelatedObjectLookupPopup showRelatedObjectPopup updateRelatedObjectLinks*/

(function ($) {
  'use strict';
  $(document).ready(function () {
    var modelName = $('#django-admin-form-add-constants').data('modelName');
    $('body').on('click', '.add-another', function (e) {
      e.preventDefault();
      var event = $.Event('django:add-another-related');
      $(this).trigger(event);
      if (!event.isDefaultPrevented()) {
        showAddAnotherPopup(this);
      }
    });

    if (modelName) {
      $('form#' + modelName + '_form :input:visible:enabled:first').focus();
    }

    $('body').on('click', '.dc-text-format-button', e => {
      console.log('text format!');
    });
  });
})(django.jQuery);
