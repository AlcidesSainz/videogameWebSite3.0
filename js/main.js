/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

"use strict";

(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");

    /*------------------
            FIlter
        --------------------*/
    $(".filter__controls li").on("click", function () {
      $(".filter__controls li").removeClass("active");
      $(this).addClass("active");
    });
    if ($(".filter__gallery").length > 0) {
      var containerEl = document.querySelector(".filter__gallery");
      var mixer = mixitup(containerEl);
    }
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  // Search model
  $(".search-switch").on("click", function () {
    $(".search-model").fadeIn(400);
  });

  $(".search-close-switch").on("click", function () {
    $(".search-model").fadeOut(400, function () {
      $("#search-input").val(``);
    });
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*------------------
        Video Player
    --------------------*/
  const player = new Plyr("#player", {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "captions",
      "settings",
      "fullscreen",
    ],
    seekTime: 25,
  });

  /*------------------
        Niceselect
    --------------------*/
  $("select").niceSelect();

  /*------------------
        Scroll To Top
    --------------------*/
  $("#scrollToTopButton").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  const createSlider = () => {
    const data = {};
    const url = `https://api.rawg.io/api/games?key=43d750c7481748f99dabb07d5e8aa4eb&page_size=30`;
    fetch(url, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        $("#hero_sliderDiv").empty();

        let { results } = data; //desestructuracion de objeto

        $.each(results, function (indexInArray, valueOfElement) {
          let { id, name, background_image, genres, platforms } =
            valueOfElement;

          let genresDescription = "";
          let platformDescription = "";

          $.each(genres, function (index, gender) {
            let { name } = gender;
            genresDescription += `-${name} `;
          });
          $.each(platforms, function (index, platform) {
            let { name } = platform;
            platformDescription += `-${name} `;
          });

          let _slider = `<div class="hero__items setimg-bg" data-setbg="${background_image}">                                
                            <div class="row">
                                    <div class="col-lg-6">
                                        <div class="hero__text">
                                            <div class="label">${genresDescription}</div>
                                            </br>
                                            <h2 style="font-size:30px;background-color: #0b0c2a;color:#e53637; display:inline-block; padding:10px">${name}</h2>
                                            <p>${platformDescription}</p>
                                            <a href="#"><span>Ver Detalles</span> <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

          $("#hero_sliderDiv").append(_slider);
        });
      })
      .then(() => {
        $(".setimg-bg").each(function () {
          var bg = $(this).data("setbg");
          $(this).css("background-image", "url(" + bg + ")");
        });
      })
      .then(() => {
        /*------------------
                    Hero Slider
                --------------------*/
        var hero_s = $(".hero__slider");
        hero_s.owlCarousel({
          loop: true,
          margin: 0,
          items: 1,
          dots: true,
          nav: true,
          navText: [
            "<span class='arrow_carrot-left'></span>",
            "<span class='arrow_carrot-right'></span>",
          ],
          animateOut: "fadeOut",
          animateIn: "fadeIn",
          smartSpeed: 1200,
          autoHeight: false,
          autoplay: true,
          mouseDrag: false,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const trending = () => {
    let randomNum = Math.floor(Math.random() * 30) + 2;
    const data = {};
    const url = `https://api.rawg.io/api/games?key=43d750c7481748f99dabb07d5e8aa4eb&page=${randomNum}`;
    fetch(url, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        $("#card-trending").empty();

        let { results } = data; //desestructuracion de objeto

        $.each(results, function (indexInArray, valueOfElement) {
          let { id, name, background_image, genres, metacritic, rating } =
            valueOfElement;

          let genresDescription = "";

          $.each(genres, function (index, gender) {
            let { name } = gender;
            genresDescription += `-<li>${name}</li>`;
            
          });

          let card = `<div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic setimg-bg" data-setbg="${background_image}">
                                            <div class="ep">${metacritic}</div>
                                            <div class="view">${rating}/5 <i class="fa fa-star"</i> </div>
                                        </div>
                                        <div class="product__item__text">
                                            <ul>
                                               ${genresDescription}
                                            </ul>
                                            <h5><a href="#">${name}</a></h5>
                                        </div>
                                    </div>
                                </div>`;
          
          $("#card-trending").append(card);
        });
      })
      .then(() => {
        $(".setimg-bg").each(function () {
          var bg = $(this).data("setbg");
          $(this).css("background-image", "url(" + bg + ")");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  

  createSlider();
  trending();
})(jQuery);
