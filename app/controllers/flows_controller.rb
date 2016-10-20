# frozen_string_literal: true

require "docker"

class FlowsController < ApplicationController
  def new
    @flow = Flow.new
    @output = []
  end

  def create
    @flow = Flow.new(flow_params)

    if @flow.save
      redirect_to flows_path, notice: t(".success")
    else
      render :new, t(".failure")
    end
  end

  def index
    @flows = Flow.all
  end

  def show
    @flow = Flow.find(params[:id])
  end

  private

  def flow_params
    params.require(:flow).permit(:body, :name)
  end
end
