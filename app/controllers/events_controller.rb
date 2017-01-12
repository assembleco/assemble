# frozen_string_literal: true

class EventsController < ApplicationController
  include ActionView::Helpers::TextHelper

  skip_before_action :verify_authenticity_token, only: :create
  skip_before_action :require_login, only: [:create], raise: false

  def create
    feed.connections.each do |connection|
      block_run = BlockRun.create!(block: connection.destination, input: event_data)
      block_run.delay.execute
    end

    num_blocks = pluralize(feed.connections.count, "block")
    num_apps = pluralize(feed.connections.pluck(:app_id).uniq.count, "app")
    notice = t(".success", num_blocks: num_blocks, num_apps: num_apps)

    respond_to do |format|
      format.html { redirect_to :back, notice: notice }
      format.text { render plain: notice }
    end
  end

  private

  def event_data
    if params[:event].is_a?(String)
      params[:event]
    else
      params[:event].to_json
    end
  end

  def feed
    @feed ||= Feed.find_by!(name: params[:feed_id])
  end
end
