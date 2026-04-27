/* 
THIS FILE CONTAINS THE MAIN LAYOUT OF THE APP
IT RENDERS THE APP ROUTER TO SHOW THE APP CONTENTS
HERE YOU CAN ADD CONSTANT COMPONENTS IF NEEDED (HEADER, FOOTER, ETC.)
*/
import { Container } from "@mui/material";
import Footer from "./components/Footer";
import { AppRouter } from "./routes/AppRoutes";

function InnovaTubeApp() {
  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
      {/* ADD ROUTER FOR THE APP CONTENTS */}
      <AppRouter />
      {/* ADD FOOTER OF THE APP */}
      <Footer />
    </Container>
  )
}

export default InnovaTubeApp
