import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paperStyle: {
        marginTop: 20,
        padding: 20,
        width: 400,
        margin: 'auto'
    }
}));

export default useStyles;