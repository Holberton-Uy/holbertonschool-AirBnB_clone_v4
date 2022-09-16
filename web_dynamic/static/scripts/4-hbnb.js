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
  });

  $.get("http://localhost:5001/api/v1/status", function (data) {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });

  let users = [];

  $.get("http://localhost:5001/api/v1/users", function (data, status) {
    if (status > 400) {
      console.log("Error");
      return;
    }
    users = data;
    $.ajax({
      url: "http://localhost:5001/api/v1/places_search",
      type: "post",
      data: JSON.stringify({}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (response) {
        response.sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        for (let place of response) {
          let article = $("<article></article>");

          // ----------------------------------------
          let title_box = $("<div></div>").addClass("title_box");
          let name = $("<h2></h2>").text(place.name);
          let price_by_night = $("<div></div>")
            .addClass("price_by_night")
            .text("$" + place.price_by_night);

          title_box.append(name);
          title_box.append(price_by_night);
          // ----------------------------------------

          let information = $("<div></div>").addClass("information");

          let string = " Guests";

          if (place.max_guest == 1) {
            string = string.slice(0, -1);
          }

          let max_guest = $("<div></div>")
            .addClass("max_guest")
            .text(place.max_guest + string);

          string = " Bedrooms";

          if (place.number_rooms == 1) {
            string = string.slice(0, -1);
          }

          let number_rooms = $("<div></div>")
            .addClass("number_rooms")
            .text(place.number_rooms + string);

          string = " Bathrooms";

          if (place.number_bathrooms == 1) {
            string = string.slice(0, -1);
          }

          let number_bathrooms = $("<div></div>")
            .addClass("number_bathrooms")
            .text(place.number_bathrooms + string);

          information.append(max_guest);
          information.append(number_rooms);
          information.append(number_bathrooms);

          // ----------------------------------------

          let user_div = $("<div></div>").addClass("user");

          let first_name;
          let last_name;

          for (let user of users) {
            if (user.id === place.user_id) {
              first_name = user.first_name;
              last_name = user.last_name;
              break;
            }
          }

          let owner = $("<b></b>").text(
            "Owner: " + first_name + " " + last_name
          );

          user_div.append(owner);

          // ----------------------------------------

          let description = $("<div></div>")
            .addClass("description")
            .html(place.description);

          // ----------------------------------------

          article.append(title_box);
          article.append(information);
          article.append(user_div);
          article.append(description);
          $("section.places").append($(article));
        }
      },
    });
  });
  $("button").click(function () {
    console.log(checked);
    $(".places").children("article").remove();
    $.get("http://localhost:5001/api/v1/users", function (data, status) {
      if (status > 400) {
        console.log("Error");
        return;
      }
      copyChecked = Object.values(checked)
      users = data;
      let filtered = copyChecked.map((obj) => obj.split(":")[1]);

      $.ajax({
        url: "http://localhost:5001/api/v1/places_search",
        type: "post",
        data: JSON.stringify({ amenities: filtered }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
          response.sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          });
          for (let place of response) {
            let article = $("<article></article>");

            // ----------------------------------------
            let title_box = $("<div></div>").addClass("title_box");
            let name = $("<h2></h2>").text(place.name);
            let price_by_night = $("<div></div>")
              .addClass("price_by_night")
              .text("$" + place.price_by_night);

            title_box.append(name);
            title_box.append(price_by_night);
            // ----------------------------------------

            let information = $("<div></div>").addClass("information");

            let string = " Guests";

            if (place.max_guest == 1) {
              string = string.slice(0, -1);
            }

            let max_guest = $("<div></div>")
              .addClass("max_guest")
              .text(place.max_guest + string);

            string = " Bedrooms";

            if (place.number_rooms == 1) {
              string = string.slice(0, -1);
            }

            let number_rooms = $("<div></div>")
              .addClass("number_rooms")
              .text(place.number_rooms + string);

            string = " Bathrooms";

            if (place.number_bathrooms == 1) {
              string = string.slice(0, -1);
            }

            let number_bathrooms = $("<div></div>")
              .addClass("number_bathrooms")
              .text(place.number_bathrooms + string);

            information.append(max_guest);
            information.append(number_rooms);
            information.append(number_bathrooms);

            // ----------------------------------------

            let user_div = $("<div></div>").addClass("user");

            let first_name;
            let last_name;

            for (let user of users) {
              if (user.id === place.user_id) {
                first_name = user.first_name;
                last_name = user.last_name;
                break;
              }
            }

            let owner = $("<b></b>").text(
              "Owner: " + first_name + " " + last_name
            );

            user_div.append(owner);

            // ----------------------------------------

            let description = $("<div></div>")
              .addClass("description")
              .html(place.description);

            // ----------------------------------------

            article.append(title_box);
            article.append(information);
            article.append(user_div);
            article.append(description);
            $("section.places").append($(article));
          }
        },
      });
    });
  });
});
