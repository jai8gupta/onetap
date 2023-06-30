"use client"
import React from "react";
import Matter, {Events} from "matter-js";
import { Obstacle } from "./Obstacle.js";
// Radhe Krishna

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didCollide: null,
      timer: 0,
    };
    this.divRef = React.createRef()
    this.gravitySpeed = props.gravitySpeed
    this.player = null
    this.floor = null
    this.myInterval = null
    this.fps = props.fps || 5
    this.gameSpeed = 1

  }
  
  componentDidMount() {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

    const engine = Engine.create({});

    //gravity can change if required
    engine.gravity.y = this.gravitySpeed
    
    const render = Render.create({
      element: this.divRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "white",
      }
    });

    
    this.player = Bodies.circle(210, 100, 30,{
      render: {
        fillStyle: "red"
      },
      label: "player"
    });

    this.floor = Bodies.rectangle(0,window.innerHeight-100, window.innerWidth*2, 50, {
      isStatic: true,
      render: {
        fillStyle: "green"
      },
      label: "floor"
    })
    
    World.add(engine.world, [this.floor, this.player]);
    
    let MoveObstacle = setInterval(()=>{
      let option = Math.round(Math.random()*(2-1)+1)
      let randomColor = Math.floor(Math.random()*16777215).toString(16);
      randomColor = "#"+randomColor
      if (option === 1) {
        let obs = Obstacle(-100,window.innerHeight, World, engine, this.player, true, randomColor)
        World.add(engine.world, obs)
      }
      else if (option === 2) {
        let obs = Obstacle(-200,300, World, engine, this.player, false, randomColor)
        World.add(engine.world, obs)
      }
      
    }, 1000)
    
    
    let timer = setInterval(()=>{
      this.setState({timer: this.state.timer += 1})
    }, 1000)

    //Collision Logic 
    let collision = null
    const HittingFloor = setInterval(()=>{
      collision = Matter.Collision.collides(this.player, this.floor)
      if (collision) {
        if (collision.collided) {
          engine.world.bodies.forEach((key)=>{
            key.isStatic = true
          })
          this.setState({didCollide: true}) 
          clearInterval(HittingFloor)
          clearInterval(MoveObstacle)
          clearInterval(timer)
        }
      }
      if (this.player.isStatic === true) {
        this.setState({didCollide: true})
        clearInterval(HittingFloor)
        clearInterval(MoveObstacle)
        clearInterval(timer)
      }
      
    },this.fps)

    // Keyboard Listener
    window.addEventListener("keydown",(e) => {
      
      if(e.code === "Space"){
        this.player.force.y = -0.05
        
      }
    })
    window.addEventListener("click",(e) => {
        this.player.force.y = -0.05
    })

    // Run and render, keeps on updating
    Matter.Runner.run(engine);
    Render.run(render);
  }
  

  render() {
    return (
      <>
      <div className="text-xl border border-purple-400 bg-purple-200 -z-10">
        Seconds Survived = {this.state.timer}
        <span className="ml-[20rem]">
          Press SpaceBar or left Mouse Button to play
        </span>
        <span className="ml-[29rem] text-sm">Built By: Jai Gupta</span>
      </div>
      {this.state.didCollide === true ? (
        <div onClick={()=>{
            window.location.reload()          
        }} className={`h-8 w-36 pl-5 text-xl border border-green-500 text-white bg-green-400 absolute -z-10 rounded-r-lg`}>
          Play Again
        </div> 
       ) :  null
      }  
      <div className="-z-30 relative" ref={this.divRef}></div>
      </>
    )
    
  }
}
export default Scene;