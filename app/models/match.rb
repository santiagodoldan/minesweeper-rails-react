class Match

  # mimic AR Model.all method
  def self.all
    [Match.new.fake]
  end

  # mimic AR Model.find method
  def self.find(id)
    Match.new.fake
  end

  def fake
    {
      height: 10,
      width: 10,
      mines: ["1:2", "4:6", "7:3"],
      flags: ["1:2"]
    }
  end

end
