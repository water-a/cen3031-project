import React, { Component } from 'react';
import ItemEdit from '../components/ItemEdit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const swal = withReactContent(Swal);
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            about: '',
            faq: '',
            materials: [],
            sizes: [],
            max: {
                height: 0,
                width: 0
            }
        }
    }
    componentDidMount(){
        this.refresh();
    }
    refresh(){
        fetch('/api/options')
            .then(response => response.json())
            .then(json => {
                let response = json.response;
                this.setState({
                    about: response.content.about,
                    faq: response.content.faq,
                    materials: response.materials,
                    sizes: response.sizes,
                    max: response.maxSize
                });
                this.refs.maxHeight.value = this.state.max.height;
                this.refs.maxWidth.value = this.state.max.width;
                this.refs.about.value = this.state.about;
                this.refs.faq.value = this.state.faq;
            });
    }
    updateContent = name => {
        fetch(`/api/options/content/${name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: this.refs[name].value
            })
        })
            .then(() => {
                Toast.fire({
                    type: 'success',
                    title: `Sucessfully updated ${name}!`
                });
                this.refresh();
            });
    }
    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Settings</h2>
                </div>
                <div className="card-body">
                    <h3>General</h3>
                    <section style={{display: 'flex', justifyContent: 'space-around'}}>
                        <ItemEdit
                            style={{width: '30%'}}
                            title="Materials"
                            items={this.state.materials}
                            render={item => {
                                return <span>{item.name} - {item.costPerArea}/in<sup>2</sup></span>
                            }}
                            add={() => {
                                swal.mixin({
                                    input: 'text',
                                    confirmButtonText: 'Next &rarr;',
                                    showCancelButton: true,
                                    progressSteps: ['1', '2']
                                }).queue([
                                    'What kind of material do you want to add?',
                                    'What is the cost per area?',
                                ]).then(result => {
                                    if (result.value){
                                        let answers = result.value;
                                        let material = answers[0];
                                        let costPerArea = answers[1];
                                        fetch(`/api/options/materials/${material}`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                costPerArea
                                            })
                                        })
                                            .then(response => response.json())
                                            .then(json => {
                                                if (json.status === 'success'){
                                                    Toast.fire({
                                                        type: 'success',
                                                        title: 'Added successfully!'
                                                    });
                                                    this.refresh();
                                                } else {
                                                    swal.fire('Error', json.message, 'error');
                                                }
                                            });
                                    }
                                });
                            }}
                            delete={value => {
                                fetch(`/api/options/materials/${value._id}`, {
                                    method: 'DELETE'
                                })
                                    .then(response => response.json())
                                    .then(json => {
                                        if (json.status === 'success'){
                                            Toast.fire({
                                                type: 'success',
                                                title: 'Deleted successfully!'
                                            });
                                            this.refresh();
                                        } else {
                                            swal.fire('Error', json.message, 'error');
                                        }
                                    });
                            }}
                        />
                        <ItemEdit
                            style={{width: '30%'}}
                            title="Sizes"
                            items={this.state.sizes}
                            render={item => {
                                return <span >{item.height}x{item.width}</span>
                            }}
                            add={() => {
                                swal.mixin({
                                    input: 'text',
                                    confirmButtonText: 'Next &rarr;',
                                    showCancelButton: true,
                                    progressSteps: ['1', '2']
                                }).queue([
                                    'What is the height?',
                                    'What is the width?',
                                ]).then(result => {
                                    if (result.value){
                                        let answers = result.value;
                                        let height = answers[0];
                                        let width = answers[1];
                                        fetch(`/api/options/sizes/${height}/${width}`, {
                                            method: 'POST'
                                        })
                                            .then(response => response.json())
                                            .then(json => {
                                                if (json.status === 'success'){
                                                    Toast.fire({
                                                        type: 'success',
                                                        title: 'Added successfully!'
                                                    });
                                                    this.refresh();
                                                } else {
                                                    swal.fire('Error', json.message, 'error');
                                                }
                                            });
                                    }
                                });
                            }}
                            delete={value => {
                                fetch(`/api/options/sizes/${value.height}/${value.width}`, {
                                    method: 'DELETE'
                                })
                                    .then(response => response.json())
                                    .then(json => {
                                        if (json.status === 'success'){
                                            Toast.fire({
                                                type: 'success',
                                                title: 'Deleted successfully!'
                                            });
                                            this.refresh();
                                        } else {
                                            swal.fire('Error', json.message, 'error');
                                        }
                                    });
                            }}
                        />
                        <form 
                            onSubmit={event => {
                                event.preventDefault();
                                fetch('/api/options/sizes/max', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        height: this.refs.maxHeight.value,
                                        width: this.refs.maxWidth.value
                                    })
                                })
                                    .then(() => {
                                        Toast.fire({
                                            type: 'success',
                                            title: 'Successfully updated!'
                                        });
                                        this.refresh();
                                    });
                            }} 
                            style={{width: '30%'}}
                        >
                            <h3 style={{margin: 0}}>Maximum height and width</h3>
                            <div className="form-group">
                                <label>Height</label>
                                <input type="number" ref="maxHeight" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Width</label>
                                <input type="number" ref="maxWidth" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Update</button>
                        </form>
                    </section>
                    <h3>Content</h3>
                    <section>
                        <div className="form-group">
                            <label>About</label>
                            <textarea ref="about" style={{minHeight: '200px'}} className="form-control" />
                        </div>
                        <button onClick={this.updateContent.bind(this, 'about')} className="btn btn-primary btn-block">Update About</button>
                        <div className="form-group">
                            <label>FAQ</label>
                            <textarea ref="faq" style={{minHeight: '200px'}} className="form-control" />
                        </div>
                        <button onClick={this.updateContent.bind(this, 'faq')} className="btn btn-primary btn-block">Update FAQ</button>
                    </section>
                </div>
            </div>
        );
    }
}

export default Settings;