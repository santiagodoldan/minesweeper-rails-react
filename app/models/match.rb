class Match < ApplicationRecord

  serialize :mines, Array

  def self.create_and_generate_mines(attrs = {})
    attrs.tap do |result|
      rows    = result[:rows] || 10
      columns = result[:columns] || 10

      result[:rows]    = rows
      result[:columns] = columns
      result[:mines]   = []

      while (result[:mines].size < ((rows*columns)/5)) do
        pos = "#{rand(0..(rows-1))}:#{rand(0..(columns-1))}"

        result[:mines] << pos unless result[:mines].include?(pos)
      end
    end

    self.create(attrs)
  end

end
