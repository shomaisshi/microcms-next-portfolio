import React from 'react'
import Pico8 from 'react-pico-8'
import {
    Controls,
    Reset,
    Pause,
    Sound,
    Carts,
    Fullscreen
} from 'react-pico-8/buttons'
import 'react-pico-8/styles.css'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Redream() {
    return (
        <>
            <Header />
            <Pico8 src="/pico8_games/juicejam2.js"
                autoPlay={true}
                legacyButtons={false}
                hideCursor={false}
                center={true}
                blockKeys={true}
                usePointer={true}
                unpauseOnReset={true}
                placeholder=""
            >
                <Controls />
                <Reset />
                <Pause />
                <Sound />
                <Carts />
                <Fullscreen />
            </Pico8>
        </>
    )
}
