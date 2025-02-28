class HomeController < ApplicationController
  include ActionController::Live

  def index
  end

  def events
    response.headers['Content-Type'] = 'text/event-stream'
    response.headers['Cache-Control'] = 'no-cache'
    response.headers['Connection'] = 'keep-alive'
    
    # Stream numbers 1-10 with a 300ms delay between each
    (1..10).each do |number|
      response.stream.write("data: #{number}\n\n")
      sleep(0.3)
    end
    
    # Send the "Complete!" message
    response.stream.write("data: Complete!\n\n")
  ensure
    response.stream.close
  end
end