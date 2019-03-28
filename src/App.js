import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

// TODO:
// + highlight button mode with color (selected)
// + cursor pointer (hand) on buttons
// + have a method to create a new color
// + function to generate an array with N colors
// + wrongGuesses same number of items as colors
// style the color blocks
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "hard",
      colorToGuess: {r: 0, g: 0, b: 0},
      colors: [],
      gameWon: false,
      wrongGuesses: [],
    }
  }

  componentDidMount() {
    this.newGame(this.state.mode);
  }

  randomColorValue() {
    return Math.floor(Math.random() * (255 + 1));
  }

  newColor() {
    return {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()};
  }

 arrayOfColors(n) {
   var arr = [...Array(n).keys()];
   return arr.map(x => x = this.newColor());
 }

  check(n) {
    if (this.state.colors[n] === this.state.colorToGuess) {
      this.setState({gameWon: true});
    }
    else {
      const guesses = this.state.wrongGuesses;
      guesses[n] = true;
      this.setState({wrongGuesses: guesses});
    }
  }

  newGame(mode) {
    let colors = []

    if (mode === "hard") {
      colors = this.arrayOfColors(6);
    }
    else {
      colors = this.arrayOfColors(3);
    }

    this.setState({
      colorToGuess: colors[0],
      colors: colors.sort(() =>  .5 - Math.random()),
      gameWon: false,
      wrongGuesses: colors.map(x => false),
      mode: mode
    });
  }

  easy() {
    this.newGame("easy");
  }

  hard() {
    this.newGame("hard");
  }

  render() {
    return (
      <AppBody>
        <HeaderContainer gameWon={this.state.gameWon} colour={this.state.colorToGuess}>
          <div>THE GREAT </div>
          <ColorCode> RGB({this.state.colorToGuess.r}, {this.state.colorToGuess.g}, {this.state.colorToGuess.b}) </ColorCode>
          <div>GUESSING GAME</div>
        </HeaderContainer>

        <MenuContainer>
          <NewGameButton onClick={() => this.newGame(this.state.mode)}>NEW COLORS</NewGameButton>
          <ModeButtons>
            <Button onClick={() => this.easy()} selected={this.state.mode === "easy"}>EASY</Button>
            <Button onClick={() => this.hard()} selected={this.state.mode === "hard"}>HARD</Button>
          </ModeButtons>
        </MenuContainer>

        <ColorsContainer>
          <ColorOptions>
            <ColorOption color={this.state.colors[0]} onClick={() => this.check(0)} wrongColor={this.state.wrongGuesses[0]}/>
            <ColorOption color={this.state.colors[1]} onClick={() => this.check(1)} wrongColor={this.state.wrongGuesses[1]}/>
            <ColorOption color={this.state.colors[2]} onClick={() => this.check(2)} wrongColor={this.state.wrongGuesses[2]}/>
          </ColorOptions>

          {this.state.mode === 'hard' && (
            <ColorOptions>
              <ColorOption color={this.state.colors[3]} onClick={() => this.check(3)} wrongColor={this.state.wrongGuesses[3]}/>
              <ColorOption color={this.state.colors[4]} onClick={() => this.check(4)} wrongColor={this.state.wrongGuesses[4]}/>
              <ColorOption color={this.state.colors[5]} onClick={() => this.check(5)} wrongColor={this.state.wrongGuesses[5]}/>
            </ColorOptions>
          )}
        </ColorsContainer>

      </AppBody>
    );
  }
}

const Flex = styled.div`
  display: flex;
`
const AppBody = styled(Flex)`
  text-align: center;
  flex-direction: column;
  height: 100vh;
`
const Row = styled(Flex)`
  padding: 2% 33%;
`
const HeaderContainer = styled(Row)`
  background-color: #3C76AE;
  ${props => props.gameWon && `
    background-color: rgb(${props.colour.r}, ${props.colour.g}, ${props.colour.b});
  `}
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 26px;
  border: none;
`
const ColorCode = styled(Flex)`
  font-size: 44px;
  justify-content: center;
`
const MenuContainer = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding-top: 0px;
  padding-bottom: 0px;
  align-items: stretch;
  border: none;
`
const ColorsContainer = styled(Row)`
  background-color: #445b70;
  flex: 1;
  flex-direction: column;
  padding: 0;
  align-items: center;
  padding-top: 15px;
`
const ColorOptions = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 50%;
  min-width: 600px;
`
const ColorOption = styled(Flex)`
  height: 160px;
  width: 160px;
  margin: 5px;
  flex-direction: column;
  margin: 10px;
  border-radius: 25px;
  cursor: pointer;
  border: 5px solid whitesmoke;

  ${props => props.color && `
    background-color: rgb(${props.color.r}, ${props.color.g}, ${props.color.b});
  `}

  ${props => props.wrongColor && `
    visibility: hidden;
  `}
`
const NewGameButton = styled.button`
  color: #3C76AE;
  background-color: white;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #3C76AE;
  }
`
const Button = styled.button`
  color: #3C76AE;
  background-color: white;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #3C76AE;
  }
  ${props => props.selected && `
    color: white;
    background-color: #3C76AE;
  `}
`
const ModeButtons = styled(Flex)`
  align-items: stretch;
`
export default App;
