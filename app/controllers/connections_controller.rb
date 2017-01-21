class ConnectionsController < ApplicationController
  def create
    conn = Connection.new(connection_params)

    if conn.save
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
