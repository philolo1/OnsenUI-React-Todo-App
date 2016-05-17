var Animator = {
  remove: (listItem, callback) => {
    listItem.classList.add('animation-remove');
    listItem.classList.add('hide-children');

    setTimeout(function() {
      listItem.classList.remove('animation-remove');
      listItem.classList.remove('hide-children');
      callback();
    }, 750);
  },

  swipe: (swipeRight, listItem, callback) => {
    var animation = swipeRight ? 'animation-swipe-right' : 'animation-swipe-left';
    listItem.classList.add('hide-children');
    listItem.classList.add(animation);

    setTimeout(function() {
      listItem.classList.remove(animation);
      listItem.classList.remove('hide-children');
      callback();
    }, 950);
  },

  swipeRight: (listItem, callback) => {
    Animator.swipe(true, listItem, callback);
  },

  swipeLeft: (listItem, callback) => {
    Animator.swipe(false, listItem, callback);
  }

}

export default Animator;;
