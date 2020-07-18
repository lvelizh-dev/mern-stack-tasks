import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            Tasks: [],
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e) {
        if(this.state.id){
            fetch(`/api/Tasks/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task updated!'});
                this.setState({id: '', title: '', description: ''});
                this.fetchTasks();
            })

        } else {
            fetch('/api/Tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
    
                 console.log(data)
                M.toast({html: 'Task saved'}); 
                this.setState({title: '', description: ''});
                this.fetchTasks();
            })
                .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    //es como el onInit(), apenas la app cargue se ejecuta cualquier cosa de javascript
    componentDidMount() {
        this.fetchTasks();

    }

    fetchTasks(){
        fetch('api/Tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({Tasks: data});
                console.log(this.state.Tasks);
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    EditTask(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    id: data.id
                })});
    }
    

    DeleteTask(id){
        // fetch('api/Tasks/'+id) valido tmb

        if(confirm('Are you sure to delete the task?')){
            fetch(`/api/tasks/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Task deleted'});
                this.fetchTasks();
            });
        }
     
}



    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN to CERN</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task title" value={this.state.title}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Task description" value={this.state.description} className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="submit">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Tasks.map(Task => {
                                            return (
                                                <tr key={Task.id}>
                                                    <td>{Task.title}</td>
                                                    <td>{Task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.EditTask(Task.id)}> <i className="material-icons">edit</i></button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.DeleteTask(Task.id)} style={{margin: '4px'}}> <i className="material-icons">delete</i> </button>

                                                    </td>                                        

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;

