# frozen_string_literal: true

class EventsController < ApplicationController
  include ActionView::Helpers::TextHelper

  skip_before_action :verify_authenticity_token, only: :create
  skip_before_action :require_login, only: [:create], raise: false

  def create
    input_data = params.require(:event).to_unsafe_h.to_json

    trigger.connections.each do |connection|
      run = Run.new(block: connection.destination, args: input_data)
      run.save
      run.delay.execute
    end

    num_blocks = pluralize(trigger.connections.count, "block")
    num_apps = pluralize(trigger.connections.pluck(:app_id).uniq.count, "app")
    notice = t(".success", num_blocks: num_blocks, num_apps: num_apps)

    respond_to do |format|
      format.html { redirect_to :back, notice: notice }
      format.text { render plain: notice }
    end
  end

  private

  def trigger
    @trigger ||= Trigger.find_by!(name: params[:trigger_id])
  end
end
