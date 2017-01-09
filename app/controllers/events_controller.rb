# frozen_string_literal: true

class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create
  skip_before_action :require_login, only: [:create], raise: false

  def create
    trigger.blocks.each do |block|
      run = Run.new(block: block, args: params.to_unsafe_h.to_json)
      run.save
      run.delay.execute
    end

    render plain: "#{trigger.blocks.count} block(s) have been queued."
  end

  private

  def trigger
    @trigger ||= Trigger.find_by!(name: params[:trigger_id])
  end
end
