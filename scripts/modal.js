const validateFields = (form, fieldsArray) => {
  fieldsArray.forEach((field) => {
    field.removeClass('input-error');
    if (field.val().trim() === '') {
      field.addClass('input-error');
    }
  });

  const errorFields = form.find('.input-error');

  return errorFields.length === 0;
};

$('.form').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $('#modal');
  const content = modal.find('.modal__message');

  modal.removeClass('error-modal');

  const isValid = validateFields(form, [name, phone, to, comment]);

  if (isValid != 0) {
    $.ajax({
      type: 'POST',
      url: 'https://webdev-api.loftschool.com/sendmail',
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val(),
      },
      success: (data) => {
        content.text(data.message);
        $.fancybox.open({
          src: '#modal',
          type: 'inline',
        });
      },
      error: (data) => {
        content.text(data.responseJSON.message);
        modal.addClass('error-modal');
        $.fancybox.open({
          src: '#modal',
          type: 'inline',
        });
      },
    });
  }
});

$('.app-submit-btn').click((e) => {
  e.preventDefault();
  $.fancybox.close();
});
