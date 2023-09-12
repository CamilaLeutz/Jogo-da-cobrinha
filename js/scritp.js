const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30 //tamanho padrão dos quadrados da cobrinha

const snake = [ // array com os comandos das posições da cobrinha
    { x: 200, y: 200},
    { x: 230, y: 200},
    { x: 260, y: 200},
    { x: 290, y: 200},
    { x: 290, y: 230}

]

const drawSnake = () => { // função responsável por desenhar a cobrinha
    ctx.fillStyle = "#ddd" // cor da cobrinha

    snake.forEach((position, index) => { // arrary que esta sendo percorrido, com as posições e vai mudando
        if(index == snake.length - 1){ // quando chegar no ultimo array a cor vai mudar pra branco pra identificar a cabeça da cobrinha
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })

}

drawSnake()