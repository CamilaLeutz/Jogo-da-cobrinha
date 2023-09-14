const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30 //tamanho padrão dos quadrados da cobrinha

const snake = [ // array com os comandos das posições da cobrinha
    { x: 270, y: 240 }
]
randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

randomPosition = () => {
    const number = randomNumber(0, canvas.width - size) // gerando sempre no tamanho do canvas.width
    return Math.round(number / 30) * 30 // aqui o round esta arredondando o number e o number que esta dando esta sendo dividido por 30, e desfazendo a divisão multiplicado por 30 então dando numeros multiplos de 30
}

const randomColor = () => { // criando cores aleatorias
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food ={ // a comida vai carregar sua posição e a sua cor
    x: randomPosition(), // gerando position aleatoria
    y:randomPosition(),
    color: randomColor() // gerando cor aleatoria
}

let direction, loopId

const drawFood = () => {

const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = food.color
    ctx.fillRect( x, y, size, size)
    ctx.shadowBlur = 0

}

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

    if (!direction) return

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

const drawGrid = () => {
    ctx.lineWidth = 1 // largura da linha a ser desenhada
    ctx.strokeStyle = "#191919" //cor da linha 

    for (let i = 30; i < canvas.width; i += 30) { // aqui minha variavel let é igual ao valor que eu quero a distancia da linha, sendo assim, a cada 30 coordenadas, uma nova linha
        ctx.beginPath() // inicia sempre do começo, sem que as linhas se cruzes
        ctx.lineTo(i, 0) // começa no valor da variavel i
        ctx.lineTo(i, 600)
        ctx.stroke() // chamando a linha

        ctx.beginPath() // inicia sempre do começo, sem que as linhas se cruzes
        ctx.lineTo(0, i) // começa no valor da variavel i que agora aqui ele é a posição y
        ctx.lineTo(600, i) // aqui agora ele esta no posição y
        ctx.stroke() // chamando a linha
    }

}



const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid() // chamando a função de desenhar a linha
    drawFood() // chamando a função de desenhar a comida
    moveSnake() //chamando a função de mover a cobra
    drawSnake() // chamando a função de criar a cobra

    setTimeout(() => {
        gameLoop()
    }, 300)

}
gameLoop()

document.addEventListener("keydown", ({ key }) => {

    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})
