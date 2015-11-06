
/* слайдер на главной */
$(".carousel-inner .item:first-child").addClass("active");
/* navbar-top */
$(window).scroll(function() {
  var top = $(document).scrollTop();
  if (top < 100) $("#navbar-top").css({top: '0', position: 'relative'});
  else $("#navbar-top").css({top: '40px', position: 'fixed'});
});
/* кнопка поиска*/
$( "#btn-submit" ).click(function() {
  $("#search").submit();
});
/* readmore*/
$('.anons').readmore({
    speed: 75,
    maxHeight: 80,
    moreLink: '<a href="#">Подробнее</a>',
	lessLink: '<a href="#">Скрыть</a>'
});
$(function () {
    
    sliderHomepage();
    sliders();
    fullScreenContainer();
    utils();
    animations();
    hotBooks();
    autocompliteCity()
    deliveryAndPay();
});

function hotBooks(){
    $('.newbook').hover(
        function(){
        $(this).find('.hot-name').fadeIn(500);    
        },
        function(){
        $(this).find('.hot-name').fadeOut(500);    
        }
    );
}
function autocompliteCity(){
    $("#city").autocomplete({
        source: function(request,response) {
	        $.ajax({
	        url: "http://api.cdek.ru/city/getListByTerm/jsonp.php?callback=?",
	        dataType: "jsonp",
	        data: {
	        	q: function () { return $("#city").val() },
	        	name_startsWith: function () { return $("#city").val() }
	        },
	        success: function(data) {
	          response($.map(data.geonames, function(item) {
	            return {
	              label: item.name,
	              value: item.name,
	              id: item.id
	            }
	          }));
	        }
	      });
	    },
	    minLength: 1,
	    select: function(event,ui) {
	    	//console.log("Yep!");
	    	$('#receiverCityId').val(ui.item.id);
	    }
	  });
}
/*  договор офферты и кнопка отправки заказа*/
function deliveryAndPay(){
    weight=$('input[name=weight]').val();
    sum=Number($('input[name=start-sum]').val());
    $('input[name=submit]').hide();
    $('input[name=oferta]').change(function(){
        if ($(this).prop('checked')===true) {
            validDeleveryPayOfferta();
        }
        else {$('input[name=submit]').hide();}
    });
    
    
    $('input[name=delivery]').change(function(){
        
            if($("input[name='delivery']:checked").val() === 'Почта России'){
               $("#pay-type-cash").hide();
               $('input:radio[name=pay-type]:nth(1)').attr('checked',false);
                validDeleveryPayOfferta();            
                delivpost=Math.floor(56.65+(weight-60)*2.36/20);
                banderoles=Math.ceil(weight/2000);
                delivpost+=Math.floor((banderoles-1)*(56.65+40*2.36/20));
                totalsum=sum+delivpost;
                InsertDataDelivery(delivpost,totalsum);
            }
            else if($("input[name='delivery']:checked").val() === 'Курьерская служба' || $("input[name='delivery']:checked").val() === 'Самовывоз'){
               $("#pay-type-cash").show();
                validDeleveryPayOfferta();
                receiverCityId=$('#receiverCityId').val();
                typeDelivery=$("input[name='delivery']:checked").val();
                total=$("input[name='total']").val();
                path="/assets/components/delivery/sdek.php";
                $.ajax({
                type: "POST",
                url: path,
                data:  "receiverCityId="+receiverCityId+"&weight="+weight+"&total="+total+"&typeDelivery="+typeDelivery,
                    success: function(msg){
                    /*alert( msg ); */
                        if(/^(Ошибка)/.test(msg)){
                        totalsum=sum;
                        }
                        else{
                        msg=Number(msg);
                        totalsum=sum+msg;
                        }                    
                    InsertDataDelivery(msg,totalsum);
                     }
                }); 
            }
            else{
            alert('error');    
            }
    });
    $('input[name=pay-type]').change(function(){
        validDeleveryPayOfferta();    
    });
}
function InsertDataDelivery(pricedelevery, totalsum){
    $("input[name=delivery-price]").val(pricedelevery);
    $("#sum-delivery").text(pricedelevery);
    $("input[name=delivery-price-sum]").val(totalsum);
    $("#sum-order").text(totalsum); 
}
function validDeleveryPayOfferta(){
   if($('input[name=oferta]').prop('checked')===true){
    a=$("input[name='delivery']:checked").val();
    b=$("input[name='pay-type']:checked").val();
        if(a !==undefined && b !==undefined){
            $('#error-sender').hide();
            $('input[name=submit]').show();
        }
        else{
            $('input[name=submit]').hide();
            $('#error-sender').show();
        }
   } 
}
/* for demo purpose only - can be deleted */

/* slider homepage */

function sliderHomepage() {
    if ($('#slider').length) {
	var owl = $("#slider");

	$("#slider").owlCarousel({
	    autoPlay: 4000,
	    items: 4,
	    itemsDesktopSmall: [900, 3],
	    itemsTablet: [600, 3],
	    itemsMobile: [500, 2]
	});
    }

}
/* sliders */

