import React, {Component} from "react";
import "./css/Game.css";
import Footer from './Components/Footer'
import countriesJSON from './data/countriesJSON.json'

class Game extends Component {

    // Default props
    static defaultProps = {
        NUM_COUNTRIES: 247,
    };

    // Constructor: define state
    constructor(props) {
        super(props);
        this.state = {
            numCountriesCorrect: 0,
            currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON),
            userAnswer: "",
            countriesUsed: new Set()  // TODO: use and update this         
        }

        // Bind event handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Function: return random country (and corresponding capital) that has NOT been used before
    getNewCountryAndCapital(countriesJSON) {
        
        // Convert input JSON file into JS object
        let countriesObject = this.JSONtoObject(countriesJSON);

        // Define boolean to use when determining if country has been used
        // let countryIsNew = false;
        
        // Find random country and capital
        var newCountry;
        var newAnswer;

        // while(!countryIsNew) {
            const randNum = Math.floor(Math.random() * this.props.NUM_COUNTRIES);
            newCountry = countriesObject[randNum].country;
            newAnswer = countriesObject[randNum].capital;

            // TODO: Check if country has been used before
            // If set 'countriesUsed' does NOT contain newCountry, add it to the set and exit while loop
            // If set 'countriesUsed' does contain newCountry, re-find country in while loop
            // if(!this.state.countriesUsed.has(newCountry)) {
            //     this.state.countriesUsed.add(newCountry);
            //     countryIsNew = true;
            // }  
        // } 

        // Return new country and capital as an array
        return [newCountry, newAnswer];
    }

    // Function: input a JSON file, create and return the corresponding JS object
    JSONtoObject(JSONfile) {
        // Convert JSON file to JSON string
        let countriesJSONString = JSON.stringify(JSONfile);
        // Convert JSON string to JS object
        let countriesObject = JSON.parse(countriesJSONString);

        return countriesObject;
    }

    // TODO: Function: reset to start a new game
    reset() {

    }

    // Event handlers
    // Handler: handle change
    handleChange(evt) {
        // Update userAnswer to be whatever user inputted into input field
        this.setState({
            userAnswer: evt.target.value
        })
    }

    // Handler: handle submit
    handleSubmit(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Check if userAnswer matches correct answer
        if(this.state.userAnswer.toLowerCase() === this.state.currentCountryAndCapital[1].toLowerCase()) {
            // Increment 'numCountriesCorrect' in state
            this.setState((currentState) => {
                return {numCountriesCorrect: currentState.numCountriesCorrect + 1}
            })
            // Log
            console.log("CORRECT");

        } else {
            // Log
            console.log("WRONG");
        }

        // Reset userAnswer to empty string
        this.setState({
            userAnswer: ""
        })
    }

    // Render: define logic
    render() {

        // Return: define what will be displayed
        return (
            <div className="Game container">

                {/* Row: Main header */}
                <div className="row">
                    <h1 className="mainHeading col">Countries & Caps</h1>
                </div>

                {/* Row: Country and Capital headers */}
                <div className="row">
                    <p className="countryHeader col">Country</p>
                    <p className="guessHeader col">Capital</p>
                </div>

                {/* Row: Country print out, Capital input form */}
                <div className="row">
                    <div className="countryName col">
                        <p>{this.state.currentCountryAndCapital[0]}</p>
                    </div>

                    <div className="guess col">
                        <form onSubmit={this.handleSubmit} >
                            {/* <label for="fname">First name:</label> */}
                            <input 
                                type="text" 
                                value={this.state.userAnswer}
                                onChange={this.handleChange}
                                id="answer" 
                                name="answer" />
                            <br />
                            <input className="btn btn-success" type="submit" value="Submit" />
                        </form>
                    </div>        
                </div>   

                {/* Row: Stats */}
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col">
                        <p>Number of correct capitals: {this.state.numCountriesCorrect}</p>
                    </div>
                </div>

                {/* Footer */}    
                <Footer />         
            </div>
        )
    }
}

export default Game;