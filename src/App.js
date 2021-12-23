import './App.css'
import {useEffect, useState} from "react";
import CardComponent from './components/CardComponent'

const cardsCollection = [
    {"src": "/img/hacker.png"},
    {"src": "/img/artificial-intelligence.png"},
    {"src": "/img/videogame.png"},
    {"src": "/img/radiation.png"},
    {"src": "/img/motorbike.png"},
    {"src": "/img/brain.png"},
    {"src": "/img/headphones.png"},
    {"src": "/img/hand.png"},
    {"src": "/img/security.png"},
    {"src": "/img/robot.png"},
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [firstSelection, setFirstSelection] = useState(null)
    const [secondSelection, setSecondSelection] = useState(null)
    const [disabled, setDisabled] = useState(false)

    // Card randomization pattern
    const randomizeCards = () => {
        const randomizeCards = [...cardsCollection, ...cardsCollection]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({
                ...card, id: Math.random()
            }))
        setCards(randomizeCards)
        setTurns(0)
    }

    // handle the user selections
    const handleSelection = (card) => {
        firstSelection ? setSecondSelection(card) : setFirstSelection(card)
    }

    useEffect(() => {
        if (firstSelection && secondSelection) {
            setDisabled(true)
            if (firstSelection.src === secondSelection.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === firstSelection.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 950)
            }
        }
    }, [firstSelection, secondSelection])

    // reset choices and increase turns
    const resetTurn = () => {
        setFirstSelection(null)
        setSecondSelection(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        randomizeCards()
    }, [])

    return (<div className="App">
            <h1>Cyber memory game</h1>
        <h6> How to play: Click on 2 cards you want to select, until you get a match.</h6>
            <button onClick={randomizeCards}>New Game</button>
        <p>Total Turns: {turns}</p>

            <div className="card-panel">
                {cards.map(card => (<CardComponent
                        key={card.id}
                        card={card}
                        handleSelection={handleSelection}
                        flipped={card === firstSelection || card === secondSelection || card.matched}
                        disabled={disabled}
                    />))}
            </div>
        </div>);
}

export default App
