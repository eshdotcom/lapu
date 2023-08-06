import React, {Component} from "react";
import "./css/Home.css";
import Header from './Components/Header'
import Game from './Game'
import Footer from './Components/Footer'

class Home extends Component {

    // Default props
    static defaultProps = {
    };

    // Constructor: define state
    constructor(props) {
        super(props);
        this.state = {
            filterAfrica: "false",
            filterAsia: "false",
            filterAustralia: "false",
            filterEurope: "false",
            filterNorthAmerica: "false",
            filterOceania: "false",
            filterSouthAmerica: "false",
            filterUN: "false",
            renderGame: "false"
        }

        // Bind event handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitFilterForm = this.handleSubmitFilterForm.bind(this);
    }

    // ************
    // Functions
    // ************
    
    // **************
    // Event handlers
    // **************

    // Handler: handle change on filter form
    handleChange(evt) {
        // Update state to new filter values
        this.setState({
            [evt.target.name]: evt.target.checked
        })

        // Log
        console.log(evt.target.name, evt.target.checked);
    }

    // Handler: handle submission off filter form
    handleSubmitFilterForm(evt) {
        // Prevent default form submit behavior
        evt.preventDefault();

        // Set 'renderGame' to true to start the <Game/> with desired filters
        this.setState({
            renderGame: true
        })

        // Log
        console.log("Filter form submitted");
    }

    // ****************
    // Helper functions
    // ****************    

    // ******
    // Render
    // ******
    render() {

        // Return: define what will be displayed
        return (
            <div className="Home container">

                {/* Row: Header */}  
                <Header /> 

                { this.state.renderGame 
                    ?
                    <Game 
                        filterAfrica = {this.state.filterAfrica}
                        filterAsia = {this.state.filterAsia}
                        filterAustralia = {this.state.filterAustralia}
                        filterEurope = {this.state.filterEurope}
                        filterNorthAmerica = {this.state.filterNorthAmerica}
                        filterOceania = {this.state.filterOceania}
                        filterSouthAmerica = {this.state.filterSouthAmerica}
                        filterUN = {this.state.filterUN}
                    />
                    : 
                    <div>
                        {/* Row: Subheading */} 
                        <div className="row">
                            <p className="description">Welcome to the game. Match as many capitals to their countries as you can.</p> 
                            <p className="description">Select your options, then hit go!</p> 
                        </div>

                        {/* Row: Option form */} 
                        <div className="row optionsRow">
                            <form className="form-control form-check" onChange={this.handleChange} onSubmit={this.handleSubmitFilterForm} >
                                <p className="form-subheading">Country filters</p>

                                <input type="checkbox" value={this.state.filterAfrica} onChange={this.handleChange} id="filter-africa" name="filter-africa" />
                                <label className="filter" htmlFor="filterAfrica">Africa</label>
                                <br />
                                <input type="checkbox" value={this.state.filterAsia} onChange={this.handleChange} id="filter-asia" name="filter-asia" />
                                <label className="filter" htmlFor="filter-asia">Asia</label>
                                <br />
                                <input type="checkbox" value={this.state.filterAustralia} onChange={this.handleChange} id="filter-australia" name="filter-australia" />
                                <label className="filter" htmlFor="filter-australia">Australia</label>
                                <br />
                                <input type="checkbox" value={this.state.filterEurope} onChange={this.handleChange} id="filter-europe" name="filter-europe" />
                                <label className="filter" htmlFor="filter-europe">Europe</label>
                                <br />
                                <input type="checkbox" value={this.state.filterNorthAmerica} onChange={this.handleChange} id="filter-north-america" name="filter-north-america" />
                                <label className="filter" htmlFor="filter-north-america">North America</label>
                                <br />
                                <input type="checkbox" value={this.state.filterOceania} onChange={this.handleChange} id="filter-oceania" name="filter-oceania" />
                                <label className="filter" htmlFor="filter-oceania">Oceania</label>
                                <br />
                                <input type="checkbox" value={this.state.filterSouthAmerica} onChange={this.handleChange} id="filter-south-america" name="filter-south-america" />
                                <label className="filter" htmlFor="filter-south-america">South America</label>
                                <br /><br />

                                <p className="form-subheading">Other</p>

                                <input type="checkbox" value={this.state.filterUN} onChange={this.handleChange} id="filter-UN" name="filter-UN" />
                                <label className="filter" htmlFor="filter-UN">UN membership</label>

                                <br /><br />
                                <input className="btn btn-success filter-btn" type="submit" value="Go!" />
                            </form>
                        </div>
                    </div>
                }
                

                {/* Row: Footer */}  
                <Footer />         
            </div>
        )
    }
}

// Export game
export default Home;

// ********
// Scratch
// ********

// (1) Use react-select package to create filters menu
// Imports:
//   import Select from 'react-select'
//   import makeAnimated from 'react-select/animated';
// In render():
    // const filters = [
    //     { value: this.state.filterAfrica, label: 'Africa' },
    //     { value: this.state.filterAsia, label: 'Asia' },
    //     { value: this.state.filterAustralia, label: 'Australia' },
    //     { value: this.state.filterEurope, label: 'Europe' },
    //     { value: this.state.filterNorthAmerica, label: 'North America' },
    //     { value: this.state.filterOceania, label: 'Oceania' },
    //     { value: this.state.filterSouthAmerica, label: 'South America' },
    //     { value: this.state.filterUN, label: 'UN membership' }
    // ]
    // const animatedComponents = makeAnimated();
// In return():
// {/* <Select
//     closeMenuOnSelect={false}
//     components={animatedComponents}
//     defaultValue={[filters[0], filters[1]]}
//     isSearchable
//     isMulti
//     options={filters}
// /> */}