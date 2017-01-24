class SubscriptionsController < ApplicationController
  def create
    subscription = Subscription.new(subscription_params)

    if subscription.save
      render plain: "success", notice: "Subscribed to the feed"
    else
      render plain: "failure", error: "Could not subscribe to the feed", status: 422
    end
  end

  private

  def subscription_params
    params.require(:subscription).permit(:app_id, :feed_id)
  end
end
