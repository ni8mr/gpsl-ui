
var values = {};
$.each($("#depot-submit-form").serializeArray(), function(i, field) {
    values[field.name] = field.value;
});