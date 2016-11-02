# frozen_string_literal: true

class EventsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    trigger.flows.each do |flow|
      run = Run.new(flow: flow, args: params.to_unsafe_h.to_json)
      run.save
      run.delay.execute
    end

    render plain: "#{trigger.flows.count} flow(s) have been queued."
  end

  private

  def trigger
    @trigger ||= Trigger.find_by!(name: params[:trigger_id])
  end
end
