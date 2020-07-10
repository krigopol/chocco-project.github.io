const measureWidth = (item) => {
  let needWidthForelement = 0;

  const windowWidth = $(window).width();
  const titleWidth = $('.accordeon-horizontal__trigger').width();
  const titles = $('.accordeon-horizontal__item');
  const needWidth = windowWidth - titleWidth * titles.length;

  const textContainer = item.find('.accordeon-horizontal__content');
  const paddingLeft = parseInt(textContainer.css('padding-left'));
  const paddingRight = parseInt(textContainer.css('padding-right'));

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    needWidthForelement = needWidth;
  } else {
    needWidthForelement = 500;
  }

  return {
    container: needWidthForelement,
    textContainer: needWidthForelement - paddingLeft - paddingRight,
  };
};

const closeEveryTitleinContainer = (container) => {
  const items = container.find('.accordeon-horizontal__item');
  const content = container.find('.accordeon-horizontal__wrap');
  items.removeClass('active');
  content.width(0);
};

const openTitle = (item) => {
  const hiddenContent = item.find('.accordeon-horizontal__wrap');
  const width = measureWidth(item);
  const textBlock = item.find('.accordeon-horizontal__content');

  item.addClass('active');
  hiddenContent.width(width.container);
  textBlock.width(width.textContainer);
};

$('.accordeon-horizontal__trigger').on('click', (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest('.accordeon-horizontal__item');
  const titleOpened = item.hasClass('active');
  const container = $this.closest('.accordeon-horizontal__list');

  if (titleOpened) {
    closeEveryTitleinContainer(container);
  } else {
    closeEveryTitleinContainer(container);
    openTitle(item);
  }
});

$('.accordeon-horizontal__close').on('click', (e) => {
  e.preventDefault();

  closeEveryTitleinContainer($('.accordeon-horizontal__list'));
});
