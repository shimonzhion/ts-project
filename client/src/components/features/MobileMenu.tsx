import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";


interface MobileMenuProps {
    open: boolean;
    onClose:()=> void;
    pages: string[];
    navigate:(path:string) => void;
}


const  MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, pages, navigate }) =>{
  const handleMenuItemClick = () => {
    onClose(); //close menu
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose} variant="temporary"
      sx={{"& .MuiDrawer-paper": {minWidth: "100%",}}}
      ModalProps={{keepMounted: true }}>

      <Box style={{ width: "100%", paddingTop: "12px"}}>
        <Box sx={{display:'flex', width:'100%', justifyContent:'space-between', alignItems: 'center' }}>
        <Box sx={{fontSize:'28px', textAlign: 'start', ml: 1}}>Logo</Box>
        <IconButton sx={{ alignSelf: "flex-start", mr: 1.5,}} onClick={onClose}>
          <CloseIcon sx={{fontSize:"40px"}} />
        </IconButton>
        </Box>
        <List>
          {pages.map((page) => (
            <ListItem  key={page} onClick={handleMenuItemClick}>
              <ListItemText  primary={page.toUpperCase()} primaryTypographyProps={{ fontSize: '1.3rem' }} onClick={()=>navigate(page ==='home'? '/':page)}/>
            </ListItem> ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}

export default MobileMenu;