function sliders() {
    if ($('.owl-carousel').length) {

	$(".customers").owlCarousel({
	    items: 6,
	    itemsDesktopSmall: [990, 4],
	    itemsTablet: [768, 2],
	    itemsMobile: [480, 1],
	    pagination : false,
	    autoPlay: true,
	    loop: true
	});

	$(".testimonials").owlCarousel({
	    items: 4,
	    itemsDesktopSmall: [990, 3],
	    itemsTablet: [768, 2],
	    itemsMobile: [480, 1]
	});

	$('.project').owlCarousel({
	    navigation: true, // Show next and prev buttons
	    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	    slideSpeed: 300,
	    paginationSpeed: 400,
	    autoPlay: true,
	    stopOnHover: true,
	    singleItem: true,
	    afterInit: '',
	    lazyLoad: true
	});

	$('.homepage').owlCarousel({
	    navigation: false, // Show next and prev buttons
	    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	    slideSpeed: 2000,
	    paginationSpeed: 1000,
	    autoPlay: true,
	    stopOnHover: true,
	    singleItem: true,
	    lazyLoad: false,
	    addClassActive: true,
	    afterInit: function () {
		//animationsSlider();
	    },
	    afterMove: function () {
		//animationsSlider();
	    }
	});
    }

}


/* animations */

function animations() {
    delayTime = 0;
    $('[data-animate]').css({opacity: '0'});
    $('[data-animate]').waypoint(function (direction) {
	delayTime += 150;
	$(this).delay(delayTime).queue(function (next) {
	    $(this).toggleClass('animated');
	    $(this).toggleClass($(this).data('animate'));
	    delayTime = 0;
	    next();
	    //$(this).removeClass('animated');
	    //$(this).toggleClass($(this).data('animate'));
	});
    },
	    {
		offset: '90%',
		triggerOnce: true
	    });

    $('[data-animate-hover]').hover(function () {
	$(this).css({opacity: 1});
	$(this).addClass('animated');
	$(this).removeClass($(this).data('animate'));
	$(this).addClass($(this).data('animate-hover'));
    }, function () {
	$(this).removeClass('animated');
	$(this).removeClass($(this).data('animate-hover'));
    });

}

function animationsSlider() {

    var delayTimeSlider = 400;

    $('.owl-item:not(.active) [data-animate-always]').each(function () {

	$(this).removeClass('animated');
	$(this).removeClass($(this).data('animate-always'));
	$(this).stop(true, true, true).css({opacity: 0});

    });

    $('.owl-item.active [data-animate-always]').each(function () {
	delayTimeSlider += 500;

	$(this).delay(delayTimeSlider).queue(function (next) {
	    $(this).addClass('animated');
	    $(this).addClass($(this).data('animate-always'));

	    console.log($(this).data('animate-always'));

	});
    });



}


/* full screen intro */

function fullScreenContainer() {

    var screenWidth = $(window).width() + "px";

    if ($(window).height() > 500) {
	var screenHeight = $(window).height() + "px";
    }
    else {
	var screenHeight = "500px";
    }


    $("#intro, #intro .item").css({
	width: screenWidth,
	height: screenHeight
    });
}
function utils() {

    /* tooltips */

    $('[data-toggle="tooltip"]').tooltip();

    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
	var radio = $(this).find(':radio');
	radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

	window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

	e.preventDefault();
	window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to, .scroll-to-top').click(function (event) {

	var full_url = this.href;
	var parts = full_url.split("#");
	if (parts.length > 1) {

	    scrollTo(full_url);
	    event.preventDefault();
	}
    });
    function scrollTo(full_url) {
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#" + trgt).offset();
	var target_top = target_offset.top - 100;
	if (target_top < 0) {
	    target_top = 0;
	}

	$('html, body').animate({
	    scrollTop: target_top
	}, 1000);
    }
}

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

	var maxHeight = 0;
	var children = $(this).find('.same-height');
	children.height('auto');
	if ($(window).width() > 768) {
	    children.each(function () {
		if ($(this).innerHeight() > maxHeight) {
		    maxHeight = $(this).innerHeight();
		}
	    });
	    children.innerHeight(maxHeight);
	}

	maxHeight = 0;
	children = $(this).find('.same-height-always');
	children.height('auto');
	children.each(function () {
	    if ($(this).height() > maxHeight) {
		maxHeight = $(this).innerHeight();
	    }
	});
	children.innerHeight(maxHeight);

    });
}

$(window).load(function () {

    windowWidth = $(window).width();

    $(this).alignElementsSameHeight();
    pictureZoom();
});
$(window).resize(function () {

    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
	setTimeout(function () {
	    $(this).alignElementsSameHeight();
	    fullScreenContainer();
	    pictureZoom();
	}, 205);
	windowWidth = newWindowWidth;
    }

});
