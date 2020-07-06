const openItem = (item) => {
  const cont = item.closest('.team__member');
  const content = cont.find('.member__job');
  const textBl = content.find('.member__job--block');
  const heightBl = textBl.height();
  const arrow = cont.find('.member__arrow');

  arrow.addClass('clicked');
  cont.addClass('opened');

  content.height(heightBl);
};

const closeAll = (container) => {
  const item = container.find('.member__job');
  const allLi = container.find('.team__member');
  const arrow = container.find('.member__arrow');

  arrow.removeClass('clicked');
  allLi.removeClass('opened');
  item.height(0);
};

$('.member__name').click((e) => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const container = $this.closest('.team__members');
  const contElem = $this.closest('.team__member');

  if (contElem.hasClass('opened')) {
    closeAll(container);
  } else {
    closeAll(container);
    openItem($this);
  }
});
