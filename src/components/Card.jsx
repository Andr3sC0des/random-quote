import { useEffect, useState } from 'react'

function Card () {
  const [quotes, setQuotes] = useState([])
  const randomNumber = Math.floor(Math.random() * (100 - 0 + 1) + 0)

  const changeColor = () => {
    const randomColor = '#' + (Math.floor(Math.random() * 16777215).toString(16))
    document.body.style.background = randomColor
    document.querySelector('.card__icon').style.color = randomColor
    document.querySelector('.card__button').style.background = randomColor
    document.querySelector('.card__author').style.color = randomColor
    document.querySelector('.card__quote').style.color = randomColor
    document.querySelectorAll('.card__socialbutton').forEach((i) => {
      i.style.background = randomColor
    })
  }

  const fetchingData = (randomNumber) => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', { cache: 'no-store' })
      .then(response => response.json())
      .then(json => {
        setQuotes(json.quotes[randomNumber])
      })
  }

  useEffect(() => {
    fetchingData(randomNumber)
    changeColor()
  }, [])

  return (
    <>
      <section className='card' id='quote-box'>
        <article className='card__details'>
          <i className='card__icon fa-sharp fa-solid fa-quote-left' />
          <span id='text' className='card__quote'>{quotes.quote}</span>
        </article>
        <span id='author' className='card__author'>{quotes.author}</span>
        <article className='card__buttons'>

          <div className='card__social'>

            <a target='_blank' id='tweet-quote' className='card__socialbutton' href='https://twitter.com/intent/tweet' rel='noreferrer'>
              <i className='card__socialicon fa-brands fa-twitter' />
            </a>

            <a target='_blank' className='card__socialbutton' href='https://tumblr.com/' rel='noreferrer'>
              <i className='card__socialicon fa-brands fa-tumblr' />
            </a>

          </div>

          <button
            onClick={() => {
              fetchingData(randomNumber)
              changeColor()
            }}
            className='card__button'
            id='new-quote'
          >New quote
          </button>
        </article>
      </section>
    </>
  )
}

export default Card
