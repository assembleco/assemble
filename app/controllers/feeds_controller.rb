# frozen_string_literal: true

class FeedsController < ApplicationController
  def index
    @feeds = Feed.all
  end

  def new
    @feed = Feed.new
  end

  def create
    @feed = Feed.new(feed_params)

    if @feed.save
      redirect_to feeds_path
    else
      render :new
    end
  end

  def edit
    @feed = Feed.find_by!(name: params[:id])
  end

  def update
    @feed = Feed.find_by!(name: params[:id])

    if @feed.update(feed_params)
      redirect_to feeds_path
    else
      render :edit
    end
  end

  private

  def feed_params
    params.require(:feed).permit(:name, :schema)
  end
end
