class DefaultsController < ApplicationController
  def create
    app = App.find(params[:app_id])

    if app.setup_default_value(params[:slug], params.require(:defaults))
      redirect_to :back, notice: "Saved default values"
    end
  end
end
