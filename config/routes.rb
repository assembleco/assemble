# frozen_string_literal: true

Rails.application.routes.draw do
  get "/auth/:provider/callback", to: "sessions#create"
  resource :session, only: [:new, :destroy]

  get "/about", to: "about#index", as: :about

  # Block paths
  post "/blocks", to: "blocks#create"
  get "/blocks/:handle/:blockname", to: "blocks#show", as: :block
  patch "/blocks/:handle/:blockname", to: "blocks#update", as: :update_block
  delete "/blocks/:handle/:blockname", to: "blocks#destroy"

  # Block runs
  post "/blocks/:handle/:blockname/runs", to: "block_runs#create", as: :block_runs

  root to: "blocks#index"
end
