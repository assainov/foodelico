const Animation = (function() {

    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }
    
    
    function elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop - 15;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    return {
        smoothScroll : function(eID) {
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 30) speed = 30;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i=startY; i<stopY; i+=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for ( var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }
        }
    }
})();


document.querySelector('#menu-btn').addEventListener('click', function (e) {
    Animation.smoothScroll('section-menu');

    e.preventDefault();
});


document.querySelector('#order-btn').addEventListener('click', function (e) {
    Animation.smoothScroll('section-order');

    e.preventDefault();
});


// document.querySelector('.i-btn').firstElementChild.addEventListener('click', function(e) {
//     const info = document.querySelector('.info-body');
//     const close = document.querySelector('.close-btn');
//     const i = document.querySelector('.i-btn');

//     info.classList.add('show-info');
//     close.classList.add('show-btn');
//     i.firstElementChild.style.visibility = 'hidden';

//     e.preventDefault();
// });

// document.querySelector('.close-btn').firstElementChild.addEventListener('click', function(e) {
//     const info = document.querySelector('.info-body');
//     const close = document.querySelector('.close-btn');
//     const i = document.querySelector('.i-btn');

//     info.classList.remove('show-info');
//     close.classList.remove('show-btn');
//     i.firstElementChild.style.visibility = 'visible';

//     e.preventDefault();
// });

document.querySelector('#abbreviations__closeBtn').addEventListener('click', function(e) {
    const abbreviations__input = document.querySelector('.abbreviations__input');

    abbreviations__input.checked = false;
});

//  MENU APP
const MenuApp = (function() {
    //  Private
    const showToday = function() {
        const today = new Date();
        $(document).ready(function(){
            $('.daily-menu').slick({
                nextArrow:$('.next'),
                prevArrow:$('.prev'),
                //  Set the initial slide to today's weekday
                initialSlide: today.getDay(),
            });
        });
    }

    const getTodayName = function() {
        const today = new Date();

        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];
        
        return weekday;
    }

    const displayMenu = function(days) {
        const menu = document.querySelector('.daily-menu');
        
        days.forEach(function(day, index){
            if (day.name === 'Samstag' || day.name === 'Sonntag') {
                menu.firstElementChild.firstElementChild.children[index+1].innerHTML = `
                    <h1 class="weekday daily-menu__weekday">${day.name}</h1>
                    <p class="soup daily-menu__soup">Closed</p>
                    `;
            } else {
                menu.firstElementChild.firstElementChild.children[index+1].innerHTML = `
                <h1 class="weekday daily-menu__weekday">${day.name}</h1>
                <h5 class="menu-title daily-menu__title">Suppe</h5>
                <p class="soup">${day.soup}</p>
                <h5 class="menu-title daily-menu__title">Menü 1</h5>
                <p class="option1 daily-menu__dish">${day.option1}</p>
                <h5 class="menu-title daily-menu__title">Menü 2</h5>
                <p class="option2 daily-menu__dish">${day.option2}</p>
                <h5 class="menu-title daily-menu__title">Menü 3</h5>
                <p class="option3 daily-menu__dish">${day.option3}</p>
                <h5 class="menu-title daily-menu__title">Nachspeise</h5>
                <p class="dessert daily-menu__dish">${day.dessert}</p>
                `;
            }
        });
    }

    //  Public
    return {
        init : function() {
            //  Scroll to the current day of week
            showToday();

            

            // Get a reference to the database service
            let daysRef = firebase.database().ref();

            //  Read the data and put it in the days array
            daysRef.child('days').once('value').then(function(snapshot) {
                const days = snapshot.val();
                displayMenu(days);

            });

        }
    }
})();

MenuApp.init();