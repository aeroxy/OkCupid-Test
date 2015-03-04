$('#right_side_bar').remove();
$('#leaderboard_container').remove();
$('#skyscraper_floater_region').remove();
$('.okad').remove();

function insertImg() {
  if ($('#quickmatch_browser').length !=0) {
    $('.monolith').children('img').remove();
    $('#quickmatch_browser ul.items li.item img').each(function(){
      $(this).clone().insertAfter($('#quickmatch_header')).css('width','740px');
    });
  }
}
function checkImg() {
  setTimeout(function(){
    var src = $('.monolith').attr('src');
    var newSrc = $('.monolith img:first-of-type').attr('src');
    if (src != newSrc) {
      window.scrollTo(0,0);
      insertImg();
    } else {
      checkImg();
    }
  },250);
}
function replaceUrl(object) {
  var url = object.attr('href');
  var newUrl = '/photos?cf=profile#0';
  url = url.replace('?cf=regular', newUrl);
  url = url.replace('?cf=visitors', newUrl);
  url = url.replace('?cf=who-you-like', newUrl);
  url = url.replace('?cf=leftbar_match&leftbar_match=1', newUrl);
  url = url.replace('?cf=home_matches', newUrl);
  object.attr('href', url);
}
$('#quickmatch-dislike,#quickmatch-like').click(function(){
  var src = $('.monolith img:first-of-type').attr('src');
  $('.monolith').attr('src',src);
  checkImg();
});

$(window).keypress(function(e){
  if (!$('input').is(':focus')&&!$('textarea').is(':focus')) {
    if (e.keyCode == 108) {
      $('.match_card_wrapper:hover button').click();
      $('.user_row_item:hover .binary_rating_button.flatbutton.silver.icon_only').click();
      $('#rate_user_profile').click();
      if ($('#quickmatch-like').length != 0) {
        $('#quickmatch-like').click();
      }
    }
    if (e.keyCode == 97) {
      $('.binary_rating_button.flatbutton.silver.icon_only').click();
    }
    if (e.keyCode == 115) {
      setTimeout(function(){
        $('.binary_rating_button.flatbutton.silver.icon_only.liked').click();
      },50);
    }
    if (e.keyCode == 114) {
      window.scrollTo(0,0);
      setTimeout(function(){
        location.reload();
      }, 200);
    }
    if (e.keyCode == 104) {
      if ($('.flatbutton.black.message').length != 0 && $('.flatbutton.black.message .last_contact').length == 0 && !$('textarea[placeholder="Compose your message"]').is(':focus')) {
        var userid = $('#action_bar').attr('data-userid');
        $('body').append('<button id="sendMessageHere"></button>');
        $('#sendMessageHere').attr('onclick',"GlobalMessaging.open('" + userid + "', {trigger: 'profile heading'})");
        $('#sendMessageHere').click();
        setTimeout(function(){
          $(':focus').val(';)');
          setTimeout(function(){
            $('button[type="submit"]').click();
          }, 200);
        }, 200);
        return false;
      }
    }
    if (e.keyCode == 110) {
      if ($('li.next a').length != 0) {
        url = 'http://www.okcupid.com' + $('li.next a').attr('href');
        window.location.replace(url);
      }
    }
    if (e.keyCode == 112) {
      if ($('li.prev a').length != 0) {
        url = 'http://www.okcupid.com' + $('li.prev a').attr('href');
        window.location.replace(url);
      } else if ($('#quickmatch-dislike').length != 0) {
        $('#quickmatch-dislike').click();
      }
    }
    if (e.keyCode == 111) {
      if ($('.binary_rating_button.flatbutton.silver.icon_only.liked').length != 0) {
        $('.user_row_item.rated.you_like .link_cover a.left').each(function(){
          var url = $(this).attr('href');
          url = url.replace("?cf=who-you-like", "/photos?cf=profile");
          url = 'http://www.okcupid.com' + url;
          console.log(url);
          // window.open(url,'_blank');
        });
      }
    }
  }
});

$('.infinity .row .match_card_wrapper .match_card,.user_row_item,#section_matches .match,#matchphotobrowser .item').hover(function(){
  $(this).find('a').each(function(){
    replaceUrl($(this));
  });
});

$(function(){
  if ($('.binary_rating_button.flatbutton.silver.icon_only').length != 0) {
    if ($('#visitors_heading').length == 0 ) {
      if ($('.binary_rating_button.flatbutton.silver.icon_only').length != $('.binary_rating_button.flatbutton.silver.icon_only.liked').length || $('.binary_rating_button.flatbutton.silver.icon_only.liked').length == 0) {
        location.reload();
      } else {
        $('.user_row_item.rated.you_like .link_cover a.top').remove();
        $('.user_row_item.rated.you_like .link_cover a.right').remove();
        $('.user_row_item.rated.you_like .link_cover a.bottom').remove();
      }
    }
  }
  insertImg();
});