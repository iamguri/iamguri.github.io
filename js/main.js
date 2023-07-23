$(document).ready(function () {
  // Hero typed

  var typed_strings = $(".typed").data("typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });

  // shrink navbar
  $(document).on("scroll", function () {
    if ($(document).scrollTop() > 300) {
      $("#nav").addClass("navbar_fixed");
    } else {
      $("#nav").removeClass("navbar_fixed");
    }
  });

  // skill filters
  let $btns1 = $(".skill-area ul.filters>li");
  $btns1.click(function (e) {
    $(".skill-area .ul.filters>li").removeClass("active");
    e.target.classList.add("active");

    let selector1 = $(e.target).attr("data-filter");
    $(".skill-area .grid").isotope({
      filter: selector1,
    });
    return false;
  });

  // project filter
  let $btns = $(".project-area ul.filters>li");
  $btns.click(function (e) {
    $(".project-area .ul.filters>li").removeClass("active");
    e.target.classList.add("active");

    let selector = $(e.target).attr("data-filter");
    $(".project-area .grid").isotope({
      filter: selector,
    });

    return false;
  });

  // smooth scroll
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1600,
    speedAsDuration: true,
    offset: 10,
  });

  // contact form
  function submitToAPI(e) {
    e.preventDefault();
    var URL =
      "https://9jjf2benn1.execute-api.us-east-1.amazonaws.com/contactForm";

    var Namere = /[A-Za-z]{1}[A-Za-z]/;
    if (!Namere.test($("#name-input").val())) {
      alert("Name can not less than 2 char");
      return;
    }
    var mobilere = /[0-9]{10}/;
    if (!mobilere.test($("#phone-input").val())) {
      alert("Please enter valid mobile number");
      return;
    }
    if ($("#email-input").val() == "") {
      alert("Please enter your email id");
      return;
    }

    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (!reeamil.test($("#email-input").val())) {
      alert("Please enter valid email address");
      return;
    }

    var name = $("#name-input").val();
    var phone = $("#phone-input").val();
    var email = $("#email-input").val();
    var desc = $("#description-input").val();
    var data = {
      name: name,
      phone: phone,
      email: email,
      desc: desc,
    };

    $.ajax({
      type: "POST",
      url: "https://9jjf2benn1.execute-api.us-east-1.amazonaws.com/contactForm",
      dataType: "json",
      crossDomain: "true",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),

      success: function () {
        // clear form and show a success message
        alert("Successfull");
        document.getElementById("contact-form").reset();
        location.reload();
      },
      error: function () {
        // show an error message
        alert("UnSuccessfull");
      },
    });
  }
});
