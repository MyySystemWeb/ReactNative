import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList } from 'react-native';
import firebase from 'firebase';


export default class ProjetoReact extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			senha: ''
		};

		var firebaseConfig = {
			apiKey: "AIzaSyBgPIZdqJpIR59-XpK-n2ibrOp6VRafELw",
			authDomain: "testereact-f1f21.firebaseapp.com",
			databaseURL: "https://testereact-f1f21.firebaseio.com",
			projectId: "testereact-f1f21",
			storageBucket: "",
			messagingSenderId: "242612076354",
			appId: "1:242612076354:web:2e4029c19e09485d"
		};
		this.logar = this.logar.bind(this);
		this.sair = this.sair.bind(this);

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		firebase.auth().signOut();

		firebase.auth().onAuthStateChanged((user) => {

			if (user) {
				firebase.database().ref('usuarios').child(user.uid).once('value').then((snapshot) => {
					let nome = snapshot.val().nome;
					alert("Seja Bem Vindo(a), " + nome);
				});

				alert("Login true")
			} else {
				alert("login false")
			}
		});

	}

	logar() {
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha).catch((error) => {
			switch (error.code) {
				case 'auth/invalid-email':
					alert("Informações inválidas");
					break;

				case '2':
					alert("msg");
					break;

				case '3':
					alert("msg");
					break;

				default:
					alert("Error:" + error.code);
					break;
			}
		});


	}
	sair() {
		firebase.auth().signOut();
		alert("Saiu...");

	}

	render() {
		return (
			<View style={styles.container}>
				<Text>E-mail</Text>
				<TextInput onChangeText={(email) => this.setState({ email })} style={styles.input} />

				<Text>Senha</Text>
				<TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({ senha })} style={styles.input} />

				<Button title='Logar' onPress={this.logar} />
				<Button title='sair' onPress={this.sair} />
			</View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20
	},

	input: {
		height: 40,
		borderWidth: 1,
		borderColor: '#000',
		margin: 10
	},
});