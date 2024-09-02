import React, { useEffect, useRef } from 'react'
import planeScene  from '../assets/3d/plane.glb'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
const Plane = ({
  isRotating,
  ...props
}) => {
    const ref=useRef();
    const {scene,animations}=useGLTF(planeScene);
    const {actions}=useAnimations(animations,ref);
    useFrame(()=>{
      if(isRotating){
        actions["Take 001"].play();
      }else{

        actions["Take 001"].stop();
      }

    })
  return (
    <mesh ref={ref} {...props}>
        <primitive object={scene} />
    </mesh>
  )
}

export default Plane