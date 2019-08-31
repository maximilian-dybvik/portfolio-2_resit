document.addEventListener('DOMContentLoaded', function (event) {
  const canvas: HTMLCanvasElement = document.querySelector('.canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

  let mousePosition = {
    x: undefined,
    y: undefined
  }

  window.addEventListener('mousemove', (event) => {
    mousePosition.x = event.x
    mousePosition.y = event.y
  })

  let minRadius: number = 3 // Determines the size of the shapes
  let maxRadius: number = 15 // Determines the size of the shapes
  let growthFactor: number = 5
  let interactionRadius: number = 60
  let velocity: number = 3 // Determines the movement speed of the shapes
  let randomizationRange: number = 3 // Range of randomization to velocity, adds a random number between negative and positive randonizationRange to velocity
  let density: number = 300 // Determines the number of shapes drawn to canvas
  let colors: Array<string> = [
    '#02bacf',
    '#fb9100',
    '#dcc9a9',
    '#828282',
    '#4f545b'
  ]

  const Shape = function (x, y, xv, yv, radius, colors) {
    this.radius = radius
    this.minRadius = radius
    this.maxRadius = radius
    this.x = x
    this.y = y
    this.xv = xv
    this.yv = yv
    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.draw = () => {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.lineWidth = 5
      ctx.strokeStyle = 'white'
      ctx.stroke()
      ctx.fillStyle = this.color
      ctx.fill()
    }

    this.update = () => {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.xv = -this.xv
      }
  
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.yv = -this.yv
      }
  
      this.x += this.xv
      this.y += this.yv

    if (mousePosition.x - this.x < interactionRadius 
      && mousePosition.x - this.x > -interactionRadius 
      && mousePosition.y - this.y < interactionRadius 
      && mousePosition.y - this.y > -interactionRadius) {
        if (this.radius < this.minRadius * growthFactor) {
          this.radius += 1
        }
    } else if (this.radius > this.minRadius) {
        this.radius -= 1
    }
    
     this.draw()
    }
  }

  let shapesArray: Array<any> = []

  for (let i: number = 0; i < density; i++) {
    let radius: number = Math.random() * (maxRadius - minRadius) + minRadius
    // Determines the initial direction of movement for the x and y axis by returning either -1 or 1
    const direction = () => Math.round(Math.random()) * 2 - 1
    // Determines initial draw position for the x and y axis
    let x: number = Math.random() * (innerWidth - radius * 2) + radius
    let y: number = Math.random() * (innerHeight - radius * 2) + radius
    // Determines the movement speed based on velocity and randomization range
    let xv: number = (velocity - Math.random() * randomizationRange) * direction()
    let yv: number = (velocity - Math.random() * randomizationRange) * direction()
    
    shapesArray.push(new Shape(x, y, xv, yv, radius, colors))
  }

  const animate = function () {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i: number = 0; i < shapesArray.length; i++) {
      shapesArray[i].update()
    }
  }

  animate()
}, false)


