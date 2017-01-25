# frozen_string_literal: true

class EventsController < ApplicationController
  include ActionView::Helpers::TextHelper

  skip_before_action :verify_authenticity_token, only: :create
  skip_before_action :require_login, only: [:create], raise: false

  def create
    if Event.create(feed: feed, data: event_data)
      notice = t(".success", feed_name: feed.name)

      respond_to do |format|
        format.html { redirect_to :back, notice: notice }
        format.text { render plain: notice }
      end
    else
      raise "failure"
    end
  end

  private

  def event_data
    if params[:event].is_a?(String)
      JSON.parse(params[:event])
    else
      params[:event]
    end
  end

  def feed
    @feed ||= Feed.find_by!(name: params[:feed_id])
  end
end
