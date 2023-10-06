import React, {useState} from 'react';
import './App.css';


type CardType = {
    id: number
    order: number
    text: string
}
type CardListType = CardType[]
export const App = () => {
    const [cardList, setCardList] = useState<CardListType>([
        {id: 1, order: 1, text: 'Card 1'},
        {id: 2, order: 2, text: 'Card 2'},
        {id: 3, order: 3, text: 'Card 3'},
        {id: 4, order: 4, text: 'Card 4'},
    ])

    const [currentCard, setCurrentCard] = useState<CardType>()
    const dragStartHandler = (e: any, card: CardType) => {
        console.log('drag', card)
        setCurrentCard(card)
    }
    const dragEndHandler = (e: any) => {
        e.target.style.background = 'white'
    }
    const dragOverHandler = (e: any) => {
        e.preventDefault()
        e.target.style.background = 'lightgray'

    }
    const dropHandler = (e: any, card: CardType) => {
        e.preventDefault()
        currentCard && setCardList(cardList.map(c => {
            if (c.id === card.id) {
                return {...c, order: currentCard.order}
            }
            if (c.id === currentCard.id) {
                return {...c, order: card.order}
            }
            return c
        }))
        e.target.style.background = 'white'
        console.log('drop', card)
    }

    const sortCards = (a: CardType, b: CardType) => {
        return a.order > b.order ? 1 : -1
    }

    return (
        <div className={'app'}>
            {cardList.sort(sortCards).map(card =>
                <div
                    key={card.id}
                    draggable={true}
                    onDragStart={(e) => dragStartHandler(e, card)}
                    onDragLeave={(e) => dragEndHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, card)}
                    className={'card'}>
                    {card.text}
                </div>
            )}
        </div>
    );
}

