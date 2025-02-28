Rails.application.routes.draw do
  root 'home#index'
  get 'events', to: 'home#events'
end