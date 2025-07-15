// GLOBAL VARIABLE
const canvas = document.querySelector('canvas'),
toolBtns = document.querySelectorAll('.tool'),
fillColor = document.querySelector('#fill-color'),
sizeSlider = document.querySelector('#size-slider'),
colorBtn = document.querySelectorAll('.colors .option'),
colorPicker = document.querySelector('#color-picker'),
clearCanvas = document.querySelector('.clear-canvas'),
saveBtn = document.querySelector('.save-img')

// VARIABLE
let ctx = canvas.getContext('2d'),
isDrawing = false,
brushWidth = 5,
selectedTool = 'brush',
selectedColor = '#000',
prevMouseX,
prevMouseY,
snapshot


// SET CANVAS BACKGROUND
const setCancasBackground = () => {
  ctx.fillStyle ='#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = selectedColor
}

// CANVAS WIDTH AND HIEGHT
window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  setCancasBackground()
})

// START DRAWING
const startDraw = e => {
  isDrawing = true
  prevMouseX = e.offsetX
  prevMouseY = e.offsetY
  ctx.beginPath()
  ctx.lineWidth = brushWidth
  ctx.strokeStyle = selectedColor
  ctx.fillStyle = selectedColor
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

// DRAW RENGTANGLE
const drawRengtengle = e => {
  fillColor.checked
  ? ctx.fillRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY)
  : ctx.strokeRect(prevMouseX, prevMouseY, e.offsetX - prevMouseX, e.offsetY - prevMouseY)
}

//Draw Circle
const drawCircle = e => {
  ctx.beginPath()
  const radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) +
    Math.pow(prevMouseY - e.offsetY, 2)
  )
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
  fillColor.checked ? ctx.fill(): ctx.stroke()

}

// DRAW TRIANGLE
const drawTriangle = e => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
  fillColor.checked ? ctx.fill(): ctx.stroke()
  ctx.closePath()
  ctx.stroke();
}




// DRAWING
const drawing = e => {
  if(!isDrawing) return
  ctx.putImageData(snapshot, 0, 0)
  switch (selectedTool) {
    case 'brush':
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    break
    case 'rectangle':
    drawRengtengle(e)
    break
    case 'circle':
    drawCircle(e)
    break
    case 'triangle':
    drawTriangle(e)
    break
    case 'eraser':
    ctx.strokeStyle ='#fff'
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    break
  }


}

toolBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active');
    btn.classList.add('active')
    selectedTool = btn.id
    console.log(btn.id);
  })
})
// SIZE SLIDER
sizeSlider.addEventListener('change', () => {
  brushWidth = sizeSlider.value
})


// CHANGE COLOR
colorBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .selected').classList.remove('selected');
    btn.classList.add('selected')
    const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
    selectedColor = bgColor
    console.log(bgColor);

  })
})

// SAVE IMG
saveBtn.addEventListener('click', () => {
  const link = document.createElement('a')
	link.download = `Azizbek-paint${Date.now()}.jpg`
	link.href = canvas.toDataURL()
	link.click()
  setCancasBackground()
})

// COLOR PICKER
colorPicker.addEventListener('change', () => {
  colorPicker.parentElement.style.background = colorPicker.value
  colorPicker.parentElement.click()
})


// CLEAR BTN
clearCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

//  STOP DRAWING
const stopDraw = () => {
  isDrawing = false
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)
