$(document).ready(function () {
  var checked = {};

  function modify() {
    var keys = Object.keys(checked);

    var string = "";

    for (var key of keys) {
      if (key != keys[0]) {
        string += ", ";
      }
      string += key.slice(1);
    }

    if (string.length > 30) {
      string = string.slice(0, 30);
      string += "...";
    }

    return string;
  }

  $('input[type="checkbox"]').change(function () {
    var id = this.getAttribute("data-id");
    var name = this.getAttribute("data-name");
    if ($(this).is(":checked")) {
      checked[name] = id;
      $(".amenities h4").text(modify);
    } else {
      delete checked[name];
      $(".amenities h4").text(modify);
    }
    console.log(checked);
  });
});
