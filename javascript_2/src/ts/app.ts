// Defines a new type in typescript so we can type check our key:values in our config object
interface ConfigObject {
  minRadius: number|undefined
  maxRadius: number|undefined
  growthFactor: number|undefined
  growthRate: number|undefined
  interactionRadius: number|undefined
  minVelocity: number|undefined
  maxVelocity: number|undefined
  density: number|undefined
  colors: Array<string>|undefined
  stroke: boolean|undefined
  strokeWidth: number|undefined
  strokeColor: string|undefined
  shape: string|undefined
}

// Config variables, change these to play with canvas
let config: ConfigObject = {
  minRadius: 1, // Smallest radius drawn on canvas
  maxRadius: 5, // Largest raduis drawn on canvas
  growthFactor: 5, // A multiplier determinig the size each shape grows within the interaction radius
  growthRate: 2, // The rate each shape grows within the interaction radius
  interactionRadius: 50, // The radius around your mouse which triggers interaction
  minVelocity: 0, // Minimum movement speed for each shape in either x or y direction
  maxVelocity: 1, // Maximum movement speed for each shape in either x or y direction
  density: 800, // The amount of shapes drawn to canvas
  // Each shape drawn to canvas gets assigned a random color from this array
  colors: [
    '#02bacf',
    '#fb9100',
    '#dcc9a9',
    '#828282',
    '#4f545b'
  ],
  stroke: false, // Toggle stroke effect on of off (false means off)
  strokeWidth: 2, // The width of the stroke
  strokeColor: '#fffdfa', // The color of the stroke
  shape: 'circle' // Defines what shape to draw on canvas (options: circle, square). Defaults to circle on any other input
}

// Each index of this array holds a new instance of Shape
let shapesArray: Array<any> = []

// Object for storing x and y mouse coordinates whitin the browser window
let mousePosition = {
  x: undefined,
  y: undefined
}

// Setup canvas element and define its size
const canvas: HTMLCanvasElement = document.querySelector('.canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Define rendering context for out canvas to 2D
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

// Reinitiate and adjust canvas size when browser window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
})

// Keep track os mouse position and stores x and y coordinates in mousePosition object
window.addEventListener('mousemove', (event) => {
  mousePosition.x = event.x
  mousePosition.y = event.y
})

// Shape constructor used to generate unike shapes based on the config object
const Shape = function (x, y, xv, yv, radius, colors) {
  this.radius = radius // The radius of this shape
  this.minRadius = radius // The radius which this shape shrinks back to after interaction
  this.maxRadius = radius // The radius which this shape grows to on interaction
  this.x = x // The initial x coordinate this shape gets drawn on
  this.y = y // The initial y coordinate this shape gets drawn on
  this.xv = xv // This shapes velocity along the x axis
  this.yv = yv // This shapes velocity along the y axis
  this.color = colors[Math.floor(Math.random() * colors.length)] // Picks a random color from the colors array

  this.draw = () => {
    ctx.beginPath()
    // Determine what shape to draw on canvas
    if (config.shape === 'square') {
      ctx.rect(this.x, this.y, this.radius * 2, this.radius * 2)
    } else {
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    }
    // Checks config object whether stroke is true or false
    if (config.stroke) {
      ctx.lineWidth = config.strokeWidth
      ctx.strokeStyle = config.strokeColor
      ctx.stroke()
    }
    ctx.fillStyle = this.color
    ctx.fill()
  }

  this.update = () => {
    // Changes this shapes direction when it hits the right or left edge of the browser window
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.xv = -this.xv
    }

    // Changes this shapes direction when it hits the top or bottom edge of the browser window
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.yv = -this.yv
    }

    // As long as this shape is within the browser window continue moving in same direction
    this.x += this.xv
    this.y += this.yv

    // Adds interactivity around mouse position
    if (mousePosition.x - this.x < config.interactionRadius 
      && mousePosition.x - this.x > -config.interactionRadius 
      && mousePosition.y - this.y < config.interactionRadius 
      && mousePosition.y - this.y > -config.interactionRadius) {
        if (this.radius < this.minRadius * config.growthFactor) {
          this.radius += config.growthRate
        }
    } else if (this.radius > this.minRadius) {
        this.radius -= config.growthRate
    }
  
    this.draw()
  }
}

// Initiate the canvas by instanciating shapes and pushing them to shapesArray
const init = function () {
  shapesArray = []
  for (let i: number = 0; i < config.density; i++) {
    // This function returns either 1 or -1, used to set the initial direction of each shape
    const direction = () => Math.round(Math.random()) * 2 - 1

    let radius: number = Math.round(Math.random() * (config.maxRadius - config.minRadius) + config.minRadius)
    let x: number = Math.random() * (innerWidth - radius * 2) + radius
    let y: number = Math.random() * (innerHeight - radius * 2) + radius
    let xv: number = (Math.random() * (config.maxVelocity - config.minVelocity) + config.minVelocity) * direction()
    let yv: number = (Math.random() * (config.maxVelocity - config.minVelocity) + config.minVelocity) * direction()

    shapesArray.push(new Shape(x, y, xv, yv, radius, config.colors))
  }
}

// Request animation frame and draw/update shapes from shapesArray
const animate = function () {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  for (let i: number = 0; i < shapesArray.length; i++) {
    shapesArray[i].update()
  }
}

// Initial init and animate calls
init()
animate()






let minRadiusSlider = (document.getElementById("minRadiusSlider") as HTMLInputElement)
let minRadiusValue = (document.getElementById("minRadiusValue") as HTMLInputElement)
minRadiusValue.innerHTML = minRadiusSlider.value
minRadiusSlider.oninput = () => {
  minRadiusValue.innerHTML = minRadiusSlider.value
  config.minRadius = parseInt(minRadiusSlider.value)
  init()
}

let maxRadiusSlider = (document.getElementById("maxRadiusSlider") as HTMLInputElement)
let maxRadiusValue = (document.getElementById("maxRadiusValue") as HTMLInputElement)
maxRadiusValue.innerHTML = maxRadiusSlider.value
maxRadiusSlider.oninput = () => {
  maxRadiusValue.innerHTML = maxRadiusSlider.value
  config.maxRadius = parseInt(maxRadiusSlider.value)
  init()
}

let growthFactorSlider = (document.getElementById("growthFactorSlider") as HTMLInputElement)
let growthFactorValue = (document.getElementById("growthFactorValue") as HTMLInputElement)
growthFactorValue.innerHTML = growthFactorSlider.value
growthFactorSlider.oninput = () => {
  growthFactorValue.innerHTML = growthFactorSlider.value
  config.growthFactor = parseInt(growthFactorSlider.value)
  init()
}

let growthRateSlider = (document.getElementById("growthRateSlider") as HTMLInputElement)
let growthRateValue = (document.getElementById("growthRateValue") as HTMLInputElement)
growthRateValue.innerHTML = growthRateSlider.value
growthRateSlider.oninput = () => {
  growthRateValue.innerHTML = growthRateSlider.value
  config.growthRate = parseInt(growthRateSlider.value)
  init()
}