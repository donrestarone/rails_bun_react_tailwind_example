class MutationsController < ApplicationController
  def create
    render json: { status: 'OK', code: 200, data: {**params.to_enum.to_h} }
  end
end
