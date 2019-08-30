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
    console.log(event);
  })

  // let minRadius: number = 3 // Determines the size of the shapes
  // let maxRadius: number = 10 // Determines the size of the shapes
  let radius: number = 10 // Determines the size of the shapes
  let velocity: number = 3 // Determines the movement speed of the shapes
  let randomizationRange: number = 3 // Range of randomization to velocity, adds a random number between negative and positive randonizationRange to velocity
  let density: number = 100 // Determines the number of shapes drawn to canvas
  let colors: Array<string> = []

  const Shape = function (x, y, dx, dy, radius) {
    this.radius = radius
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy

    this.draw = () => {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.lineWidth = 5
      ctx.strokeStyle = 'white'
      ctx.stroke()
      ctx.fillStyle = 'black'
      ctx.fill()
    }

    this.update = () => {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
  
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy
      }
  
      this.x += this.dx
      this.y += this.dy


      // Interactivity around mouse position
      console.log(mousePosition.x);
      

      this.draw()
    }
  }

  let shapesArray: Array<any> = []

  for (let i: number = 0; i < density; i++) {
    // Determines the initial direction of movement for the x and y axis
    let xDirection: number = Math.round(Math.random()) * 2 - 1
    let yDirection: number = Math.round(Math.random()) * 2 - 1
    // Determines initial draw position for the x and y axis
    let x: number = Math.random() * (innerWidth - radius * 2) + radius
    let y: number = Math.random() * (innerHeight - radius * 2) + radius
    // Determines the movement speed based on velocity and randomization range
    let dx: number = (velocity - Math.random() * randomizationRange) * xDirection
    let dy: number = (velocity - Math.random() * randomizationRange) * yDirection
    
    shapesArray.push(new Shape(x, y, dx, dy, radius))
  }

  const animate = function () {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    for (let i: number = 0; i < shapesArray.length; i++) {
      shapesArray[i].update()
    }
  }

  console.log(shapesArray[0]);
  animate()
}, false)


