import React, { Component } from 'react';
import { Button, Card} from 'semantic-ui-react';
import axios from 'axios';
import '../../static/css/home.css';
import 'semantic-ui-css/semantic.min.css';
import Pagination from 'material-ui-pagination';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';
import {notify} from 'react-notify-toast';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Grid } from 'semantic-ui-react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import axiosInstance from '../../Axios';


const styles = {
    root: {
      justifyContent: 'space-around',
      marginLeft: 40,
    },
    chip: {
        marginTop: 20,
      },
    wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto',
    },
  };
// const headers = {headers: {"x-access-token": window.localStorage.getItem("token")},Content_Type: "application/json"};

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes:[],
            category_name: '',
            editing:{},
            token: '',
            username: '',
            message:'',
            error: '',
            open: {
                editing: false,
                adding: false
            },
        }
        this.deleteRecipe = this.deleteRecipe.bind(this); 
        this.editRecipe = this.editRecipe.bind(this);               
    }
    handleOpenEdit = (id, title, body) => {
        this.setState({open:{editing: true }, editing:{id:id, title:title, body: body}});
    };
    handleOpen = () => {
        this.setState({open: {adding:true}});
    };
    handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };
    handleClose = () => {
        this.setState({open: false, title_error:'', body_error:'', error:'', editing: ''});
    };
    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value, title_error:'', body_error:''});       
      }
    editRecipe(id) {
        var payload = {
            title: this.state.title,
            body: this.state.body
        }
        let apiBaseUrl = `/recipes/`;        
        axiosInstance({
            method: 'put',
            url: apiBaseUrl + id.toString(),
            data: payload,
            headers: {
                "Content-Type": "application/json",
                "x-access-token": window.localStorage.getItem('token')
            }
        })
            .then(function (response) {
                notify.show(response.data.Message, 'success', 6000);            

            })
            .catch(error => {  
                if (error.response.data.message === 'Token is Invalid'){
                    window.location.assign('/login')
                }
            })
            this.getRecipes()
    }
    deleteRecipe(id) {
        const self = this;
        let apiBaseUrl = `/recipes/`;
        axiosInstance.delete(apiBaseUrl + id.toString())
            .then(response => {         
                notify.show(response.data.Message, 'success', 6000); 
                this.getRecipes();                        
            })
            this.getRecipes()
    }

    handleSubmit = event => {
        let category_id =  this.props.match.params.id 
        let apiBaseUrl = `/category/${category_id}/recipes/`;

        const recipe = {
            title: this.state.title,
            body: this.state.body,      
        };   

        axiosInstance.post(apiBaseUrl ,recipe)
            .then(res => {
                this.getRecipes()
                notify.show(res.data, 'success', 4000)
            })
            .catch(error => {
                if (error.response.data.message.title){
                    this.setState({title_error: error.response.data.message.title[0]})
                    //  notify.show(error.response.data.message.title[0]);
                } else if (error.response.data.message.body){
                    this.setState({body_error: error.response.data.message.body[0]})                    
                    // notify.show(error.response.data.message.body[0], 'error', 4000);
                } else if (error.response.data.message){
                    notify.show(error.response.data.message.error, 'error', 4000);
                } else {
                    notify.show("Error while creating recipe", 'error', 4000);
                }
            }) 
            this.setState({name: ''});                      
    }
    
    
    getRecipes(value, page) {
        let category_id =  this.props.match.params.id 
        let apiBaseUrl = `/category/${category_id}/recipes/`;
        if(value){
            apiBaseUrl = `${apiBaseUrl}?q=${value}`;
        }else if(page){
            apiBaseUrl = `${apiBaseUrl}?page=${page}`;
        };
        const self = this;
        axiosInstance.get(apiBaseUrl)
        .then(response => {
            console.log(response.data.results[0].category.name);           
            self.setState({recipes: response.data.results, category_name: response.data.results[0].category.name, 
                pages: response.data['pages']})                         
        })
        .catch(error => {            
            if (error.response){
                if (error.response.data.message === 'Token is Invalid'){
                    window.location.assign('/login')
                };
                self.setState({
                    error: error.response.data.error
                })
                notify.show(this.state.error, 'error', 6000)
            } else if(error.request){
                notify.show("Server error", 'error', 4000)
            }            
        })
        apiBaseUrl = `/category/${category_id}/recipes/`;
    }
    searchHandler = (event) => {
        event.preventDefault()
        this.getRecipes(event.target.value);
    }
    paginationHandler = (page) => {
        this.getRecipes(null, page)
    }
    viewHandler = (id) => {
        this.getRecipes(id)
    }
    componentDidMount(){
        this.getRecipes()
    }
    render() {
        const data= this.state.recipes;
        const addactions = [
            <FlatButton
              label="submit"
              primary={true}
              keyboardFocused={true}
              onClick={(event) => {
                  this.handleSubmit();
                    {/* this.handleClose(); */}
                  }}
            />,
            <FlatButton
              label="close"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleClose}
            />,
          ];
          const editactions = [
            <FlatButton
              label="submit"
              primary={true}
              keyboardFocused={true}
              onClick={(event) => {
                  this.editRecipe(this.state.editing.id);
                  this.handleClose();
                  }}
            />,
            <FlatButton
              label="close"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleClose}
            />,
          ];
        return (
            <div>
            <div>
                    <Dialog
                        title="Add a new recipe"
                        actions={addactions}
                        modal={false}
                        open={this.state.open.adding}
                        onRequestClose={this.handleClose}
                        >
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            hintText="Enter recipe title"
                            floatingLabelText="Recipe title"
                            fullWidth={true}
                            errorText={this.state.title_error}
                            name='title'
                            onChange={this.handleChange} />
                            <br/>
                            <TextField
                            hintText="Enter recipe body"
                            floatingLabelText="Recipe body"
                            errorText={this.state.body_error}                            
                            name='body'
                            rows={2}
                            multiLine={true}
                            fullWidth={true}
                            rowsMax={4}
                            onChange={this.handleChange} />
                        </form>
                </Dialog>
                <Dialog
                        title={"Edit recipe:  " + this.state.editing.title}
                        actions={editactions}
                        modal={false}
                        open={this.state.open.editing}
                        onRequestClose={this.handleClose}
                        >
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            hintText="Enter recipe title"
                            floatingLabelText="Recipe title"
                            fullWidth={true}
                            name='title'
                            defaultValue={this.state.editing.title}
                            onChange={this.handleChange} />
                            <br/>
                            <TextField
                            hintText="Enter recipe body"
                            floatingLabelText="Recipe body"
                            rows={4}
                            multiLine={true}
                            name='body'
                            fullWidth={true}
                            defaultValue={this.state.editing.body}
                            rowsMax={4}
                            onChange={this.handleChange} />
                        </form>
                </Dialog>
                <Grid>
                    <Grid.Column width={3}>
                        <FloatingActionButton style={{marginTop: 10}} secondary={true} onClick={this.handleOpen}>
                        <ContentAdd />
                        </FloatingActionButton>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    <div style={styles.wrapper}>
                        <Chip
                        backgroundColor={blue300}
                        style={styles.chip}
                        >
                        Category: {this.state.category_name}
                        </Chip>
                    </div>
                    </Grid.Column>
                    <Grid.Column width={3}>                        
                        <h2 style={{marginTop: 20}}><b>Recipes</b></h2>
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <TextField type="text"
                            style={{marginTop: 16}}
                            name="keyword_search"
                            onChange={this.searchHandler}
                            class="form-control"
                            placeholder="Search for a recipe..."/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    </Grid.Column>
                </Grid>
                <div style={styles.root}>
                <Grid columns={3} divided>
                <Grid.Row>
                        {data.map((recipe) =>( 
                        <Grid.Column>
                        <Card raised={true} style={{'marginBottom': 10}}>
                            <Card.Content>
                                <Card.Header>
                                {recipe.title}
                                </Card.Header> 
                                <Card.Description>
                                 {recipe.body}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                <Button basic color='green' onClick={(event) => this.handleOpenEdit(recipe.id,recipe.title, recipe.body)}>Edit</Button>                           
                                <Button basic color='red' onClick={(event) => this.deleteRecipe(recipe.id)}>Delete</Button>
                                </div>
                            </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                    </Grid.Row>
                </Grid>
                </div>
            </div>
            <div>
                <Pagination
                    total = { this.state.pages }
                    current = { this.state.current_page }
                    display = { this.state.pages }
                    onChange = {this.paginationHandler.bind(this)}
                    />    
                </div>
        </div>
        );
    }
}
export default Recipes;