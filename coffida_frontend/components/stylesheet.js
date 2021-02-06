import { StyleSheet } from 'react-native'

export default StyleSheet.create({


    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d1e8d7',
        flexDirection: 'column',
        alignItems: 'center',

    },

    input: {
        borderWidth: 1,
        borderColor: '#52e37b',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        height: 40,
        width: 200,
        margin: 20,
    },

    button: {
        width: 200,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#52e37b',
        margin: 20,
    },

    buttonRed: {
        width: 200,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ed6258',
        margin: 20,
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        padding: 8,
    },

    text2: {
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
        padding: 4,
    },

    passwordBar: {
        width: '50%',
        marginLeft: 100,
        marginRight: 100,
    },

    logo: {
        width: 150,
        height: 150,
        marginBottom: 80
    }
});