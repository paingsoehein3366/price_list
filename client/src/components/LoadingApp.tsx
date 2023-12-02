import { Backdrop, Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

interface Prop {
    open: boolean,
}

const LoadingApp = ({ open }: Prop) => {
    return (
        <Backdrop open={open}>
            <CircularProgress />
        </Backdrop>
    )
};
export default LoadingApp;