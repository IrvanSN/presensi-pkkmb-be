module.exports = {
  generateAttendanceStatusCount: async (req, res) => {
    const { id } = req.params;

    res.send(id);
  },
};
