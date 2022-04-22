const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg',
    cardId: 1,
  },
  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg',
    cardId: 2,
  },
  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg',
    cardId: 3,
  },
  {
    name: 'Off-By-One',
    skill: 'climbing mountains',
    imgUrl: '/static/img/off-by-one.jpeg',
    cardId: 4,
  },
  {
    name: 'Seed.py',
    skill: 'making curry dishes',
    imgUrl: '/static/img/seedpy.jpeg',
    cardId: 5,
  },
  {
    name: 'Polymorphism',
    skill: 'costumes',
    imgUrl: '/static/img/polymorphism.jpeg',
    cardId: 6,
  },
  {
    name: 'Short Stack Overflow',
    skill: 'ocean animal trivia',
    imgUrl: '/static/img/shortstack-overflow.jpeg',
    cardId: 7,
  },
  {
    name: 'Merge',
    skill: 'bullet journaling',
    imgUrl: '/static/img/merge.png',
    cardId: 8,
  },
];

function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {

  const [cards, setCards] = React.useState([]);
  function addCard(cardId, name, skill) {
    const imgUrl = 'static/img/placeholder.png';
    const newCard = { cardId: cardId, skill: skill, name: name, imgUrl: imgUrl };
    // [...cards] makes a copy of cards. Similar to currentCards = cards[:] in Python
    const currentCards = [...cards];
    // [...currentCards, newCard] is an array containing all elements in currentCards followed by newCard
    setCards([...currentCards, newCard]);
    }

  React.useEffect(() => {
    fetch('/cards.json')
      .then((response) => response.json())
      .then((result) => {
        setCards(result.cards);
      });
  }, []);

  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  return (
    <React.Fragment>
      <AddTradingCard addCard={addCard} />
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}


ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));

function AddTradingCard(props) {
  const [name, setName] = React.useState('');
  const [skill, setSkill] = React.useState('');
  function addNewCard() {
    // TO BE IMPLEMENTED
    fetch('/add-card', {
      method: 'POST',
      body: JSON.stringify({name, skill}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(jsonResponse => {
        const cardAdded = jsonResponse.cardAdded
        // Below "destructures" the cardAdded object into variables, similar to Python's unpacking
        const {cardId: cardId, name: cardName, skill: cardSkill} = cardAdded;
        props.addCard(cardId, cardName, cardSkill);
        alert(`successfully add new card! Response: ${jsonResponse}`)
      });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}

