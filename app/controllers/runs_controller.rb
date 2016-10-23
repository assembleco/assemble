# frozen_string_literal: true

class RunsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    @run = Run.new(flow: flow, args: params)

    if @run.save
      flash.now[:notice] = t(".success")
      render plain: @run.output
    end
  end

  private

  def flow
    @flow ||= Flow.find(params[:flow_id])
  end
end
