import React, {Component} from "react";
import "./css/Game.css";
// import Header from './Components/Header'
import Footer from './Components/Footer'
import countriesJSON from './data/countryData.json'

class Game extends Component {

    // Default props
    static defaultProps = {
        NUM_COUNTRIES: 247,
        filterAfrica: false,
        filterAsia: false,
        filterAustralia: false,
        filterEurope: false,
        filterNorthAmerica: false,
        filterOceania: false,
        filterSouthAmerica: false,
        filterUN: true,
        renderGame: true
    };

    // Constructor: define state
    constructor(props) {
        super(props);
        this.state = {
            totalCorrect: 0,
            totalAttempted: 0,
            streak: 0,
            bestStreak: 0,
            previousCountryAndCapital: "",
            currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON),
            userAnswer: "",
            endGame: false,
            skipped: false
            // countriesUsed: new Set()  // TODO: use and update this         
        }

        // Bind event handlers
        this.handleChangeCapitalForm = this.handleChangeCapitalForm.bind(this);
        this.handleSubmitCapitalForm = this.handleSubmitCapitalForm.bind(this);
        this.handleSubmitSkip = this.handleSubmitSkip.bind(this);
        this.handleSubmitRestart = this.handleSubmitRestart.bind(this);
        this.handleSubmitBackToMenu = this.handleSubmitBackToMenu.bind(this);
    }

    // ************
    // Functions
    // ************

    // Function: return random country (and corresponding capital) that has NOT been used before
    getNewCountryAndCapital(countriesJSON) {
        // Convert input JSON file into JS object
        let countriesObject = this.JSONtoObject(countriesJSON);

        // Find random country and capital
        var newCountry;
        var newAnswer;
        // var newContinent;
        // var newUN;

        // /////////////////////////////////////////////////////////////////////// GOOD CODE BELOW
        // // Run the loop as long as country does not satisfy filters
        // let satisfiesFilters = false;
        // while(!satisfiesFilters) {

        //     // Find random country and capital
        //     const randNum = Math.floor(Math.random() * this.props.NUM_COUNTRIES);
        //     newCountry = countriesObject[randNum].country;
        //     newAnswer = countriesObject[randNum].capital;
        //     newContinent = countriesObject[randNum].continent;
        //     newUN = countriesObject[randNum].UN;

        //     // Check if country satisfies filters (temporarily where we set filters)
        //     if ((newContinent === "South America" || newContinent === "Africa") 
        //         && newUN === "true") {

        //         // If so, country is valid, exit while loop
        //         satisfiesFilters = true;
        //     }
        // }
        /////////////////////////////////////////////////////////////////////// GOOD CODE ABOVE, NEW CODE BELOW
        // Find random country using random number
        let randNum = Math.floor(Math.random() * this.props.NUM_COUNTRIES);
        
        // Run the loop as long as new country does not satisfy filters
        while(!this.isCountryValid(countriesObject[randNum])) {
            // Find a new random country
            randNum = Math.floor(Math.random() * this.props.NUM_COUNTRIES);
            console.log("in while loop, country = ", countriesObject[randNum]); // LOG
        }

        // Store fields of valified new country
        newCountry = countriesObject[randNum].country;
        newAnswer = countriesObject[randNum].capital;
        // newContinent = countriesObject[randNum].continent;
        // newUN = countriesObject[randNum].UN;

        /////////////////////////////////////////////////////////////////////// NEW CODE ABOVE

        // Return new country and capital as an array
        return [newCountry, newAnswer];
    }

    // Function: return whether country satisfies current set of filters
    isCountryValid(countryObject) {
        console.log("in isCountryValid for ", countryObject.country); // LOG

        let isValid = false;
        for(let prop in this.props) {
            console.log("props: ", this.props); // LOG // BAD TOO MANY PRINT OUTSSS

        }
        return isValid
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

    // Handler: handle SUBMIT of capital form
    handleSubmitCapitalForm(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Check if userAnswer matches correct answer
        // If userAnswer matches correct answer (after lowercasing and removing accents):
        if(this.state.userAnswer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === 
            this.state.currentCountryAndCapital[1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {

            // Log
            console.log("CORRECT");

            // Increment 'totalCorrect' in state
            // Continue the game by changing the current country
            this.setState((currentState) => {
                return { 
                    totalCorrect: currentState.totalCorrect + 1,
                    totalAttempted: currentState.totalAttempted + 1,
                    streak: currentState.streak + 1,
                    currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON),
                }
            })

            // If the current streak is greater than the best streak, set the best equal to the current
            if(this.state.streak >= this.state.bestStreak) {
                this.setState((currentState) => {
                    return { 
                        bestStreak: currentState.streak,
                    }
                })
            }
            
        // If userAnswer does not match correct answer:
        } else {
            
            // Log
            console.log("WRONG");

            // Set 'endGame' to true
            this.setState((currentState) => {
                return { 
                    totalAttempted: currentState.totalAttempted + 1,
                    endGame: true,
                    streak: 0
                }
            })
        }

        // Reset userAnswer to empty string
        this.setState({
            userAnswer: ""
        })
    }

    // Handler: RESTART button
    handleSubmitRestart(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Call reset() to reset state values
        this.reset();

        // Log
        console.log("Game restarted");
    }

    // Handler: SKIP button
    handleSubmitSkip(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Assign new country, reset streak to 0, and set skipped to true
        // Set previous country equal to the old current country to save this value
        this.setState((currentState) => {
            return { 
                userAnswer: "",
                totalAttempted: currentState.totalAttempted + 1,
                previousCountryAndCapital: currentState.currentCountryAndCapital,
                currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON),
                streak: 0,
                skipped: true
            }
        })

        // After a second, changed 'skipped' back to false
        setTimeout(() => {
            this.setState({
                skipped: false
            })
        }, 800);

        // Log
        console.log("Country skipped");
    }

    // Handler: BACK TO MENU button
    handleSubmitBackToMenu(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Set 'renderGame' to false, so that we return to main menu
        this.setState({
            renderGame: false
        })

        // Log
        console.log("this.state.renderGame", this.state.renderGame);
        console.log("Back to menu");

    }

    // ****************
    // Helper functions
    // ****************

    // Function: reset to start a new game
    reset() {
        this.setState({
            totalCorrect: 0,
            totalAttempted: 0,
            endGame: false,
            streak: 0,
            bestStreak: 0,
            currentCountryAndCapital: this.getNewCountryAndCapital(countriesJSON)
        });
        console.log("Stats reset");
      }

    // ******
    // Render
    // ******
    render() {

        // Return: define what will be displayed
        return (
            <div className="Game container">

                {/* Row: Main header */}
                {/* <Header /> */}

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
                        {/* IF game is not over, show form and buttons */}
                        {!this.state.endGame &&
                            <form onSubmit={this.handleSubmitCapitalForm} >
                                <input 
                                    type="text" 
                                    value={this.state.userAnswer}
                                    onChange={this.handleChangeCapitalForm}
                                    id="answer" 
                                    name="answer" />
                                <br />
                                <input className="btn btn-success btn-submit" type="submit" value="Submit" />
                                <br />
                                {this.state.skipped ?
                                    <p className="skip-replacement">{this.state.previousCountryAndCapital[1]}</p>
                                    : <input onClick={this.handleSubmitSkip} className="btn btn-warning btn-skip" type="submit" value="Skip" />
                                }
                            </form>
                        }
                    </div>        
                </div>   

                {/* Row: Stats */}
                <div className="row">

                    {/* Col: Stats */}
                    <div className="col form-control form-stats">
                        <p className="totalCorrect">Total correct: <span className="stat-value">{this.state.totalCorrect} / {this.state.totalAttempted}</span></p>
                        <p className="streak">Current streak: <span className="stat-value">{this.state.streak}</span></p>
                        <p className="streak">Best streak: <span className="stat-value">{this.state.bestStreak}</span></p>
                        {this.state.endGame &&
                            <p>WRONG! Game over.</p>
                        }
                        {/* Button: Restart */}
                        <form onSubmit={this.handleSubmitRestart} >
                            <input className="btn btn-primary btn-restart" type="submit" value="Restart" />
                        </form>
                        {/* Button: Back to menu */}
                        <form onSubmit={this.handleSubmitBackToMenu} >
                            <input className="btn btn-dark btn-backToMenu" type="submit" value="&lt; Back to menu" />
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

// Scratch

// (1) Define desired filters
// const filters = ["Europe", "North America", "South America", "UN"];

