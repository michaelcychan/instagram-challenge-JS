const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Memestagram", session: req.session });
  },
};

module.exports = HomeController;