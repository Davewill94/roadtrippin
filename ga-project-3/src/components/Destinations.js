import React, {Component} from 'react';



class Destinations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            from: '',
            to: '',
            name: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <aside>
                <form onSubmit={(e)=> this.props.tripSubmit(e, this.state)}>
                    <label for='name' >Name Your Trip:</label>
                    <input type="text" name='name' placeholder="Trip Name" onChange={this.handleChange} required/>
                    <label for='start' >Enter Starting City:</label>
                    <input type="text" name='from' placeholder="City,State" onChange={this.handleChange} required/>
                    <label for="destination">Enter Destination City:</label>
                    <input type="text" name='to' placeholder="City,State" onChange={this.handleChange} required/>
                    <input type="submit" value="Take a trip?" />
                </form>
            </aside>

        )
    }



}



export default Destinations;