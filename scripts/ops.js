const sections = $('section');
const display = $('.main-content');

let inScroll = false;

sections.first().addClass('visible');

const perfTransition = (sectionEq) => {
  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;

    display.css({ transform: `translateY(${position}%)` });

    sections
      .eq(sectionEq)
      .addClass('visible')
      .siblings()
      .removeClass('visible');

    setTimeout(() => {
      inScroll = false;
    }, 1300);
  }
};

const scrollViewport = (direct) => {
  const visibleSection = sections.filter('.visible');
  const nextSection = visibleSection.next();
  const prevSection = visibleSection.prev();

  if (direct === 'next' && nextSection.length) {
    perfTransition(nextSection.index());
  }
  if (direct === 'prev' && prevSection.length) {
    perfTransition(prevSection.index());
  }
};

$(window).on('wheel', (e) => {
  const deltaY = e.originalEvent.deltaY;
  console.log('wheel');

  if (deltaY > 0) {
    scrollViewport('next');
  }

  if (deltaY < 0) {
    scrollViewport('prev');
  }
});
