const HomeController = {
  Index: (req, res) => {
    res.render("home/index", { title: "Memestagram" });
  },
};

module.exports = HomeController;