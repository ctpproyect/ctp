$('.quantity-button').off('click').on('click', function () {
  
  if ($(this).hasClass('quantity-add')) {
    var addValue = parseInt($(this).parent().find('input').val()) + 1;
		$(this).parent().find('input').val(addValue).trigger('change');
	}

	if ($(this).hasClass('quantity-remove')) {
    var removeValue = parseInt($(this).parent().find('input').val()) - 1;
		if( removeValue == 0 ) {
      removeValue = 1;
		}
		$(this).parent().find('input').val(removeValue).trigger('change');
	}

});


$('.quantity input').off('change').on('change', function() {
  console.log($(this).val());
});
