# frozen_string_literal: true

Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :feeds, only: [:index, :new, :create, :edit, :update]

  # User path
  resources :users, only: [:new, :create, :show], param: :username
  resource :user, only: [:edit, :update], as: :profile

  resources :connections, only: [:create]
  resources :subscriptions, only: [:create]

  resources :defaults, only: [:create]

  # Block paths
  get "/blocks/new", to: "blocks#new", as: :new_block
  post "/blocks", to: "blocks#create"
  get "/blocks/:username", to: "blocks#index", as: :user_blocks
  get "/blocks/:username/:blockname", to: "blocks#show", as: :block
  get "/blocks/:username/:blockname/edit", to: "blocks#edit", as: :edit_block
  patch "/blocks/:username/:blockname", to: "blocks#update", as: :update_block
  post "/blocks/:username/:blockname/runs", to: "block_runs#create", as: :block_runs

  # Event paths
  post "/events/:feed_id", to: "events#create", as: :events

  get "/explore", to: "explore#index", as: :explore
  root to: "welcome#index"
end
