const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30 //tamanho padrão dos quadrados da cobrinha

const snake = [ // array com os comandos das posições da cobrinha
    { x: 200, y: 200 },
    { x: 230, y: 200 }

]

let direction = ""

const drawSnake = () => { // função responsável por desenhar a cobrinha
    ctx.fillStyle = "#ddd" // cor da cobrinha

    snake.forEach((position, index) => { // arrary que esta sendo percorrido, com as posições e vai mudando
        if (index == snake.length - 1) { // quando chegar no ultimo array a cor vai mudar pra branco pra identificar a cabeça da cobrinha
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })

}

const moveSnake = () => { // função mover a cobrinha

   if(!direction) return
   
    const head = snake[snake.length - 1] 

    if (direction == "right") { //aqui caso ele esteja indo pra direita
        snake.push({ x: head.x + size, y: head.y }) //vamos adc um novo elemento no array e dar a ele uma nova posição
    }
    if (direction == "left") { //aqui caso ele esteja indo pra esquerda
        snake.push({ x: head.x - size, y: head.y }) //vamos adc um novo elemento no array e dar a ele uma nova posição
    }
    if (direction == "down") { //aqui caso ele esteja indo pra baixo
        snake.push({ x: head.x, y: head.y + size }) //vamos adc um novo elemento no array e dar a ele uma nova posição
    }
    if (direction == "up") { //aqui caso ele esteja indo pra cima
        snake.push({ x: head.x, y: head.y - size }) //vamos adc um novo elemento no array e dar a ele uma nova posição
    }
    snake.shift() //aqui estamos removendo o ultimo  elemento do array
}


setInterval(() => {

    ctx.clearRect(0, 0, 600, 600)

    moveSnake()
    drawSnake()
    
}, 300)


