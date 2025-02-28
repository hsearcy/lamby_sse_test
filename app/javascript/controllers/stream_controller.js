import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.outputElement = document.getElementById('output')
    this.buttonElement = document.getElementById('test-button')
  }

  initialize() {
    this.eventSource = null
  }

  disconnect() {
    this.closeEventSource()
  }

  closeEventSource() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }

  startStream() {
    // Clear previous output
    this.outputElement.innerHTML = ''
    
    // Hide the button during streaming
    this.buttonElement.style.display = 'none'
    
    // Create a new EventSource connection
    this.eventSource = new EventSource('/events')
    
    // Handle incoming messages
    this.eventSource.onmessage = (event) => {
      // Append the new data to the output
      this.outputElement.innerHTML += event.data + '<br>'
      
      // If we receive the "Complete!" message, close the connection and show the button again
      if (event.data === 'Complete!') {
        this.closeEventSource()
        this.buttonElement.style.display = 'block'
      }
    }
    
    // Handle errors
    this.eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      this.outputElement.innerHTML += 'Connection error<br>'
      this.closeEventSource()
      this.buttonElement.style.display = 'block'
    }
  }
}