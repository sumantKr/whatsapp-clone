import styled from 'styled-components'
import { Circle, ThreeBounce, CubeGrid, ChasingDots, Pulse, WanderingCubes } from 'better-react-spinkit'
import { useEffect } from 'react'
export default function Loading() {
  
    return (
        <LoadingScreen>
            <div>
                <ThreeBounce color="#efd48b" size={30} />
                {
                }
                </div>
        </LoadingScreen>
    )
}

const LoadingScreen = styled.section`
    height:100vh;
    width:100vw;
    z-index:1;
    display:flex;
    justify-content:center;
    align-items:center;
    /* background-color:#234211; */
    background-color:${({theme})=>theme.primaryColor};
 

`