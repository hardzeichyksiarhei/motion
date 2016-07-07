$(function() {

    $('.color-pallete').colorPallete({
        'width'               : 160,
        'cogAnimate'          : 'false',
        'nameColorCss'        : ['default', 'green', 'orange'],
        'itemsColorPallete'   : [
            ['#eb4f4e', '#232324', '#6cc372'],
            ['#6cc372', '#232324', '#eb4f4e'],
            ['#FFB03B', '#232324', '#DB9E36']
        ]
    });

    $('.scrollspy').scrollSpy();

    $('.m-toggle').on('click', function () {
        $('.slideMenu').slideToggle();
    });

    // OwlCarousel

    var owl_1 = $('.owl-carousel-1');

    owl_1.owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        items: 1
    });

    $('.main-header .arrow-prev').click(function() {
        owl_1.trigger('prev.owl.carousel');
    });

    $('.main-header .arrow-next').click(function() {
        owl_1.trigger('next.owl.carousel');
    });

    var owl_2 = $('.owl-carousel-2');

    owl_2.owlCarousel({
        loop: true,
        margin: 70,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });

    $('.portfolio .arrow-prev').click(function() {
        owl_2.trigger('prev.owl.carousel');
    });

    $('.portfolio .arrow-next').click(function() {
        owl_2.trigger('next.owl.carousel');
    });

    var owl_3 = $('.owl-carousel-3');

    owl_3.owlCarousel({
        loop: true,
        margin: 70,
        nav: false,
        dots: false,
        items: 1
    });

    $('.tweets .arrow-prev').click(function() {
        owl_3.trigger('prev.owl.carousel');
    });

    $('.tweets .arrow-next').click(function() {
        owl_3.trigger('next.owl.carousel');
    });

    // Google Map
    var new_york = {lat: 40.71482, lng: -73.9970039};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new_york
    });

    var marker = new google.maps.Marker({
        position: new_york,
        map: map
    });

    //E-mail Ajax Send
    //Documentation & Example: https://github.com/agragregra/uniMail
    $("form").submit(function() { //Change
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Thank you!");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });


    // Page preloder
    var preloader = $('.loader-container');
    preloader.delay(350).fadeOut('slow');

});