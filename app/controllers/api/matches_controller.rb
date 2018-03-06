class Api::MatchesController < Api::ApplicationController
  respond_to :json

  # GET /api/matches
  def index
    @matches = Match.all

    respond_with @matches
  end

  # GET /api/matches/:id
  def show
    @match = Match.find(params[:id])

    respond_with @match
  end
end
