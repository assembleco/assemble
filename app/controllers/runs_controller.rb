# frozen_string_literal: true

class RunsController < ApplicationController
  def create
    @run = Run.new(run_params)

    if @run.save
      flash.now[:notice] = t(".success")
      render :show
    end
  end

  private

  def run_params
    params.
      require(:run).
      permit(:args).
      merge(flow: flow)
  end

  def flow
    @flow ||= Flow.find(params[:flow_id])
  end
end
