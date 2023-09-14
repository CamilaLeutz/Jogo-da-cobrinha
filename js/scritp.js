const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const audio = new Audio("../assets/assets_audio.mp3") //audio sendo chamado
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

const chackEat = () => {
    const head = snake[snake.length - 1]
    if( head.x == food.x && head.y == food.y) { // se a position x da cabeça for igual a x da comida, e a da cabeça no y for igual da comida na positon y 
        snake.push(head) // aqui a comida vai fazer parte agora da cobrinha, com as mesmas proporções da cabeça
        audio.play() // audio sendo chamado quando a cobrinha come a food 
        let x = randomPosition() // variavel x sendo guardada dentro da randomPosition(posição aleatoria)
        let y = randomPosition()// variavel y sendo guardada dentro da randomPosition(posição aleatoria)

        while(snake.find((position) => position.x == x && position.y == y )) { //quando a position x e a y estiverem sendo ocupadas pela cobrinha, vai ser gerado novamente uma outr position pra food
            x = randomPosition() // outra position sendo gerada
            y = randomPosition()// outra position sendo gerada
        }
        food.x = x //novos valores das variaveis 
        food.y = y
        food.color = randomColor()
    }
}

const chackCollision = () => { //função de colisão
    const head = snake[snake.length - 1] // cabeça da cobra
    const canvasLimit = canvas.width - size

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    if( wallCollision){
        alert("Você perdeu!")
    }
}
const gameLoop = () => { //função de rodar o jogo
    clearInterval(loopId) // função de limpar o loodId que é a que guarda o id do loop
    ctx.clearRect(0, 0, 600, 600) // posições do ...........................
    drawGrid() // chamando a função de desenhar a linha
    drawFood() // chamando a função de desenhar a comida
    moveSnake() //chamando a função de mover a cobra
    drawSnake() // chamando a função de criar a cobra
    chackEat() // chamando a função de juntar a comida na head cabeça
    chackCollision()
    setTimeout(() => { 
        gameLoop()
    }, 300)

}
gameLoop()

document.addEventListener("keydown", ({ key }) => { // função de pegar as teclas corretas do teclado

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
