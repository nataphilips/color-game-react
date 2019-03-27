import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);

    const colors = [
      {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()},
      {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()},
      {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()},
      {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()},
      {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()},
      {r: this.randomColorValue(), g: this.randomColorValue(), b: this.randomColorValue()},
    ]

    this.state = {
      mode: "hard",
      colorToGuess: colors[0],
      colors: colors.sort(() =>  .5 - Math.random()),
      gameWon: false,
      wrongGuesses: [false, false, false, false, false, false]
    }
  }

  randomColorValue() {
    return Math.floor(Math.random() * (255 + 1));
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

  render() {
    return (
      <AppBody>
        <HeaderContainer gameWon={this.state.gameWon} colour={this.state.colorToGuess}>
          <div>THE GREAT </div>
          <ColorCode> RGB({this.state.colorToGuess.r}, {this.state.colorToGuess.g}, {this.state.colorToGuess.b}) </ColorCode>
          <div>GUESSING GAME</div>
        </HeaderContainer>

        <MenuContainer>
          <MenuButton onClick={() => window.location.reload()}>NEW COLORS</MenuButton>
          <ModeButtons>
            <MenuButton>EASY</MenuButton>
            <MenuButton>HARD</MenuButton>
          </ModeButtons>
        </MenuContainer>

        <ColorsContainer>
          <ColorOptions>
            <ColorOption color={this.state.colors[0]} onClick={() => this.check(0)} wrongColor={this.state.wrongGuesses[0]}/>
            <ColorOption color={this.state.colors[1]} onClick={() => this.check(1)} wrongColor={this.state.wrongGuesses[1]}/>
            <ColorOption color={this.state.colors[2]} onClick={() => this.check(2)} wrongColor={this.state.wrongGuesses[2]}/>
            <ColorOption color={this.state.colors[3]} onClick={() => this.check(3)} wrongColor={this.state.wrongGuesses[3]}/>
            <ColorOption color={this.state.colors[4]} onClick={() => this.check(4)} wrongColor={this.state.wrongGuesses[4]}/>
            <ColorOption color={this.state.colors[5]} onClick={() => this.check(5)} wrongColor={this.state.wrongGuesses[5]}/>
          </ColorOptions>
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
  padding: 20px 400px;
`
const HeaderContainer = styled(Row)`
  background-color: #3C76AE;
  ${props => props.gameWon && `
    background-color: rgb(${props.colour.r}, ${props.colour.g}, ${props.colour.b});
  `}
  justify-content: center;
  flex-direction: column;
  color: white;
  font-size: 22px;
  border: none;
`
const ColorCode = styled(Flex)`
  font-size: 40px;
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
`
const ColorOptions = styled(Flex)`
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`
const ColorOption = styled(Flex)`
  height: 50px;
  width: calc(100% / 3);

  ${props => props.color && `
    background-color: rgb(${props.color.r}, ${props.color.g}, ${props.color.b});
  `}

  ${props => props.wrongColor && `
    visibility: hidden;
  `}
`
const MenuButton = styled.button`
  color: #3C76AE;
  background-color: white;
  font-weight: bold;
  border: none;
  &:hover {
    color: white;
    background-color: #3C76AE;
  }
`
const ModeButtons = styled(Flex)`
  align-items: stretch;
`

export default App;
