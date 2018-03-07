Rails.application.routes.draw do
  root "dashboard#index"

  namespace :api do
    resources :matches, only: [:index, :show]
  end

  get '*path', to: 'dashboard#index'
end
