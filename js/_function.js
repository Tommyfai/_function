$(function() {
  $(this).mousedown(function(e) {
    if (e.ctrlKey) {
      if (e.which == 3) {
        window.location.reload()
      }
    }
  })
})
