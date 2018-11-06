$(document).ready(function() {
    $('.gallery__link').magnificPopup({
        gallery:{
            enabled: true, // set to true to enable gallery
            preload: [0,2], // read about this option in next Lazy-loading section
            navigateByImgClick: true,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
            tPrev: 'Previous image', // title for left button
            tNext: 'Next image', // title for right button
            }, 
        type:'image',
        showCloseBtn: false});
    });