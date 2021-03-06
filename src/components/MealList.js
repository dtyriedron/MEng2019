import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import {formatTime} from '../helperFunctions'

const useStyles = makeStyles({
    paper:{
        margin : 5,
    },
    linkmeal :{
        'text-decoration': 'inherit', 
        color: 'blue',
    },
})

export default class MealList extends Component{
    constructor(props){
        super(props);
        console.log(props.meals);

    }
    setUp(){
        
        var container = []
        this.props.meals.forEach((v,k) => {
        var output = [];
        output.push(<MealListHeaderDate date={k} />);
        v.forEach(element => {
            output.push(<MealListSingle title={element.title} city={element.city} time={element.time} id={element.id}/>);
        })
        container.push(<Paper className="paper-board">{output}</Paper>)
    });
    return container;
    }
    render(){
        return(
            this.setUp()
        );
    }
    
}

export function MealListSingle(props){
    const classes = useStyles(); 
    //props: title, city, date, time
    return(
        <Paper className={classes.paper}>
        <Grid container>
            
            <Grid item xs>
            <Typography><a href={"/show-meal?meal=" + props.id} className={classes.linkmeal}>{props.title}</a></Typography>
            </Grid>
            <Grid item xs>
            <Typography>{props.city}</Typography>
            </Grid>
            <Grid item xs>
            <Typography>{formatTime(props.time)}</Typography>
            </Grid>
        </Grid>
        </Paper>
    );
}

export function MealListHeaderCity(props){
    //show city. Only needs once since the city is needed
    return(
    <Grid container>
        <Grid item xs>
            <Typography variant="h4">Meals in: {props.city}</Typography>
        </Grid>
    </Grid>
    );
}

export function MealListHeaderDate(props){
    //used to show the date before each chunck of meals
    return(
    <Grid container>
        <Grid item>
            <Typography variant="h5">{new Date(props.date).toDateString()}</Typography>
        </Grid>
    </Grid>
    );
}
