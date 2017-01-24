class ConnectionsController < ApplicationController
  def create
    app = App.find(connection_params[:app_id])
    source = connection_params[:source_type].classify.constantize.find(connection_params[:source_id])
    destination = connection_params[:destination_type].classify.constantize.find(connection_params[:destination_id])

    if app.connect(source, destination)
      render plain: "success", notice: "Added the block to the app"
    else
      render plain: "failure", error: "Could not add the block", status: 422
    end
  end

  private

  def connection_params
    params.require(:connection).permit(
      :app_id,
      :source_id,
      :source_type,
      :destination_id,
      :destination_type,
    )
  end
end
