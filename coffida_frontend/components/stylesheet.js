import { StyleSheet } from 'react-native'

export default StyleSheet.create({


    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#d1e8d7',
        flexDirection: 'column',
        alignItems: 'center',

    },

    shop: {
        borderWidth: 1,
        borderColor: '#52e37b',
        borderRadius: 6,
        justifyContent: 'space-around',
        flexDirection: 'column',
        backgroundColor: '#d1e8d7',
        paddingLeft: 20,
        paddingRight: 20,
    },

    star: {
        //flex: 1,
        //justifyContent: 'flex-end',
        alignItems: 'flex-end'
        //textAlign: 'right',
        //textAlign: 'justify',
        //paddingLeft: 50,
        //marginTop: 5,
        
    },

    ratingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

    mapButton: {
        flexDirection: 'row',
        width: 100,
        height: 20,
        backgroundColor: '#52e37b',
        borderRadius: 20,

    },

    mapButtonView: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 10,
        
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'black',
        padding: 8,
    },

    text2: {
        fontSize: 12,
        textAlign: 'center',
        color: 'black',
        paddingLeft: 30,
        
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
    },

    image: {
        height: 100,
        width: 100,
        borderRadius: 6,
        marginBottom: 5
    },

    flatlist: {
        borderWidth: 1,
        borderColor: '#52e37b',
        height: 40,
        width: 300,
        paddingTop: 10,
        marginBottom: 5,
        borderRadius: 6
    }
});