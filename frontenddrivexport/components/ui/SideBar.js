import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import {
  DashboardCustomize,
  AddBox,
  Storefront,
  Logout,
} from '@mui/icons-material'
import { paletColors } from '@/styles/StylesConstants'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext, ProductContext } from '@/context'

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

export const SideBarNavigation = () => {
  const { user, logoutUserHandler } = useContext(AuthContext)
  const { logoutProducts } = useContext(ProductContext)
  const router = useRouter()
  const isActiveLink = (path) => router.pathname === path
  const navigate = (url) => {
    router.push(url)
  }

  const logoutHandler = () => {
    logoutProducts()
    logoutUserHandler()
  }

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100%', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            paddingY: 3,
            color: paletColors.witheColor,
          }}
        >
          Drive X Port
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <List>
            <ListItem
              button
              onClick={() => navigate('/')}
              sx={{
                backgroundColor: isActiveLink('/')
                  ? paletColors.witheColor
                  : paletColors.purple700,
              }}
            >
              <ListItemIcon>
                <DashboardCustomize
                  sx={{
                    color: isActiveLink('/')
                      ? paletColors.purple700
                      : paletColors.witheColor,
                  }}
                />
              </ListItemIcon>

              <ListItemText
                primary={'Dashboard'}
                sx={{
                  color: isActiveLink('/')
                    ? paletColors.purple700
                    : paletColors.witheColor,
                  fontWeight: 'bold',
                }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate('/product/new')}
              sx={{
                backgroundColor: isActiveLink('/product/new')
                  ? paletColors.witheColor
                  : paletColors.purple700,
              }}
            >
              <ListItemIcon>
                <AddBox
                  sx={{
                    color: isActiveLink('/product/new')
                      ? paletColors.purple700
                      : paletColors.witheColor,
                  }}
                />
              </ListItemIcon>

              <ListItemText
                primary={'New Product'}
                sx={{
                  color: isActiveLink('/product/new')
                    ? paletColors.purple700
                    : paletColors.witheColor,
                  fontWeight: 'bold',
                }}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => navigate('/sells/new')}
              sx={{
                backgroundColor: isActiveLink('/sells/new')
                  ? paletColors.witheColor
                  : paletColors.purple700,
              }}
            >
              <ListItemIcon>
                <Storefront
                  sx={{
                    color: isActiveLink('/sells/new')
                      ? paletColors.purple700
                      : paletColors.witheColor,
                  }}
                />
              </ListItemIcon>

              <ListItemText
                primary={'Sell'}
                sx={{
                  color: isActiveLink('/sells/new')
                    ? paletColors.purple700
                    : paletColors.witheColor,
                  fontWeight: 'bold',
                }}
              />
            </ListItem>
          </List>

          <List>
            <Stack direction={'column'} sx={{ alignItems: 'center' }}>
              <Avatar {...stringAvatar(`${user.user_name} ${user.last_name}`)} />
              <Typography
                variant="subtitle2"
                sx={{ paddingY: 2, color: paletColors.witheColor }}
              >
                {`${user.user_name} ${user.last_name}`}
              </Typography>
            </Stack>

            <ListItem button sx={{ paddingY: 3 }} onClick={logoutHandler}>
              <ListItemIcon>
                <Logout sx={{ color: paletColors.witheColor }} />
              </ListItemIcon>
              <ListItemText
                primary={'Logout'}
                sx={{ color: paletColors.witheColor, fontWeight: 'bold' }}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  )
}
