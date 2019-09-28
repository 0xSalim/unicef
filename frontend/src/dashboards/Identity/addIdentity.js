import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider } from '@material-ui/core';
import muiTheme from '../../theme/muiTheme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import Header from '../../header/header';
import Loading from '../loading';


export default class AddIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom : 'Michel',
      prenom : 'Michel',
      sexe : '',
      dateNaissance : '',
      lieuNaissance : '',
      couleurYeux : '',
      parent1 : '',
      parent2 : '',
      enfants : '',
      signatureOracle : '',
      commentaire : '',
      acteNaissance : '',
      photo : '',
      fingerprint : '',
      donneesAutres : '',
      loading: false,
      answer: false,
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleChange(files) {
    let reader = new FileReader();
    if (files.length === 0) {
      this.setState({
        files: null,
        data: null
      });
    } else {
      reader.readAsBinaryString(files[0]);
      reader.onload = () => {
        this.setState({
          files: files,
          data: reader.result,
          dataHash: crypto.createHash('sha256').update(reader.result).digest('hex')
        });
      }
    }
  }

  displayForm = () => {
      return (          
          <div>
          <Paper style={styles}>
            <TextField
              key="1"
              name="nom"
              label="Nom"
              defaultValue="Michel"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            />
            <TextField
              key="2"
              name="prenom"
              label="Prenom"
              defaultValue="Michel"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            />
            <TextField
              key="3"
              name="sexe"
              label="Sexe de naissance"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            />              
            <TextField
              key="4"
              name="dateNaissance"
              label="Date de naissance"
              defaultValue="2019-01-01"
              type="date"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            /><br />
            <TextField
              name="lieuNaissance"
              key="9"
              label="Lieu et pays de naissance"
              style={styles.textFields.large}
              onChange={this.handleInputChange.bind(this)}
            /><br />
            <TextField
              key="5"
              name="couleurYeux"
              label="Couleur des yeux"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            /><br />
            <TextField
              key="6"
              name="parent1"
              label="Nom et prénom du parent 1"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            /><br />
            <TextField
              key="7"
              name="parent2"
              label="Nom et prénom du parent 2"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            /><br />
            <TextField
              key="8"
              name="enfants"
              label="Nom(s) et prénom(s) des enfants (optionnel)"
              style={styles.textFields.premLigne}
              onChange={this.handleInputChange.bind(this)}
            /><br />
            <TextField
              name="signatureOracle"
              key="12"
              label="Signature de l'oracle (juge, chef du village, officiel, etc.)"
              style={styles.textFields.large}
              onChange={this.handleInputChange.bind(this)}
            />
            <TextField
              name="commentaire"
              key="13"
              multiline
              fullWidth
              rows='3'
              label="Commentaires"
              style={styles.textFields.commentaire}
              onChange={this.handleInputChange.bind(this)}
            /><br /><br />
          <h1 style={styles.title}>Fichiers à uploader</h1>
          {this.displayDropZone('Acte de naissance', 'acteNaissance')}<br/>
          {this.displayDropZone('Photo', 'photo')}<br/>
          {this.displayDropZone('Empreinte digitale', 'fingerprint')}<br/>
          {this.displayDropZone('Autre', 'donneesAutres')}
          </Paper>
        </div>
      )
    }

    displayDropZone = (texte, name) => {
      return (
        <div>
            <Paper style={styles.dropZone}>
              <DropzoneArea
                key = {name}
                name = {name}
                filesLimit={1}
                showFileNamesInPreview={false}
                dropzoneText={texte}
                onChange={this.handleChange.bind(this)}
              />
            </Paper>
        </div>
      )
    }

    sendFiles = async (
      nom,
      prenom,
      sexe,
      dateNaissance,
      lieuNaissance,
      couleurYeux,
      parent1,
      parent2,
      enfants,
      signatureOracle,
      commentaire,
      acteNaissance,
      photo,
      fingerprint,
      donneesAutres,
    ) => {
      this.setState({ loading: true });
      await fetch('http://localhost:3000/addId', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                token: 'AAA'
              },
              body: JSON.stringify({
                // send files  acteNaissance, photo, fingerprint, donneesAutres
                "textFields": {
                  "nom": nom,
                  "prenom": prenom,
                  "sexe": sexe,
                  "dateNaissance": dateNaissance,
                  "lieuNaissance": lieuNaissance,
                  "couleurYeux": couleurYeux,
                  "parent1": parent1,
                  "parent2": parent2,
                  "enfants": enfants,
                  "signatureOracle": signatureOracle,
                  "commentaire": commentaire,
                }
            })
          })
          .then(() => {
            this.setState({
              // loading: false,
              answer: true,
            })
          })
          // .then(() => window.location.reload());
    }

    displayButton = () => {
      return (
        <div style={styles.button.envoyer} >
          <Button
            variant="contained"
            color="default"
            size="large"
            onClick={() => {
              this.sendFiles(
                this.state.nom,
                this.state.prenom,
                this.state.sexe,
                this.state.dateNaissance,
                this.state.lieuNaissance,
                this.state.couleurYeux,
                this.state.parent1,
                this.state.parent2,
                this.state.enfants,
                this.state.signatureOracle,
                this.state.commentaire,
                this.state.acteNaissance,
                this.state.photo,
                this.state.fingerprint,
                this.state.donneesAutres,
              )
            }}
          >
            Envoyer
          </Button>
        </div>
      )
    }

  render() {
      return (
        <div style={styles.root}>
          <Header/>
          <MuiThemeProvider theme={muiTheme}>
            {this.displayForm()}<br/>
            {this.displayButton()}
          </MuiThemeProvider>
        </div>
      )
  }
}

const styles = {
  paperLeft: {
    maxWidth: '650px',
    height: '400px',
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  paperRight: {
    marginLeft: '39%',
    height: '400px',
    width: '550px',
  },
  premLigne: {
    maxWidth : '10%'
  },
  title :{
    fontWeight: 'bold',
    color: '#660033',
    fontSize: '30px',
    paddingLeft: '2px',
    marginBottom: '7px',
    marginTop: '0px'
  },
  dropZone: {
    width: '350px',
    maxHeight: '400px',
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  textFields: {
    generic: {
      marginLeft: '20px',
      marginBottom: '10px',
    },
    premLigne: {
      marginRight: '10px',
      marginLeft: '20px',
      width: '42%',
      marginBottom: '10px',
    },
    large: {
      marginLeft: '20px',
      width: '92%',
      marginBottom: '10px',
      marginTop: '10px'
    },
    commentaire: {
      marginRight: '22px',
      marginLeft: '20px',
      width: '95%',
    },
  },
  button: {
    envoyer: {
      paddingTop: '',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto'
    }
  },
}