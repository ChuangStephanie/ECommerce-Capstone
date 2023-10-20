import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../App'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SmallLogo from '../assets/jamscuff_HappyOpen.png'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const { userLogged, setUserLogged } = useContext(UserContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleUserLogout = () => {
    setUserLogged(false)
    sessionStorage.removeItem("email");
    return;
  }

  const pages = [{ title: 'Products', path: '/products' }]
  const settings = [
    { title: 'Home', path: '/' },
    {
      title: userLogged ? 'Logout' : 'Login',
      path: userLogged ? handleUserLogout : '/login',
    },
  ]

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Tilt trackOnWindow={true}>
              <div
                style={{ width: '70px', height: '70px', marginRight: '15px', marginBottom:'15px' }}
              >
                <img src={SmallLogo}></img>
              </div>
            </Tilt>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link style={{textDecoration: 'none'}} to="/"><h1 className="hometitle">Lizards Plushies</h1></Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link to={page.path} textAlign="center">
                    {page.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <h1 className="hometitle">Lizards Plushies</h1>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link
                  to="/products"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {page.title}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton style={{marginRight: '20px'}} onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                  {setting.title === 'Logout' ? (
                    <Button
                      style={{
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        minWidth: 'initial',
                        padding: '0',
                      }}
                      onClick={handleUserLogout}
                    >
                      {setting.title}
                    </Button>
                  ) : (
                    <Link
                      to={setting.path}
                      style={{ textDecoration: 'none', fontSize: '14px' }}
                    >
                      {setting.title}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title="Cart">
              <IconButton component={Link} to="/cart" sx={{ p: 0 }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar