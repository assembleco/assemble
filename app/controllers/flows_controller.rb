# frozen_string_literal: true

require "docker"

class FlowsController < ApplicationController
  def index
    @flows = Flow.all
  end

  def show
    @flow = Flow.find(params[:id])
  end

  def new
    @flow = Flow.new
  end

  def create
    @flow = Flow.new(flow_params)

    if @flow.save
      redirect_to flow_path(@flow), notice: t(".success")
    else
      render :new, t(".failure")
    end
  end

  def edit
    @flow = Flow.find(params[:id])
  end

  def update
    @flow = Flow.find(params[:id])

    if @flow.update(flow_params)
      redirect_to flow_path(@flow)
    else
      render :edit
    end
  end

  private

  def flow_params
    params.require(:flow).permit(:body, :name, :schema)
  end
end
