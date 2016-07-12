HomeController = {
  index: function(req, res) {
    res.render('index');
  },
  pricing: function(req, res) {
    res.render('pricing');
  },
  docs: function(req, res) {
    res.render('docs');
  }
}

module.exports = HomeController;
