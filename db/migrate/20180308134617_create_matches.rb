class CreateMatches < ActiveRecord::Migration[5.1]
  def change
    create_table :matches do |t|
      t.string :name
      t.integer :rows
      t.integer :columns
      t.string :mines, array: true, default: []
    end
  end
end
