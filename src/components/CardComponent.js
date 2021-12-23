import './CardComponent.css'

export default function CardComponent({card, handleSelection, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleSelection(card)
        }
    }

    return (<div className="card" key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <img
                    src={card.src}
                    className="front"
                />
                <img
                    src="/img/cover.png"
                    onClick={handleClick}
                    className="back"
                />
            </div>
        </div>)
}