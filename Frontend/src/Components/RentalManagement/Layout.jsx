
import MuiDrawer from "./MUIDrawer";

const RentalLayout = ({ children }) => {
    return (
         <div style={{ display: 'flex' }}> {/* Ensure that the layout uses flexbox */}
            <MuiDrawer />
            <div style={{ flexGrow: 1, overflowX: 'hidden', marginTop:64 }}> {/* Main content area with flexGrow */}
                {children}
            </div>
        </div>
    );
}

export default RentalLayout;