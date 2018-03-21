import React, { Component } from 'react';
import { Button, Card} from 'semantic-ui-react';
import '../../static/css/home.css';
import 'semantic-ui-css/semantic.min.css';
import Pagination from 'material-ui-pagination';
import Notifications, {notify} from 'react-notify-toast';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Grid } from 'semantic-ui-react';
import axiosInstance from '../../Axios';
import { Label } from 'semantic-ui-react';


const styles = {
    root: {
      justifyContent: 'space-around',
      marginLeft: 40,
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto',
    },
  };   
let apiBaseUrl = "/categories/";

class CategoriesGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            recipes:[],
            editing:{},
            token: '',
            username: '',
            message:'',
            error: '',
            search_error: '',
            open: false,
            activePage: 3,
            count: null
        }
        this.deleteCategory = this.deleteCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.handleViewrecipes = this.handleViewrecipes.bind(this);
    }
    handleOpen(id, name){
    this.setState({open: true, editing:{id:id, name:name}});
    };

    handleViewrecipes = (id) => {
        window.location.assign('/dashboard/category/' + id + '/recipes/');
    };
    handleClose = () => {
    this.setState({open: false, error: '', message: ''});
    };
    handleChange = event => {
        this.setState({ name: event.target.value });       
      }
    
    deleteCategory(id) {
    const self = this;
    axiosInstance.delete(apiBaseUrl + id.toString())
        .then(response => {
            self.setState({
                message: response.data.message
            })           
            notify.show(this.state.message, 'success', 6000);           
            this.getCategories();
            
        })
        this.getCategories()  
}
    editCategory(id) {
        var payload = {
            name: this.state.name
        }
        axiosInstance({
            method: 'put',
            url: apiBaseUrl + id.toString(),
            data: payload
        })
        .then(response => {
            this.setState({message: response.data.message});            

        })
        .catch(error => {
            console.log(error.response.data);
            if(error.response.data.message.name){
                this.setState({error: error.response.data.message.name[0]})
            } else if(error.response.data.message) {
                this.setState({error: error.response.data.message})
            }
        })
        this.getCategories()
    }
    getCategories(value, page) {
        if(value){
            apiBaseUrl = `${apiBaseUrl}?q=${value}`;
        }else if(page){
            apiBaseUrl = `${apiBaseUrl}?page=${page}`;
        };
        axiosInstance.get(apiBaseUrl)
        .then(response => {
            if (response.data.error) {
                notify.show(response.data.error, "error", 4000)
            }
            else {
                this.setState({categories: response.data.results, pages: response.data['pages']})
            }                      
        })
        .catch(error => {
            notify.show(error.response.data.error, 'error', 8000);
        })
        apiBaseUrl = "/categories/";
    }
    searchHandler = (event) => {
        event.preventDefault()
        this.getCategories(event.target.value);
    }
    paginationHandler = (page) => {
        this.getCategories(null, page)
    }
    componentDidMount(){
        this.getCategories()
    }
    componentWillMount(){
        if (!window.localStorage.getItem('token')) {
            window.location.assign('/login');
        };
    }
    render() {
        const data= this.state.categories;
        const actions = [
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={(event) => {
                  this.editCategory(this.state.editing.id);
                  }}
            />,
            <FlatButton
              label="Close"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleClose}
            />,
          ];
        return (
            <div>
            <div>
                <Grid>
                <Notifications/>
                    <Grid.Column textAlign={'right'} width={7}>
                        <h2 style={{marginTop: 20}}><b>Categories</b></h2>
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <TextField type="text"
                            style={{marginTop: 16}}
                            name="keyword_search"
                            onChange={this.searchHandler}
                            className="form-control"
                            placeholder="Search for a category..."/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    </Grid.Column>
                </Grid>
                <Dialog
                    title={"Edit  " + this.state.editing.name}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    { this.state.message?
                        <Label color='green' horizontal>{this.state.message}</Label>: ''}
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                        hintText={this.state.editing.name}
                        floatingLabelText={this.state.editing.name}
                        defaultValue={this.state.editing.name}
                        errorText={this.state.error}
                        onChange={(event, newValue) =>
                                            this.setState({ name: newValue , error: '', message: ''})} />
                    </form>
                </Dialog> 
                <div style={styles.root}>
                <Grid columns={3} divided>
                <Grid.Row>
                        {data.map((category) =>(
                        <Grid.Column key={category.id}>
                        <Card raised={true} style={{'marginBottom': 10}}>
                            <Card.Content>
                                <Card.Header>
                                {category.name}
                                </Card.Header> 
                                <Card.Description>
                                 Created on: {category.created_timestamp}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <div className='ui three buttons'>
                                <Button basic color='green' onClick={(event) => this.handleOpen(category.id,category.name)}>Edit</Button>
                                <Button basic color='blue' onClick={(event) => this.handleViewrecipes(category.id)}>Recipes</Button>                            
                                <Button basic color='red' onClick={(event) => this.deleteCategory(category.id)}>Delete</Button>
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
                <Pagination styleRoot={{marginTop: 30}}
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
export default CategoriesGet;