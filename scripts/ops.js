const sections = $('.section');
const display = $('.main-content');
const fixedMenu = $('.fixed-menu');
const menuItems = fixedMenu.find('.fixed-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('visible');

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;
  if (isNaN(position)) {
    console.error('wrong value in countSectionPosition');
    return 0;
  }

  return position;
};

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr('data-sidemenu-theme');
  const activeClass = 'fixed-menu--shadowed';

  if (menuTheme === 'dark') {
    fixedMenu.addClass(activeClass);
  } else {
    fixedMenu.removeClass(activeClass);
  }
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const perfTransition = (sectionEq) => {
  if (inScroll) return;

  const trancitionOver = 300;
  const mouseInertionOver = 200;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({ transform: `translateY(${position}%)` });

  resetActiveClassForItem(sections, sectionEq, 'visible');

  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--active');
  }, trancitionOver + mouseInertionOver);
};

const viewportScroller = () => {
  const visibleSection = sections.filter('.visible');
  const nextSection = visibleSection.next('.section');
  const prevSection = visibleSection.prev();

  return {
    next() {
      if (nextSection.length) {
        perfTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        perfTransition(prevSection.index());
      }
    },
  };
};

$(window).on('wheel', (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', (e) => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'textarea' || tagName === 'input';
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38:
      scroller.prev();
      break;
    case 40:
      scroller.next();
      break;
    case 32:
      scroller.next();
      break;
  }
});

$('.wrapper').on('touchmove', (e) => e.preventDefault());

$('[data-scroll-to]').click((e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);
  perfTransition(reqSection.index());
});

if (isMobile) {
  $('body').swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = '';
      if (direction === 'up') scrollDirection = 'next';
      if (direction === 'down') scrollDirection = 'prev';
      scroller[scrollDirection]();
    },
  });
}
