import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1
    },
    paperStyle: {
        marginTop: 20,
        padding: 20,
        width: 400,
        margin: 'auto'
    },
    timeHead: {
        fontSize: 20,
        fontFamily: "Times New Roman",
        marginBottom: 10
    },
    time: {
        color: 'gray',
        fontFamily: "Times New Roman",
    },
    timeContainer:{
        marginTop: -20,
        marginBottom: 30
    }
}));

export default useStyles;