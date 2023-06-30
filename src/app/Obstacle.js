import React from 'react'
import Matter from 'matter-js'


export const Obstacle = (posX,posY, World, engine, player, obstacleTop = true, color = "blue") => {
  if (obstacleTop) {
    let ObstacleTop = Matter.Bodies.rectangle(window.innerWidth - posX, window.innerHeight - posY, 50, 500, {
      render: {
        fillStyle: color
      },
      label: "ObstacleTop",
    })

  let interval = setInterval(()=>{
    ObstacleTop.position.x -= 0.03
    ObstacleTop.position.y = 0
    
    let collision  = Matter.Collision.collides(player, ObstacleTop)
    if (collision) {
      if (collision.collided) {
        engine.world.bodies.forEach((key)=>{
          key.isStatic = true
        })
        clearInterval(interval)
      }
    }

    if (ObstacleTop.position.x === 0) {
      World.remove(engine.world, ObstacleTop)
      clearInterval(interval)
    }
  }, 1.6)
  return ObstacleTop;
    
  }
  else if(obstacleTop === false){
    let ObstacleTop = Matter.Bodies.rectangle(window.innerWidth - posX, window.innerHeight - posY, 75, 100, {
      render: {
        fillStyle: color
      },
      label: "ObstacleBottom",
    })

  let interval = setInterval(()=>{
    ObstacleTop.position.x -= 0.03
    ObstacleTop.position.y = window.innerHeight - posY
    
    let collision  = Matter.Collision.collides(player, ObstacleTop)
    if (collision) {
      if (collision.collided) {
        engine.world.bodies.forEach((key)=>{
          key.isStatic = true
        })
        clearInterval(interval)
      }
    }

    if (ObstacleTop.position.x === 0) {
      World.remove(engine.world, ObstacleTop)
      clearInterval(interval)
    }
  }, 1.6)

  return ObstacleTop;
  
  }
}
