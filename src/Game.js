import React, {Component} from "react";
import "./css/Game.css";
import Footer from './Components/Footer'
import countriesJSON from './data/countryData.json'

class Game extends Component {

    // Default props
    static defaultProps = {
        NUM_COUNTRIES: 247,
        livesRemaining: 3    // TODO: add lives feature
    };

    // Constructor: define state
    constructor(props) {
        super(props);
        this.state = {
            streak: 0,
            currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON),
            userAnswer: "",
            endGame: false
            // countriesUsed: new Set()  // TODO: use and update this         
        }

        // Bind event handlers
        this.handleChangeCapitalForm = this.handleChangeCapitalForm.bind(this);
        this.handleSubmitCapitalForm = this.handleSubmitCapitalForm.bind(this);
        this.handleSubmitRestart = this.handleSubmitRestart.bind(this);
    }

    // ************
    // Functions
    // ************

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

    // **************
    // Event handlers
    // **************

    // Handler: handle change
    handleChangeCapitalForm(evt) {
        // Update userAnswer to be whatever user inputted into input field
        this.setState({
            userAnswer: evt.target.value
        })
    }

    // Handler: handle submit
    handleSubmitCapitalForm(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Check if userAnswer matches correct answer
        // If userAnswer matches correct answer:
        if(this.state.userAnswer.toLowerCase() === this.state.currentCountryAndCapital[1].toLowerCase()) {

            // Log
            console.log("CORRECT");

            // Increment 'streak' in state
            // Continue the game by changing the current country
            this.setState((currentState) => {
                return { 
                    streak: currentState.streak + 1,
                    currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON)
                }
            })
            console.log(this.state.currentCountryAndCapital);
            
        // If userAnswer does not match correct answer:
        } else {
            
            // Log
            console.log("WRONG");

            // Set 'endGame' to true
            this.setState({
                endGame: true
            })
        }

        // Reset userAnswer to empty string
        this.setState({
            userAnswer: ""
        })
    }

    // Handler:
    handleSubmitRestart(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Call reset() to reset state values
        this.reset();

        // Log
        console.log("Game restarted");
    }

    // ****************
    // Helper functions
    // ****************

    // Function: reset to start a new game
    reset() {
        this.setState({
            endGame: false,
            streak: 0,
            currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON)
        });
        console.log("reset()");
      }

    // ******
    // Render
    // ******
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

                {/* Row: Country print out, capital input form */}
                <div className="row">

                    {/* Col: Show country name */}
                    <div className="countryName col">
                        <p>{this.state.currentCountryAndCapital[0]}</p>
                    </div>
                    
                    {/* Col: Show capital input form, game stats */}
                    <div className="guess col">
                        {/* IF game is over, show correct answer */}
                        {this.state.endGame &&
                            <p className="capitalName">{this.state.currentCountryAndCapital[1]}</p>
                        }
                        {/* IF game is not over, show form and button */}
                        {!this.state.endGame &&
                            <form onSubmit={this.handleSubmitCapitalForm} >
                                <input 
                                    type="text" 
                                    value={this.state.userAnswer}
                                    onChange={this.handleChangeCapitalForm}
                                    id="answer" 
                                    name="answer" />
                                <br />
                                <input className="btn btn-success" type="submit" value="Submit" />
                            </form>
                        }
                    </div>        
                </div>   

                {/* Row: Stats */}
                <div className="row">

                    {/* Col: Stats */}
                    <div className="col">
                        <p className="streak">Streak: {this.state.streak}</p>
                        <p>{this.state.endGame ? "WRONG! Game over." : ""}</p>
                
                        {/* Button: Restart */}
                        <form onSubmit={this.handleSubmitRestart} >
                            <input className="btn btn-primary" type="submit" value="Restart" />
                        </form>
                    </div>
                </div>

                {/* Footer */}  
                <Footer />         
            </div>
        )
    }
}

// Export game
export default Game;