let indexToIdMapping = {
    0: "first",
    1: "second",
    2: "third",
    3: "fourth",
    4: "fifth",
    5: "sixth",
    6: "seventh",
}
let idToIndexMapping = {
    "first": 0,
    "second": 1,
    "third": 2,
    "fourth": 3,
    "fifth": 4,
    "sixth": 5,
    "seventh": 6,
}
var index = 0;

function bottomNavClickFoward() {
    bottomNavClick(1);
}


function bottomNavClickBack() {
    bottomNavClick(-1);
}

function bottomNavClick(dir) {
    var currArticle = document.getElementById(indexToIdMapping[index]+"-article")
    currArticle.classList = 'article'
    index += dir;
    var newArticle = document.getElementById(indexToIdMapping[index]+"-article")
    newArticle.classList = 'article visible'
    newPageId = indexToIdMapping[index];
    smoothScroll(0, document.body.scrollTop, document.body, "top")
    smoothScroll(0, document.documentElement.scrollTop, document.documentElement, "top")
    clickTopNav(newPageId);
}

function clickTopNav(clickedId) {
    var active = document.getElementsByClassName("active")[0];
    active.classList = modifyClassList('', active.id);
    document.getElementById(active.id+'-article').classList = "article";

    var clickedElement = document.getElementById(clickedId);
    clickedElement.classList = modifyClassList('active', clickedId);
    document.getElementById(clickedId+'-article').classList = "article visible";

    index = idToIndexMapping[clickedId];

    var scrollNav = document.getElementById("scrollnav");
    var to = clickedElement.offsetLeft - 80;
    var start = scrollNav.scrollLeft;
    
    if (to > scrollNav.scrollWidth - scrollNav.offsetWidth) {
        to = scrollNav.scrollWidth - scrollNav.offsetWidth;
    }
    smoothScroll(0, document.body.scrollTop, document.body, "top")
    smoothScroll(0, document.documentElement.scrollTop, document.documentElement, "top")
    smoothScroll(to, start, scrollNav, "left");
}

function smoothScroll(to, start, element, dir) {
    var change = to - start,
        currentTime = 0,
        increment = 20,
        duration = 200;

    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        if (dir === "left") {
            element.scrollLeft = val;
        } else if (dir === "top") {
            element.scrollTop = val;
        }
        
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

function modifyClassList(startingClassList, id) {
    if (id === "first") {
        return startingClassList + ' first';
    } else if(id === "seventh") {
        return startingClassList + ' last';
    } else {
        return startingClassList;
    }
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};